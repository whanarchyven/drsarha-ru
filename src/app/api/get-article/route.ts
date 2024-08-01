import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const data = url.searchParams.get('url');

  const result = await axios.get(
    `${process.env.ARTICLES_URL}/getArticle?url=${data}`
  );
  console.log(result.data, `${process.env.BACKEND_URL}/getArticle/`);
  return NextResponse.json(result.data);
}
