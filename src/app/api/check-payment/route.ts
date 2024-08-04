import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const data = url.searchParams.get('payment_id');
  const shopId = process.env.SHOP_ID;
  const secretKey = process.env.SECRET_SHOP_KEY;

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.yookassa.ru/v3/payments/${data}`,
      config
    );
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      'Error fetch payment:',
      error.response?.data || error.message
    );
    return NextResponse.json(false);
  }
}
