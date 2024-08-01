'use client';
import './globals.css';
import React, { useEffect, useState } from 'react';
import ReduxProvider from '@/src/shared/store/ReduxProvider';
import { RemResizeScript } from '@/src/features/rem-resize';
import Navbar from '@/src/widgets/navbar';
import Footer from '@/src/widgets/footer';
import clsx from 'clsx';
import { NextRequest, NextResponse } from 'next/server';
import { usePathname } from 'next/navigation';
import Chat from '@/src/widgets/chat';
import { differenceInCalendarDays } from 'date-fns';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Шрифты
// const Roboto = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Robotocondensed.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   display: 'swap',
//   variable: '--base-font',
// });
// ? clsx(Roboto.variable) для body

// export const metadata: Metadata = {
//   title: 'News',
//   description: 'latest news from the world of dermatology',
// };

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export function middleware(request: NextRequest) {
  return NextResponse.next({
    request: {
      // New request headers
      // @ts-expect-error aue
      'x-pathname': request.nextUrl.pathname,
    },
  });
}

export default function RootLayout({ children, ...rest }: RootLayoutProps) {
  // const pathname=headersList.get("x-pathname")
  const pathname = usePathname();
  const displayLayout = !pathname.includes('articles');

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isValid = false;
    if (
      localStorage.getItem('user') &&
      localStorage.getItem('lastLogin') &&
      localStorage.getItem('token')
    ) {
      const lastLogin = new Date(localStorage.getItem('lastLogin') ?? '');
      if (differenceInCalendarDays(new Date(), lastLogin) < 1) {
        isValid = true;
      }
    }
    setIsAuthorized(isValid);
  }, []);

  return (
    <html lang="ru">
      <head>
        <RemResizeScript
          defaultFontSize={10}
          startScaleWidth={1440}
          endScaleTopWidth={1920}
          endScaleBottomWidth={1024}
        />
      </head>
      <body
        className={
          'bg-custom-radial bg-cover bg-center bg-no-repeat  font-inter'
        }>
        <ReduxProvider {...rest}>
          <div id="app">
            <div className={''}>
              {displayLayout && <Navbar />}
              {/*{JSON.stringify(headersList)}*/}
              <div className={clsx(displayLayout ? 'md:px-10 px-1 pt-10' : '')}>
                {children}
              </div>
              {isAuthorized && <Chat />}
              {displayLayout && <Footer />}
              {/*<img*/}
              {/*  id={'dr_sara'}*/}
              {/*  className={*/}
              {/*    'fixed drop-shadow-2xl bottom-4 right-4 w-[20rem] h-auto cursor-pointer'*/}
              {/*  }*/}
              {/*  src={'/images/dr_sara.svg'}*/}
              {/*/>*/}
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
