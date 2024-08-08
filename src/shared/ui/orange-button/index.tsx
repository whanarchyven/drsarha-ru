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
        'md:p-2 p-1 text-[0.9rem] md:text-base rounded-[2rem] cursor-pointer font-bold flex items-center w-fit justify-center bg-cOrange text-white',
        className
      )}>
      {children}
    </div>
  );
};

export default OrangeButton;
