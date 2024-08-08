'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import Link from 'next/link';
import { loginUser } from '@/src/shared/api/login';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    if (email.length > 0 && password.length > 0) {
      const user = await loginUser(email, password);
      console.log(user);
      if (user.user) {
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('token', user.token);
        localStorage.setItem('lastLogin', new Date().toISOString());
        window.location.href = '/new';
      } else {
        alert(user.message);
      }
    }
  };

  return (
    <>
      <main>
        <div
          className={
            'md:h-screen w-full flex md:flex-row flex-col md:justify-between justify-center items-center'
          }>
          <div className={'flex flex-col md:-mt-10 w-full md:w-1/2 gap-3'}>
            <p className={'text-xl font-bold text-white'}>Вход</p>
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder={'Логин (email)'}
              className={
                'outline-0 font-light placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
            <input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type={'password'}
              placeholder={'Пароль'}
              className={
                'outline-0 placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
            <p className={'text-white'}>
              Ещё нет аккаунта?{' '}
              <Link
                href={'/#subscribe'}
                className={'underline  cursor-pointer'}>
                Регистрация
              </Link>
            </p>
            <OrangeButton onClick={handleLogin} className={'!w-1/2'}>
              Войти
            </OrangeButton>
          </div>
          <div className={'relative w-1/2 md:w-auto h-[30rem]'}>
            <div
              className={
                'md:w-[40rem] aspect-square green-shadow absolute right-0 z-10 bottom-0 backdrop-blur-3xl bg-black bg-opacity-25 rounded-[4rem]'
              }></div>
            <div
              className={
                'md:w-[32rem] aspect-square green-shadow opacity-30 -rotate-[7deg] absolute right-[20rem] bottom-1 bg-black bg-opacity-25 rounded-[4rem]'
              }></div>
            <motion.div
              initial={{ y: '0', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={
                'md:w-[40rem] aspect-square absolute right-0 z-30 bottom-0'
              }>
              <img src={'/images/landing/sara_main.png'} />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
