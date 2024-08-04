'use client';
import React, { useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import Link from 'next/link';
import axios from 'axios';

const CallbackBlock = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');
  const handlleRegister = async () => {
    // if (confirmPassword == password) {
    //     // Define your credentials and parameters
    //
    //     // const data = await registerUser(email, phone, password);
    //     // console.log(data);
    //     // if (data.userId) {
    //     //   const user = await loginUser(email, password);
    //     //   if (user.token) {
    //     //     localStorage.setItem('user', JSON.stringify(user.user));
    //     //     localStorage.setItem('token', user.token);
    //     //     localStorage.setItem('lastLogin', new Date().toISOString());
    //     //     window.location.href = '/new';
    //     //   }
    //     // }
    // } else {
    //     setAlert('Пароли не совпадают');
    // }
    if (email) {
      const { data } = await axios.post('/api/create-payment', {
        email,
      });
      console.log(data);
      window.location.href = data.confirmation.confirmation_url;
    } else {
      setAlert('Поле E-mail не может быть пустым');
    }
  };
  return (
    <div id={'subscribe'} className={'h-screen pt-10 relative'}>
      <div
        className={
          'w-full rounded-2xl backdrop-blur-2xl flex justify-between items-start callback-shadow pl-4 pt-4 bg-[#404040] bg-opacity-10'
        }>
        <div className={'flex w-1/2 flex-col gap-2'}>
          <p className={'text-xl text-white font-bold'}>
            Подпишитесь сегодня
            <br /> и будьте в курсе!
          </p>
          <div className={'flex items-start flex-col gap-1'}>
            <p className={'line-through text-cOrange'}>1699 ₽/ мес.</p>{' '}
            <p className={'text-xl text-white font-bold'}>699 ₽/ в месяц</p>
          </div>
          <div className={'flex flex-col mb-3 w-full gap-2'}>
            <input
              type={'email'}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder={'Email'}
              className={
                'outline-0 font-light placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
            {/*<input*/}
            {/*    type={'tel'}*/}
            {/*    value={phone}*/}
            {/*    onChange={(event) => {*/}
            {/*        setPhone(event.target.value);*/}
            {/*    }}*/}
            {/*    placeholder={'Номер телефона'}*/}
            {/*    className={*/}
            {/*        'outline-0 font-light placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'*/}
            {/*    }*/}
            {/*/>*/}
            {/*<input*/}
            {/*    type={'password'}*/}
            {/*    value={password}*/}
            {/*    onChange={(event) => {*/}
            {/*        setPassword(event.target.value);*/}
            {/*    }}*/}
            {/*    placeholder={'Пароль'}*/}
            {/*    className={*/}
            {/*        'outline-0 placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'*/}
            {/*    }*/}
            {/*/>*/}
            {/*<input*/}
            {/*    type={'password'}*/}
            {/*    value={confirmPassword}*/}
            {/*    onChange={(event) => {*/}
            {/*        setConfirmPassword(event.target.value);*/}
            {/*    }}*/}
            {/*    placeholder={'Повторите пароль'}*/}
            {/*    className={*/}
            {/*        'outline-0 placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'*/}
            {/*    }*/}
            {/*/>*/}
            <p className={'text-white'}>
              Уже есть аккаунт?{' '}
              <Link href={'/login'} className={'underline  cursor-pointer'}>
                Вход
              </Link>
            </p>
            {alert.length > 0 ? (
              <p className={'text-red-500'}>{alert}</p>
            ) : null}
            <OrangeButton onClick={handlleRegister} className={'!w-1/2'}>
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
    </div>
  );
};

export default CallbackBlock;
