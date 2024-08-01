import { axiosInstance } from '../axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const data = { email, password };
    console.log(data);
    const result = await axiosInstance.post('/api/login', data);

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
