'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import Link from 'next/link';
import { registerUser } from '@/src/shared/api/register';
import { loginUser } from '@/src/shared/api/login';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

export default function RegisterPage(params: any) {
  const [email, setEmail] = useState(params.searchParams.email ?? '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alert, setAlert] = useState('');

  const [plan, setPlan] = useState<'year' | 'month' | null>(null);

  const handlleRegister = async () => {
    if (confirmPassword == password && plan) {
      const data = await registerUser(email, phone, password, plan);
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

  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const fetchPaymentByEmail = async () => {
    const userEmail = params.searchParams.email;
    // console.log(params.searchParams.email)
    const { data } = await axios.get(`/api/get-payment?email=${userEmail}`);
    if (data.message) {
      setUserAlreadyExists(true);
      setIsLoading(false);
      return null;
    }
    const paymentId = data?.payment?.id;
    const fetchPayment = await axios.get(
      `/api/check-payment?payment_id=${paymentId}`
    );
    const hasAccess = fetchPayment.data.paid;
    if (hasAccess) {
      const { data } = await axios.post(
        '/api/update-payment',
        fetchPayment.data
      );
      console.log(data, 'AUE');
      setPlan(data.payment.amount.value == '17880.00' ? 'year' : 'month');
      setIsLoading(false);
      setIsPaid(true);
    } else {
      setIsLoading(false);
      setIsPaid(false);
    }
    console.log(fetchPayment);
  };

  useEffect(() => {
    fetchPaymentByEmail();
  }, []);
  return (
    <>
      <main>
        {!isLoading ? (
          <div
            className={
              'md:h-screen w-full flex md:flex-row flex-col justify-between items-center'
            }>
            {isPaid ? (
              <div className={'flex flex-col md:-mt-10 md:w-1/2 gap-3'}>
                <p className={'text-xl font-bold text-white'}>
                  Оплата прошла успешно! давайте зарегиструемся
                </p>
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
            ) : (
              <>
                {!userAlreadyExists ? (
                  <div
                    className={'flex flex-col md:-mt-10 w-full md:w-1/2 gap-3'}>
                    <p className={'text-xl font-bold text-white'}>
                      Видимо, оплата не прошла
                    </p>
                    <p className={'text-sm font-normal text-white'}>
                      Попробуйте оплатить доступ ещё раз или связаться с
                      администратором
                    </p>
                    <Link href={'/'}>
                      <OrangeButton className={'!w-1/2'}>На сайт</OrangeButton>
                    </Link>
                  </div>
                ) : (
                  <div className={'flex flex-col md:-mt-10 md:w-1/2 gap-3'}>
                    <p className={'text-xl font-bold text-white'}>
                      Ваш аккаунт уже зарегистрирован
                    </p>
                    <p className={'text-sm font-normal text-white'}>
                      Вы можете войти на платформу
                    </p>
                    <Link href={'/login'}>
                      <OrangeButton className={'!w-1/2'}>Вход</OrangeButton>
                    </Link>
                  </div>
                )}
              </>
            )}
            <div
              className={'relative w-1/2 md:w-auto md:mt-0 mt-10 md:h-[30rem]'}>
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
                  'md:w-[40rem] aspect-square md:absolute right-0 z-30 bottom-0'
                }>
                <img src={'/images/landing/sara_main.png'} />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className={'h-screen w-full flex justify-center items-center'}>
            <MoonLoader color={'#FFF'} />
          </div>
        )}
      </main>
    </>
  );
}
