import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const shopId = process.env.SHOP_ID;
  const secretKey = process.env.SECRET_SHOP_KEY;
  const url = 'https://api.yookassa.ru/v3/payments';

  const idempotenceKey = uuidv4();

  const paymentData = {
    amount: {
      value: `${data.amount}`,
      currency: 'RUB',
    },
    capture: true,
    confirmation: {
      type: 'redirect',
      return_url: `${process.env.FRONTEND_URL}/register?email=${data.email}`,
    },
    description: `${data.email}`,
  };

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

  const config = {
    headers: {
      'Idempotence-Key': idempotenceKey,
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
  };

  try {
    const response = await axios.post(url, paymentData, config);
    console.log('Payment created successfully:', response.data);
    const savePayment = await axios.post(
      `${process.env.BACKEND_URL}/create-payment`,
      response.data
    );
    if (savePayment) return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      'Error creating payment:',
      error.response?.data || error.message
    );
  }
}
