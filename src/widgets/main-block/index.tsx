import React from 'react';

const MainBlock = () => {
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
        <p
          className={
            'md:text-xl md:text-left text-sm text-center font-extrabold'
          }>
          Спасибо за ваш интерес
          <br />к миру детской дерматологии!
        </p>
        <p className={'md:text-md md:text-left text-center text-xs'}>
          Все самые релевантные и актуальные статьи <br />
          теперь будут доступны вам каждый день.
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
