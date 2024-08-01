import { axiosInstance } from '../axios';

export const getArticle = async (url: string) => {
  try {
    const result = await axiosInstance.get(`/api/get-article?url=${url}`);
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
