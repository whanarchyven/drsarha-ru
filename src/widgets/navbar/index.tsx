'use client';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import AccountIcon from '@/public/icons/account.svg';
import BurgerIcon from '@/public/icons/burger.svg';
import CloseIcon from '@/public/icons/close.svg';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

const Navbar: FC = () => {
  const linksRu = [
    {
      link: 'new',
      name: 'Новости и Публикации',
    },
    {
      link: 'saved',
      name: 'Сохраненное',
    },
    {
      link: 'viewed',
      name: 'Прочитанное',
    },
  ];

  const linksEn = [
    {
      link: 'en/new',
      name: 'New articles',
    },
    {
      link: 'en/saved',
      name: 'Saved',
    },
    {
      link: 'en/viewed',
      name: 'Viewed',
    },
  ];

  const isEnglish = usePathname().includes('/en');
  const links = isEnglish ? linksEn : linksRu;

  const cvaRoot = cva([
    'w-full fixed z-[9999] left-0 md:px-8 px-2 mb-3 py-2 bg-black rounded-b-3xl bg-opacity-[0.15] backdrop-blur-xl',
  ]);
  const cvaContainer = cva(['flex gap-3 items-center  justify-between']);
  const cvaLogo = cva(['w-10 hidden md:block']);
  const cvaLinksContainer = cva([
    'md:flex hidden items-center justify-around w-full',
  ]);
  const cvaLinkLabel = cva(
    ['text-sm text-white whitespace-nowrap font-inter'],
    {
      variants: {
        isActive: {
          true: 'font-bold underline',
          false: 'font-normal',
        },
      },
    }
  );
  const cvaAccountContainer = cva(['flex items-center gap-1']);
  const cvaAccountIcon = cva(['md:w-2 w-2 aspect-square']);
  const cvaBurgerContainer = cva(['md:hidden flex']);
  const cvaBurgerIcon = cva(['w-2']);
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep] = useState(0);

  const steps = [
    {
      element: '#new',
      intro:
        'В данном разделе вы можете ознакомиться с научными статьями и публикациями',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#saved',
      intro:
        'В данном разделе вы можете просмотреть ваши сохраненные материалы',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#viewed',
      intro:
        'В данном разделе вы можете просмотреть материалы, которые вы уже прочитали',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#profile',
      intro:
        'Ваш личный кабинет, где вы можете обновить персональные данные, продлить подписки или проверить их актуальность',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#type_articles',
      intro:
        'Нажимайте, чтобы изучить все международные статьи и публикации, использовать материалы для научных исследований и находить ссылки на первоисточники',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#type_news',
      intro:
        'Нажимайте, чтобы быть в курсе всех актуальных мировых новостей ежедневно',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#post_read',
      intro: 'Нажимайте, чтобы открыть полный текст научной статьи',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#post_save',
      intro: 'Нажимайте, чтобы сохранить статью и легко вернуться к ней позже',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#dr_sara',
      intro:
        'Нажимайте и задавайте вопросы – ваш персональный AI-помощник, навигатор по научным материалам, поможет быстро найти ответы и подготовить краткую аннотацию по вашему запросу',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
  ];

  const startTour = () => {
    setStepsEnabled(true);
  };

  const onExit = () => {
    setStepsEnabled(false);
  };

  useEffect(() => {
    setUsername(localStorage.getItem('name') ?? 'Профиль');
    if (!localStorage.getItem('education_passed')) {
      startTour();
      localStorage.setItem('education_passed', 'true');
    }
  }, []);

  return (
    <div className={cvaRoot()}>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
        options={{
          nextLabel: 'Дальше',
          overlayOpacity: 0.5,
          prevLabel: 'Назад',
          doneLabel: 'Завершить',
          scrollToElement: true,
        }}
      />
      <div className={cvaContainer()}>
        <div
          onClick={() => {
            setMenuOpen(true);
          }}
          className={cvaBurgerContainer()}>
          <BurgerIcon className={cvaBurgerIcon()} />
        </div>
        <div className={cvaLogo()}>
          <Link href={isEnglish ? '/en/new' : '/'}>
            <img src={'/images/logo.png'} />
          </Link>
        </div>
        <div className={cvaLinksContainer()}>
          {links.map((item, counter) => (
            <Link
              id={item.link}
              key={counter}
              className={cvaLinkLabel({
                isActive: pathname.includes(item.link),
              })}
              href={`/${item.link}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          id={'profile'}
          href={'/profile'}
          className={cvaAccountContainer()}>
          <AccountIcon className={cvaAccountIcon()} />
          <p className={cvaLinkLabel({ isActive: false })}>{username}</p>
        </Link>
      </div>
      {menuOpen && (
        <div
          className={
            'fixed left-0 top-0 h-screen w-screen bg-[#246E63] z-[999999] flex flex-col p-3 gap-5'
          }>
          {links.map((item, counter) => (
            <Link
              key={counter}
              onClick={() => {
                setMenuOpen(false);
              }}
              className={cvaLinkLabel({
                isActive: pathname.includes(item.link),
              })}
              href={`/${item.link}`}>
              {item.name}
            </Link>
          ))}
          <div
            onClick={() => {
              setMenuOpen(false);
            }}
            className={'absolute right-2 top-2'}>
            <CloseIcon className={'w-2'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
