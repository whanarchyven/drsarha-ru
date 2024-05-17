import { FC } from 'react';
import clsx from 'clsx';
import SearchIcon from '@/public/icons/search.svg';

interface searchInputInterface {
  mutateFunc: (arg: any) => any;
  value: string;
  className?: string;
}

const SearchInput: FC<searchInputInterface> = ({
  mutateFunc,
  className,
  value,
}) => {
  return (
    <div
      className={clsx(
        'px-2 py-1 bg-black flex rounded-full gap-2 bg-opacity-[0.15]',
        className
      )}>
      <input
        value={value}
        onChange={(event) => {
          mutateFunc(event.target.value);
        }}
        placeholder={'Поиск...'}
        className={
          'bg-transparent placeholder:text-white placeholder:text-opacity-50 h-full outline-0  text-white text-sm w-full'
        }
      />
      {value.length > 0 ? (
        <div
          className={
            'h-3 p-1 flex items-center justify-center text-sm rounded-full bg-white cursor-pointer'
          }>
          Поиск
        </div>
      ) : (
        <SearchIcon className={'h-3'} />
      )}
    </div>
  );
};

export default SearchInput;
