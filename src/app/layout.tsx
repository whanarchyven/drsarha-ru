import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/src/shared/store/ReduxProvider';
import { RemResizeScript } from '@/src/features/rem-resize';
import Navbar from '@/src/widgets/navbar';
import Footer from '@/src/widgets/footer';

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
  title: 'News',
  description: 'latest news from the world of dermatology',
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
            <div className={''}>
              <Navbar />
              <div className={'pt-10 md:px-10 px-1'}>{children}</div>
              <Footer />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
