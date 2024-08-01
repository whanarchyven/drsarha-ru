import { axiosInstance } from '../axios';

export const updateProfile = async (data: {
  email?: string;
  phone?: string;
  password?: string;
  name?: string;
  gender?: string;
  birthDate?: string;
}) => {
  try {
    //email?: string, phone?: string, password?: string, name?: string, gender?: string, birthDate?: string
    const dataFormatted = Object.entries(data)
      .filter((arg) => {
        if (arg[1]) {
          return arg;
        }
      })
      .reduce((accum: any, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {});

    console.log(dataFormatted, `Bearer ${localStorage.getItem('token')}`);
    const result = await axiosInstance.post(
      '/api/update-profile',
      dataFormatted,
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
