import { FC } from 'react';
import PhoneIcon from '@/public/images/landing/phone.svg';
import MailIcon from '@/public/images/landing/mail.svg';

const Footer: FC = () => {
  return (
    <div
      className={
        'md:p-10 p-3 bg-[#172C31] text-sm grid md:grid-cols-3 gap-5 justify-center w-full'
      }>
      <div className={'flex flex-col gap-1'}>
        <img
          className={'md:w-auto w-[20rem]'}
          src={'/images/landing/logo.png'}
        />
      </div>
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
        <a
          className={'underline text-white'}
          target={'_blank'}
          href={'/files/Оферта drsarha.pdf'}>
          Публичная оферта
        </a>
      </div>
      <div className={'flex flex-col gap-3'}>
        <p className={'text-white text-md font-bold'}>Мы в соцсетях</p>
        <div className={'flex items-center gap-2'}>
          <a
            href={'https://t.me/medexa_ru'}
            className={
              'bg-cOrange w-5 rounded-full p-1 aspect-square flex items-center justify-center'
            }>
            <img src={'/images/telegram_icon.svg'} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
