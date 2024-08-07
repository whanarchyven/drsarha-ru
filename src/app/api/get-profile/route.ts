import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const result = await axios.get(`${process.env.BACKEND_URL}/user/`, {
    headers: { Authorization: request.headers.get('Authorization') },
  });
  // console.log(result.data, `${process.env.BACKEND_URL}/update-profile`);
  return NextResponse.json(result.data);
}
