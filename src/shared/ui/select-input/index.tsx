import { FC } from 'react';
import clsx from 'clsx';
import SearchIcon from '@/public/icons/categories.svg';

interface searchInputInterface {
  mutateFunc: (arg: any) => any;
  value: string;
  options: string[];
  className?: string;
}

const SearchInput: FC<searchInputInterface> = ({
  mutateFunc,
  className,
  value,
  options,
}) => {
  return (
    <div
      className={clsx(
        'md:px-2 px-1 py-0.5 md:py-1 bg-black flex items-center rounded-full gap-2 bg-opacity-[0.15]',
        className
      )}>
      <select
        defaultValue={'Категория'}
        value={value}
        onChange={(event) => {
          mutateFunc(event.target.value);
        }}
        placeholder={''}
        className={
          'bg-transparent placeholder:text-white placeholder:text-opacity-50 h-full outline-0 cursor-pointer text-white text-[1rem] md:text-sm w-full'
        }>
        {options.map((option) => (
          <option key={option} className={'text-black'}>
            {option}
          </option>
        ))}
      </select>
      <SearchIcon className={'h-3'} />
    </div>
  );
};

export default SearchInput;
