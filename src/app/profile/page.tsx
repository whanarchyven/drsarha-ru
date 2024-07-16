'use client';

import InputRow from '@/src/shared/ui/input-row';
import { useEffect, useState } from 'react';
import { addYears, format } from 'date-fns';

export default function Home() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('Мужской');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name') ?? '');
    setBirthDate(
      localStorage.getItem('birthDate')
        ? new Date(localStorage.getItem('birthDate') ?? '')
        : new Date()
    );
    setGender(localStorage.getItem('gender') ?? 'Мужской');
    setEmail(localStorage.getItem('email') ?? '');
    setPhone(localStorage.getItem('phone') ?? '');
    setPassword(localStorage.getItem('password') ?? '');
  }, []);

  return (
    <>
      <main className={'min-h-screen py-3'}>
        <div className={'bg-black p-4 rounded-2xl bg-opacity-15'}>
          <p className={'text-md font-bold text-white'}>Основная информация</p>
          <div className={'flex flex-col gap-2'}>
            <InputRow
              saveKey={'name'}
              type={'string'}
              name={'ФИО'}
              value={name}
              mutateFunc={setName}
            />
            <InputRow
              saveKey={'birthDate'}
              type={'date'}
              name={'Дата рождения'}
              value={birthDate}
              mutateFunc={setBirthDate}
            />
            <InputRow
              saveKey={'gender'}
              type={'gender'}
              name={'Пол'}
              value={gender}
              mutateFunc={setGender}
            />
          </div>
        </div>
        <div className={'bg-black mt-3 p-4 rounded-2xl bg-opacity-15'}>
          <p className={'text-md font-bold text-white'}>
            Контактная информация
          </p>
          <div className={'flex flex-col gap-2'}>
            <InputRow
              saveKey={'email'}
              type={'string'}
              name={'Эл. Почта'}
              value={email}
              mutateFunc={setEmail}
            />
            <InputRow
              saveKey={'phone'}
              type={'string'}
              name={'Телефон'}
              value={phone}
              mutateFunc={setPhone}
            />
            {/*<InputRow saveKey={'password'} type={'password'} name={'Пароль'} value={password} mutateFunc={setPassword}/>*/}
          </div>
        </div>

        <div className={'grid grid-cols-2 gap-3'}>
          <div className={'bg-black mt-3 p-4 rounded-2xl bg-opacity-15'}>
            <p className={'text-md font-bold text-white'}>Безопасность</p>
            <div className={'flex flex-col gap-2'}>
              <InputRow
                saveKey={'password'}
                type={'password'}
                name={'Пароль'}
                value={password}
                mutateFunc={setPassword}
              />
            </div>
          </div>
          <div className={'bg-black mt-3 p-4 rounded-2xl bg-opacity-15'}>
            <p className={'text-md font-bold text-white'}>
              Информация о подписке
            </p>
            <div className={'flex flex-col gap-2'}>
              <div className={'flex gap-2 mt-2 items-center'}>
                <p className={'text-white opacity-50 text-sm'}>
                  Действительна до:{' '}
                </p>
                <p className={'text-white opacity-100 text-sm'}>
                  {format(addYears(new Date(), 1), 'dd.MM.yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
