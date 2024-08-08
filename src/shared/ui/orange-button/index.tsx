import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface OrangeButtonInterface {
  children: ReactNode;
  className?: string;
  onClick?: () => any;
}

const OrangeButton: FC<OrangeButtonInterface> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={clsx(
        'p-2 text-base rounded-[2rem] cursor-pointer font-bold flex items-center w-fit justify-center bg-cOrange text-white',
        className
      )}>
      {children}
    </div>
  );
};

export default OrangeButton;
