'use client';

import FirstBlock from '@/src/widgets/landing/first-block';
import Features from '@/src/widgets/landing/features';
import Advantages from '@/src/widgets/landing/advantages';
import CallbackBlock from '@/src/widgets/landing/callback-block';

export default function Home() {
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
