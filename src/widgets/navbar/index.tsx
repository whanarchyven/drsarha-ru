'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import AccountIcon from '@/public/icons/account.svg';
import BurgerIcon from '@/public/icons/burger.svg';
import CloseIcon from '@/public/icons/close.svg';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

const Navbar: FC = () => {
  const linksRu = [
    {
      link: 'new',
      name: 'Новые статьи',
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

  const name = 'Профиль';

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
          true: 'font-bold',
          false: 'font-normal',
        },
      },
    }
  );

  const cvaAccountContainer = cva(['flex items-center gap-1']);
  const cvaAccountIcon = cva(['md:w-2 w-2 aspect-square']);

  const cvaBurgerContainer = cva(['md:hidden flex']);
  const cvaBurgerIcon = cva(['w-2']);

  // const router=useRouter()
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={cvaRoot()}>
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
              key={counter}
              className={cvaLinkLabel({
                isActive: pathname.includes(item.link),
              })}
              href={`/${item.link}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={cvaAccountContainer()}>
          <AccountIcon className={cvaAccountIcon()} />
          <p className={cvaLinkLabel({ isActive: false })}>
            {isEnglish ? 'Profile' : name}
          </p>
        </div>
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
