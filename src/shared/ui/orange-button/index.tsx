import { FC, ReactNode } from 'react';

interface OrangeButtonInterface {
  children: ReactNode;
}
const OrangeButton: FC<OrangeButtonInterface> = ({ children }) => {
  return (
    <div
      className={
        'p-2 text-md rounded-[2rem] cursor-pointer font-bold flex items-center w-fit justify-center bg-cOrange text-white'
      }>
      {children}
    </div>
  );
};

export default OrangeButton;
