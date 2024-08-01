'use client';
import EditIcon from '@/public/images/edit.svg';
import SaveIcon from '@/public/images/save.svg';

import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

interface InputRowInterface {
  name: string;
  value: any;
  mutateFunc: (arg: any) => any;
  type: 'string' | 'date' | 'password' | 'gender';
  saveKey: string;
  saveFunction: () => any;
}

const InputRow: FC<InputRowInterface> = ({
  name,
  value,
  mutateFunc,
  type,
  saveFunction,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(
    type == 'date' ? value : new Date()
  );

  return (
    <div
      className={
        'w-full py-2 grid gap-3 grid-cols-7 border-b-2 border-white border-opacity-50'
      }>
      <p className={'col-span-1 text-white text-base opacity-50'}>{name}:</p>
      {isEditing ? (
        <div className={'flex col-span-6 gap-2 items-center justify-between'}>
          {type == 'string' && (
            <input
              className={
                'w-full h-full text-white border-2 border-white bg-transparent'
              }
              value={value}
              onChange={(event) => {
                mutateFunc(event.target.value);
              }}
            />
          )}
          {type == 'date' && (
            <DatePicker
              locale={ru}
              dateFormat={'P'}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                mutateFunc(date);
              }}
            />
          )}
          {type == 'gender' && (
            <select
              onChange={(event) => {
                mutateFunc(event.target.value);
              }}
              className={
                'w-full h-full text-white border-2 border-white bg-transparent'
              }>
              <option
                value={'Мужской'}
                selected={value == 'Мужской'}
                className={'bg-transparent text-black'}>
                Мужской
              </option>
              <option
                value={'Женский'}
                selected={value == 'Женский'}
                className={'bg-transparent text-black'}>
                Женский
              </option>
            </select>
          )}
          {type == 'password' && (
            <input
              type={'password'}
              className={
                'w-full h-full text-white border-2 border-white bg-transparent'
              }
              value={value}
              onChange={(event) => {
                mutateFunc(event.target.value);
              }}
            />
          )}

          <SaveIcon
            onClick={() => {
              setIsEditing(false);
              saveFunction();
            }}
            className={'w-3 h-3 cursor-pointer'}
          />
        </div>
      ) : (
        <div className={'flex col-span-6 gap-2 items-center justify-between'}>
          {type == 'string' && (
            <p className={'text-white border-b-2 border-transparent'}>
              {value}
            </p>
          )}
          {type == 'date' && (
            <p className={'text-white border-b-2 border-transparent'}>
              {format(value, 'dd MMMM yyyy', { locale: ru })}
            </p>
          )}
          {type == 'gender' && (
            <p className={'text-white border-b-2 border-transparent'}>
              {value}
            </p>
          )}
          {type == 'password' && (
            <input
              type={'password'}
              disabled={true}
              className={
                'w-full h-full text-white border-2 border-transparent bg-transparent'
              }
              value={value}
            />
          )}
          <EditIcon
            onClick={() => {
              setIsEditing(true);
            }}
            className={'w-2 h-2 cursor-pointer'}
          />
        </div>
      )}
    </div>
  );
};

export default InputRow;
