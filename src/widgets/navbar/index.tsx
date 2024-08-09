'use client';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import AccountIcon from '@/public/icons/account.svg';
import BurgerIcon from '@/public/icons/burger.svg';
import CloseIcon from '@/public/icons/close.svg';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
// ESM
import { differenceInCalendarDays } from 'date-fns';

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
  const [user, setUser] = useState<{ email: string }>({ email: 'Войти' });

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isValid = false;
    if (
      localStorage.getItem('user') &&
      localStorage.getItem('lastLogin') &&
      localStorage.getItem('token')
    ) {
      const user = JSON.parse(localStorage.getItem('user') ?? '');
      const lastLogin = new Date(localStorage.getItem('lastLogin') ?? '');
      if (differenceInCalendarDays(new Date(), lastLogin) < 1) {
        isValid = true;
        setUser(user);
      }
    }
    setIsAuthorized(isValid);
  }, []);

  return (
    <div className={cvaRoot()}>
      <div className={cvaContainer()}>
        <div
          id={'burger'}
          onClick={() => {
            setMenuOpen(true);
          }}
          className={cvaBurgerContainer()}>
          <BurgerIcon className={cvaBurgerIcon()} />
        </div>
        <div className={cvaLogo()}>
          <Link href={isAuthorized ? '/new' : '/'}>
            <img src={'/images/logo.png'} />
          </Link>
        </div>
        <div className={cvaLinksContainer()}>
          {links.map((item, counter) => {
            return (
              <Link
                id={item.link}
                key={counter}
                className={cvaLinkLabel({
                  isActive: pathname.includes(item.link),
                })}
                href={isAuthorized ? `/${item.link}` : '/login'}>
                {item.name}
              </Link>
            );
          })}
        </div>
        <Link
          id={'profile'}
          href={isAuthorized ? '/profile' : '/login'}
          className={cvaAccountContainer()}>
          <AccountIcon className={cvaAccountIcon()} />
          <p className={cvaLinkLabel({ isActive: false })}>{user.email}</p>
        </Link>
      </div>
      {menuOpen && (
        <div
          className={
            'fixed left-0 top-0 h-screen w-screen bg-custom-radial z-[999999] flex flex-col p-3 gap-5'
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
              href={isAuthorized ? `/${item.link}` : '/login'}>
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
