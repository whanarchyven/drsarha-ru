'use client';

import FirstBlock from '@/src/widgets/landing/first-block';
import Features from '@/src/widgets/landing/features';
import Advantages from '@/src/widgets/landing/advantages';
import CallbackBlock from '@/src/widgets/landing/callback-block';
import { getProfile } from '@/src/shared/api/get-profile';
import { useEffect } from 'react';

export default function Home() {
  const checkAuth = async () => {
    const user = await getProfile();
    if (user) {
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
