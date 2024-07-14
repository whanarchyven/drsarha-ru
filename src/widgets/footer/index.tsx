import { FC } from 'react';
import PhoneIcon from '@/public/images/landing/phone.svg';
import MailIcon from '@/public/images/landing/mail.svg';

const Footer: FC = () => {
  return (
    <div
      className={
        'md:p-10 p-3 bg-[#172C31] text-sm grid grid-cols-3 gap-5 justify-center w-full'
      }>
      <img src={'/images/landing/logo.png'} />
      <div className={'flex flex-col gap-2'}>
        <p className={'text-white font-bold text-md'}>Наши контакты:</p>
        <div className={'flex items-center gap-1'}>
          <PhoneIcon />
          <p className={'text-white text-base'}>
            +7 (926) 249 86 58 (whatsApp)
          </p>
        </div>
        <div className={'flex items-center gap-1'}>
          <PhoneIcon />
          <p className={'text-white text-base'}>+971 55 806 8635</p>
        </div>
        <div className={'flex items-center gap-1'}>
          <MailIcon />
          <p className={'text-white text-base'}>med.alianceex@gmail.com</p>
        </div>
      </div>
      <div className={'flex flex-col gap-3'}>
        <p className={'text-white text-md font-bold'}>Мы в соцсетях</p>
        <div className={'flex items-center gap-2'}>
          <div
            className={'bg-white w-5 opacity-50 rounded-full aspect-square'}
          />
          <div
            className={'bg-white w-5 opacity-50 rounded-full aspect-square'}
          />
          <div
            className={'bg-white w-5 opacity-50 rounded-full aspect-square'}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
