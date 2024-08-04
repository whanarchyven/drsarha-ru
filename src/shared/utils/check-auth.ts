import { getProfile } from '@/src/shared/api/get-profile';

export const checkAuth = async () => {
  const user = await getProfile();
  if (!user) {
    window.location.href = '/login';
  }
};
