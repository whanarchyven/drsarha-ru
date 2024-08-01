import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const result = await axios.post(`${process.env.BACKEND_URL}/login/`, data);
  return NextResponse.json(result.data);
}
