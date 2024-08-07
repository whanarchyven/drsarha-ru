import { axiosInstance } from '../axios';

export const registerUser = async (
  email: string,
  phone: string,
  password: string,
  plan: string
) => {
  try {
    const data = { email, phone, password, plan };
    console.log(data);
    const result = await axiosInstance.post('/api/register', data);

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
