import { axiosInstance } from '../axios';

export const getArticles = async (
  category: string,
  subcategory: string,
  search: string,
  page: number
) => {
  try {
    const result = await axiosInstance.get(
      `/api/get-articles?category=${category}&subcategory=${subcategory}&search=${search}&limit=10&offset=${10 * page}`
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
