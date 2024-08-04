import { axiosInstance } from '../axios';

export const getProfile = async () => {
  try {
    //email?: string, phone?: string, password?: string, name?: string, gender?: string, birthDate?: string
    const result = await axiosInstance.get('/api/get-profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log(result.data, 'PROFILE');
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
