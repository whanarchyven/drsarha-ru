import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const result = await axios.post(
    `${process.env.BACKEND_URL}/update-profile/`,
    data,
    {
      headers: {
        Authorization: request.headers.get('Authorization'),
      },
    }
  );
  console.log(result.data, `${process.env.BACKEND_URL}/update-profile/`);
  return NextResponse.json(result.data);
}
