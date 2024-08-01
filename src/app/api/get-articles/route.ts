import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const subcategory = url.searchParams.get('subcategory');
  const search = url.searchParams.get('search');
  const offset = url.searchParams.get('offset');
  const limit = url.searchParams.get('limit');

  const result = await axios.get(
    `${process.env.ARTICLES_URL}/getPublishedArticles?category=${category}&subcategory=${subcategory}&title=${search}&limit=${limit}&offset=${offset}`
  );
  console.log(
    result.data,
    `${process.env.ARTICLES_URL}/getPublishedArticles?category=${category}&subcategory=${subcategory}&search=${search}&limit=10&offset=${offset}`
  );
  return NextResponse.json(result.data);
}
