'use client';
import { FC, useState } from 'react';
import GridIcon from '@/public/icons/grid.svg';
import RowIcon from '@/public/icons/row.svg';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface gridPickerInterface {
  mutateFunc: (arg: any) => any;
  gridArg: string;
  rowArg: string;
  className?: string;
}

const cvaIcon = cva(['w-2 cursor-pointer transition-all duration-300'], {
  variants: {
    isActive: {
      true: 'opacity-100',
      false: 'opacity-50',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

const GridPicker: FC<gridPickerInterface> = ({
  mutateFunc,
  gridArg,
  rowArg,
  className,
}) => {
  const [display, setDisplay] = useState('grid');

  return (
    <div
      className={clsx(
        'rounded-full flex gap-2 bg-black bg-opacity-[0.15] px-2 py-1',
        className
      )}>
      <GridIcon
        onClick={() => {
          setDisplay('grid');
          mutateFunc(gridArg);
        }}
        className={cvaIcon({ isActive: display == 'grid' })}
      />
      <RowIcon
        onClick={() => {
          setDisplay('row');
          mutateFunc(rowArg);
        }}
        className={cvaIcon({ isActive: display == 'row' })}
      />
    </div>
  );
};

export default GridPicker;
