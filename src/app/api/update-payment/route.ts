import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data, 'DATA');

  try {
    const savePayment = await axios.post(
      `${process.env.BACKEND_URL}/update-payment/${data.id}`,
      data
    );
    console.log(savePayment, data, 'PAYMENT');
    return NextResponse.json(savePayment.data);
  } catch (error: any) {
    console.error(
      'Error creating payment:',
      error.response?.data || error.message
    );
  }
}
