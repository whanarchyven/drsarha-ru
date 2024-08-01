import { axiosInstance } from '../axios';
import { PostType } from '@/src/app/new/page';

export const savePost = async (post: PostType) => {
  try {
    const result = await axiosInstance.post(
      '/api/save-post',
      { post: JSON.stringify(post) },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    console.log(result.data);
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
