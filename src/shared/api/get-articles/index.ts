import { axiosInstance } from '../axios';

export const getArticles = async (date: string, category: string) => {
  try {
    const result = await axiosInstance.get(
      `/api/get-articles?date=${date}&category=${category}`
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
