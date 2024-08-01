import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  const category = url.searchParams.get('category');

  const result = await axios.get(
    `${process.env.ARTICLES_URL}/parserInfo?date=${date}&category=${category}&isPublished=true`
  );
  console.log(
    result.data,
    `${process.env.ARTICLES_URL}/parserInfo?date=${date}&category=${category}&isPublished=true`
  );
  return NextResponse.json(result.data);
}
