import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/src/shared/store/ReduxProvider';
import { RemResizeScript } from '@/src/features/rem-resize';
import Navbar from '@/src/widgets/navbar';

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

export const metadata: Metadata = {
  title: 'Next.js Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, et',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function RootLayout({ children, ...rest }: RootLayoutProps) {
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
      <body className={'bg-custom-radial bg-cover  font-inter'}>
        <ReduxProvider {...rest}>
          <div id="app">
            <div className={'md:px-10 px-1'}>
              <Navbar />
              <div className={'pt-10'}>{children}</div>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
