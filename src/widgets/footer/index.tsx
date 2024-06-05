import { FC } from 'react';

const Footer: FC = () => {
  return (
    <div
      className={
        'md:p-10 p-3 bg-black text-sm flex md:flex-row flex-col gap-5 justify-between w-full'
      }>
      <p className={'text-white font-extralight col-span-2'}>
        <span className={'font-bold'}>
          Индивидуальный предприниматель Савелов Андрей Сергеевич
        </span>
        <br />
        <br />
        <span className={'font-bold'}>Юридический адрес:</span> 165500,
        Архангельская область, с. Верхняя Тойма, ул. Нагорная, д.3а <br />{' '}
        <br />
        <span className={'font-bold'}>ИНН: 290800097280</span>
      </p>
      <div className={'flex flex-col items-start md:items-end gap-2'}>
        <a
          target={'_blank'}
          href={'/files/Политика_в_отношении_обработки_персональных_данных.pdf'}
          className={'text-white underline'}>
          Политика конфиденциальности
        </a>
        <a
          target={'_blank'}
          href={'/files/Пользовательское соглашение.pdf'}
          className={'text-white underline'}>
          Пользовательское соглашение
        </a>
        <a
          target={'_blank'}
          href={'/files/Оферта_на_предоставление_информационных_услуг.pdf'}
          className={'text-white underline'}>
          Публичная оферта
        </a>
      </div>
    </div>
  );
};

export default Footer;
