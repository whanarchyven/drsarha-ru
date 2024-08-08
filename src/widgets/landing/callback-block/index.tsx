'use client';
import React, { useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import Link from 'next/link';
import axios from 'axios';

const CallbackBlock = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const [isAgree, setIsAgree] = useState(false);
  const [sendNews, setSendNews] = useState(true);

  const handlleRegister = async (amount: number) => {
    if (email) {
      if (isAgree) {
        const { data } = await axios.post('/api/create-payment', {
          email,
          amount,
        });
        console.log(data);
        window.location.href = data.confirmation.confirmation_url;
      } else {
        setAlert('Необходимо согласие на обработку персональных данных');
      }
    } else {
      setAlert('Поле E-mail не может быть пустым');
    }
  };

  const openPop = async () => {
    if (email) {
      if (isAgree) {
        setOpenPlan(true);
      } else {
        setAlert('Необходимо согласие на обработку персональных данных');
      }
    } else {
      setAlert('Поле E-mail не может быть пустым');
    }
  };

  const [openPlan, setOpenPlan] = useState(false);

  return (
    <div id={'subscribe'} className={'md:h-screen md:my-0 my-4 pt-10 relative'}>
      <div
        className={
          'w-full rounded-2xl backdrop-blur-2xl flex justify-between items-end callback-shadow pl-2 md:pl-4 pt-2 md:pt-4 bg-[#404040] bg-opacity-10'
        }>
        <div className={'flex w-1/2 flex-col self-start gap-0.6 md:gap-2'}>
          <p className={'md:text-xl text-sm text-white font-bold'}>
            Подпишитесь сегодня
            <br /> и будьте в курсе!
          </p>
          <div className={'flex items-start flex-col gap-0.6 md:gap-1'}>
            <p
              className={
                'line-through md:text-base text-[1.1rem] text-cOrange'
              }>
              1699 ₽/ мес.
            </p>{' '}
            <p className={'md:text-xl text-md text-white font-bold'}>
              699 ₽/ в месяц
            </p>
          </div>
          <div className={'flex flex-col mb-3 w-full gap-0.6 md:gap-2'}>
            <input
              type={'email'}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder={'Email'}
              className={
                'outline-0 font-light placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-[1rem] md:text-base md:px-1 p-1 md:p-1'
              }
            />
            <div
              onClick={() => {
                setIsAgree(!isAgree);
              }}
              className={
                'flex cursor-pointer items-start md:items-center gap-1'
              }>
              <div
                className={
                  'w-3 md:w-1.5 aspect-square border-white border-2 rounded-md'
                }>
                {isAgree && <img src={'/images/check.svg'} />}
              </div>
              <p className={'text-white text-[1rem] md:text-sm font-light'}>
                Даю{' '}
                <a
                  className={'underline'}
                  target={'_blank'}
                  href={'/files/Согласие на обработку ПД www.drsarha.ru .pdf'}>
                  согласие
                </a>{' '}
                на{' '}
                <a
                  target={'_blank'}
                  className={'underline'}
                  href={'/files/Политика ПД drsarha.ru.pdf'}>
                  обработку персональных данных
                </a>
              </p>
            </div>
            <div
              onClick={() => {
                setSendNews(!sendNews);
              }}
              className={
                'flex cursor-pointer items-start md:items-center gap-1'
              }>
              <div
                className={
                  'w-3 md:w-1.5 aspect-square border-white border-2 rounded-md'
                }>
                {sendNews && <img src={'/images/check.svg'} />}
              </div>
              <p className={'text-white text-[1rem] md:text-sm font-light'}>
                Хочу получать новости и обновления drsarha.ru
              </p>
            </div>
            <p className={'text-white md:text-base text-[1rem]'}>
              Уже есть аккаунт?{' '}
              <Link href={'/login'} className={'underline  cursor-pointer'}>
                Вход
              </Link>
            </p>
            {alert.length > 0 ? (
              <p className={'text-red-500 md:text-base text-[1rem]'}>{alert}</p>
            ) : null}
            <OrangeButton onClick={openPop} className={'!w-1/2'}>
              Подписаться
            </OrangeButton>
          </div>
          {/*<p className={'text-white font-light leading-[150%]'}>*/}
          {/*  Будьте в курсе всех новостей и актуальных публикаций в области*/}
          {/*  дерматологии и педиатрии. Подпишитесь сегодня, чтобы получать свежие*/}
          {/*  статьи, научные исследования и рекомендации от ведущих специалистов.*/}
          {/*  Оставайтесь информированными и следите за последними достижениями в*/}
          {/*  медицинской сфере.*/}
          {/*</p>*/}
          {/*<input*/}
          {/*  placeholder={'Ваше имя'}*/}
          {/*  className={*/}
          {/*    'outline-0 font-light placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'*/}
          {/*  }*/}
          {/*/>*/}
          {/*<input*/}
          {/*  placeholder={'Ваш email'}*/}
          {/*  className={*/}
          {/*    'outline-0 placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'*/}
          {/*  }*/}
          {/*/>*/}
          {/*<input*/}
          {/*  placeholder={'Ваш номер телефона'}*/}
          {/*  className={*/}
          {/*    'outline-0 placeholder:opacity-50 bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-md p-1'*/}
          {/*  }*/}
          {/*/>*/}
          {/*<OrangeButton*/}
          {/*  onClick={() => {*/}
          {/*    router.push('/register');*/}
          {/*  }}>*/}
          {/*  Подписаться*/}
          {/*</OrangeButton>*/}
        </div>
        <div className={'relative flex items-center justify-center'}>
          <div
            className={
              'absolute w-2/3 h-2/3 rounded-full z-[-1] blur-[140px] bg-white'
            }></div>
          <img src={'/images/landing/callback_sara.png'} />
        </div>
      </div>
      {openPlan && (
        <div
          className={
            'fixed z-[9999] flex items-center justify-center top-0 left-0 h-screen w-full bg-plan-change-grad'
          }>
          <img
            onClick={() => {
              setOpenPlan(false);
            }}
            className={
              'absolute right-1 md:right-2 top-1 md:top-2 w-4 cursor-pointer'
            }
            src={'/images/close.svg'}
          />
          <div
            className={
              'w-4/5 md:w-2/3  bg-[#404040] bg-opacity-10 backdrop-blur-xl tile-shadow rounded-xl'
            }>
            <div
              className={
                'w-full border-b-2 p-2 border-white border-opacity-50'
              }>
              <p className={'text-white font-bold'}>Выберите план</p>
            </div>
            <div className={'w-full grid  md:grid-cols-2'}>
              <div
                className={
                  'flex flex-col border-r-2 border-white border-opacity-50 gap-1 p-2'
                }>
                <p className={'text-white font-bold'}>Ежемесячно</p>
                <div className={'flex items-start flex-col gap-1'}>
                  <p className={'line-through text-sm md:text-lg text-cOrange'}>
                    1990 ₽/ мес.*
                  </p>
                  <p
                    className={'md:text-xl text-lg text-white -mt-1 font-bold'}>
                    699 ₽/ в месяц{' '}
                  </p>
                  <p className={'text-sm text-white'}>
                    * акция действует в первый месяц запуска
                  </p>
                  <div className={'flex flex-col mt-1 gap-0.4'}>
                    <div className={'flex items-center gap-1'}>
                      <img className={'w-3'} src={'/images/check.svg'} />
                      <p className={'text-white text-[1rem] md:text-sm'}>
                        доступ ко всем мировым статьям и научным публикациям
                      </p>
                    </div>
                    <div className={'flex items-center gap-1'}>
                      <img className={'w-3'} src={'/images/check.svg'} />
                      <p className={'text-white text-[1rem] md:text-sm'}>
                        доступ к персональному AI помощнику
                      </p>
                    </div>
                    <div className={'flex items-center gap-1'}>
                      <img className={'w-3'} src={'/images/check.svg'} />
                      <p className={'text-white text-[1rem] md:text-sm'}>
                        доступ к мировым новостям
                      </p>
                    </div>
                    <div className={'flex items-center gap-1'}>
                      <img className={'w-3'} src={'/images/check.svg'} />
                      <p className={'text-white text-[1rem] md:text-sm'}>
                        доступ к открытому международному сообществу
                      </p>
                    </div>
                  </div>
                  <OrangeButton
                    onClick={() => {
                      handlleRegister(699.0);
                    }}
                    className={'text-sm mt-1'}>
                    Подписаться
                  </OrangeButton>
                </div>
              </div>
              <div
                className={
                  'flex flex-col border-white border-opacity-50 gap-1 p-2'
                }>
                <p className={'text-white font-bold'}>Ежегодно</p>
                <div className={'flex items-start flex-col gap-1'}>
                  <p className={'md:text-md text-sm text-white'}>
                    17 880 ₽/ год.
                  </p>
                  <p
                    className={
                      'md:text-xl text-md md:-mt-1 text-white font-bold'
                    }>
                    1 490 ₽/ в месяц{' '}
                  </p>
                  <p className={'md:text-base text-sm font-bold text-white'}>
                    Все из Ежемесячного плана, а также:{' '}
                  </p>
                  <div className={'flex flex-col mt-1 gap-0.4'}>
                    <div className={'flex items-center gap-1'}>
                      <img className={'w-3'} src={'/images/check.svg'} />
                      <p className={'text-white text-[1rem] md:text-sm'}>
                        доступ к еженедельному дайджесту
                      </p>
                    </div>
                  </div>
                  <OrangeButton
                    onClick={() => {
                      handlleRegister(17880.0);
                    }}
                    className={'text-sm mt-1'}>
                    Подписаться
                  </OrangeButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CallbackBlock;
