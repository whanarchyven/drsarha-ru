'use client';

import FirstBlock from '@/src/widgets/landing/first-block';
import Features from '@/src/widgets/landing/features';
import Advantages from '@/src/widgets/landing/advantages';
import CallbackBlock from '@/src/widgets/landing/callback-block';
import { getProfile } from '@/src/shared/api/get-profile';
import { useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';

export default function Home() {
  const checkAuth = async () => {
    const user = await getProfile();
    const lastLogin = new Date(localStorage.getItem('lastLogin') ?? '');
    if (user && differenceInCalendarDays(new Date(), lastLogin) < 1) {
      window.location.href = '/new';
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <main>
        <FirstBlock />
        <Features />
        <Advantages />
        <CallbackBlock />
      </main>
    </>
  );
}
