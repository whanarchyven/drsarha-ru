import { getProfile } from '@/src/shared/api/get-profile';
import { differenceInCalendarDays } from 'date-fns';

export const checkAuth = async () => {
  const user = await getProfile();
  const lastLogin = new Date(localStorage.getItem('lastLogin') ?? '');
  if (!user || differenceInCalendarDays(new Date(), lastLogin) > 1) {
    window.location.href = '/login';
  }
};
