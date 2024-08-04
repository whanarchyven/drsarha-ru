import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const data = url.searchParams.get('email');

  const result = await axios.get(
    `${process.env.BACKEND_URL}/get-payment/${data}`
  );
  console.log(result.data, `${process.env.BACKEND_URL}/get-payment/${data}`);
  return NextResponse.json(result.data);
}
