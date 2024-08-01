'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import Link from 'next/link';
import { registerUser } from '@/src/shared/api/register';
import { loginUser } from '@/src/shared/api/login';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alert, setAlert] = useState('');

  const handlleRegister = async () => {
    if (confirmPassword == password) {
      const data = await registerUser(email, phone, password);
      console.log(data);
      if (data.userId) {
        const user = await loginUser(email, password);
        if (user.token) {
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('token', user.token);
          localStorage.setItem('lastLogin', new Date().toISOString());
          window.location.href = '/new';
        }
      }
    } else {
      setAlert('Пароли не совпадают');
    }
  };

  return (
    <>
      <main>
        <div className={'h-screen w-full flex justify-between items-center'}>
          <div className={'flex flex-col -mt-10 w-1/2 gap-3'}>
            <p className={'text-xl font-bold text-white'}>Регистрация</p>
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
            <input
              type={'tel'}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              placeholder={'Номер телефона'}
              className={
                'outline-0 font-light placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
            <input
              type={'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder={'Пароль'}
              className={
                'outline-0 placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
            <input
              type={'password'}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              placeholder={'Повторите пароль'}
              className={
                'outline-0 placeholder:opacity-50 placeholder:text-white bg-transparent text-white border-opacity-50 border-[2px] border-white rounded-full text-base p-1'
              }
            />
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
              Регистрация
            </OrangeButton>
          </div>
          <div className={'relative h-[30rem]'}>
            <div
              className={
                'w-[40rem] aspect-square green-shadow absolute right-0 z-10 bottom-0 backdrop-blur-3xl bg-black bg-opacity-25 rounded-[4rem]'
              }></div>
            <div
              className={
                'w-[32rem] aspect-square green-shadow opacity-30 -rotate-[7deg] absolute right-[20rem] bottom-1 bg-black bg-opacity-25 rounded-[4rem]'
              }></div>
            <motion.div
              initial={{ y: '0', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={
                'w-[40rem] aspect-square absolute right-0 z-30 bottom-0'
              }>
              <img src={'/images/landing/sara_main.png'} />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
