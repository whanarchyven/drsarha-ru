import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const result = await axios.post(`${process.env.BACKEND_URL}/register/`, data);
  console.log(result.data, `${process.env.BACKEND_URL}/register/`);
  return NextResponse.json(result.data);
}
