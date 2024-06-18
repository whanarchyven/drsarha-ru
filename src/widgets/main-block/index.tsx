import React, { FC } from 'react';

interface MainBlockInterface {
  locale?: string;
}

const MainBlock: FC<MainBlockInterface> = ({ locale }) => {
  return (
    <div
      className={
        'w-full md:px-8 px-2 py-2 md:py-10 font-inter text-white rounded-3xl bg-black relative overflow-hidden bg-opacity-[0.15]'
      }>
      <div className={'flex w-full flex-col items-center md:items-start gap-2'}>
        <img
          className={'w-1/2 flex md:hidden'}
          src={'/images/logo_square.png'}
        />
        {locale == 'en' ? (
          <p
            className={
              'md:text-xl md:text-left text-sm text-center font-extrabold'
            }>
            Thank you for your interest
            <br />
            in the world of pediatric dermatology!
          </p>
        ) : (
          <p
            className={
              'md:text-xl md:text-left text-sm text-center font-extrabold'
            }>
            Спасибо за ваш интерес
            <br />к миру детской дерматологии!
          </p>
        )}
        <p className={'md:text-md md:text-left text-center text-xs'}>
          All the most relevant and up-to-date articles <br />
          will now be available to you every day.
        </p>
      </div>
      <img
        className={'absolute hidden md:flex h-full right-0 top-0'}
        src={'/images/child.png'}
      />
    </div>
  );
};

export default MainBlock;
