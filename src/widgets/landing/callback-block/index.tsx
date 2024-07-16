import React from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';

const CallbackBlock = () => {
  return (
    <div className={'h-screen relative'}>
      <div
        className={
          'w-full rounded-2xl backdrop-blur-2xl flex justify-between items-start callback-shadow pl-4 pt-4 bg-[#404040] bg-opacity-10'
        }>
        <div className={'flex w-1/2 flex-col gap-2'}>
          <p className={'text-xl text-white font-bold'}>
            Подпишитесь сегодня
            <br /> и будьте в курсе!
          </p>
          <input
            placeholder={'Ваше имя'}
            className={
              'outline-0 font-light placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'
            }
          />
          <input
            placeholder={'Ваш email'}
            className={
              'outline-0 placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'
            }
          />
          <input
            placeholder={'Ваш номер телефона'}
            className={
              'outline-0 placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'
            }
          />
          <OrangeButton>Полписаться</OrangeButton>
        </div>
        <div className={'relative flex items-center justify-center'}>
          <div
            className={
              'absolute w-2/3 h-2/3 rounded-full z-[-1] blur-[140px] bg-white'
            }></div>
          <img src={'/images/landing/callback_sara.png'} />
        </div>
      </div>
    </div>
  );
};

export default CallbackBlock;