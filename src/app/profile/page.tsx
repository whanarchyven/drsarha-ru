'use client';

import InputRow from '@/src/shared/ui/input-row';
import { useEffect, useState } from 'react';
import { updateProfile } from '@/src/shared/api/update-profile';
import { getProfile } from '@/src/shared/api/get-profile';
import { checkAuth } from '@/src/shared/utils/check-auth';

export default function Home() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('Мужской');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('**********');

  const fetchProfile = async () => {
    const data = await getProfile();
    setName(data.name ?? '');
    setBirthDate(data.birthDate ? new Date(data.birthDate ?? '') : new Date());
    setGender(data.gender ?? 'Мужской');
    setEmail(data.email ?? '');
    setPhone(data.phone ?? '');
  };

  useEffect(() => {
    checkAuth();
    fetchProfile();
    setPassword(localStorage.getItem('password') ?? '');
  }, []);

  const saveFunction = async () => {
    const data = await updateProfile({
      email,
      name,
      birthDate: birthDate.toISOString(),
      gender,
      phone,
      password,
    });
    console.log(data);
  };

  return (
    <>
      <main className={'min-h-screen py-3'}>
        <div className={'bg-black p-4 rounded-2xl bg-opacity-15'}>
          <p className={'text-md font-bold text-white'}>Основная информация</p>
          <div className={'flex flex-col gap-2'}>
            <InputRow
              saveFunction={saveFunction}
              saveKey={'name'}
              type={'string'}
              name={'ФИО'}
              value={name}
              mutateFunc={setName}
            />
            <InputRow
              saveFunction={saveFunction}
              saveKey={'birthDate'}
              type={'date'}
              name={'Дата рождения'}
              value={birthDate}
              mutateFunc={setBirthDate}
            />
            <InputRow
              saveFunction={saveFunction}
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
              saveFunction={saveFunction}
              saveKey={'email'}
              type={'string'}
              name={'Эл. Почта'}
              value={email}
              mutateFunc={setEmail}
            />
            <InputRow
              saveFunction={saveFunction}
              saveKey={'phone'}
              type={'string'}
              name={'Телефон'}
              value={phone}
              mutateFunc={setPhone}
            />
            {/*<InputRow saveKey={'password'} type={'password'} name={'Пароль'} value={password} mutateFunc={setPassword}/>*/}
          </div>
        </div>

        {/*<div className={'grid grid-cols-2 gap-3'}>*/}
        {/*    <div className={'bg-black mt-3 p-4 rounded-2xl bg-opacity-15'}>*/}
        {/*        <p className={'text-md font-bold text-white'}>Безопасность</p>*/}
        {/*        <div className={'flex flex-col gap-2'}>*/}
        {/*            <InputRow saveFunction={saveFunction}*/}
        {/*                      saveKey={'password'}*/}
        {/*                      type={'password'}*/}
        {/*                      name={'Пароль'}*/}
        {/*                      value={password}*/}
        {/*                      mutateFunc={setPassword}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={'bg-black mt-3 p-4 rounded-2xl bg-opacity-15'}>*/}
        {/*        <p className={'text-md font-bold text-white'}>*/}
        {/*            Информация о подписке*/}
        {/*        </p>*/}
        {/*        <div className={'flex flex-col gap-2'}>*/}
        {/*            <div className={'flex gap-2 mt-2 items-center'}>*/}
        {/*                <p className={'text-white opacity-50 text-sm'}>*/}
        {/*                    Действительна до:{' '}*/}
        {/*                </p>*/}
        {/*                <p className={'text-white opacity-100 text-sm'}>*/}
        {/*                    {format(addYears(new Date(), 1), 'dd.MM.yyyy')}*/}
        {/*                </p>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
      </main>
    </>
  );
}
