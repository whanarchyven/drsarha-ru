import { FC, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

interface actionButtonInterface extends VariantProps<typeof cvaRoot> {
  label: string;
  icon: ReactNode;
  onClick?: () => any;
}

const cvaRoot = cva(
  [
    'p-1 md:py-2 md:px-4 rounded-3xl cursor-pointer border-[2px] flex gap-2 items-center border-white ',
  ],
  {
    variants: {
      filled: {
        true: 'bg-white',
        false: '',
      },
    },
  }
);
const cvaLabel = cva(['font-bold text-xs md:text-base'], {
  variants: {
    filled: {
      true: 'text-cGreen',
      false: 'text-white',
    },
  },
});

const ActionButton: FC<actionButtonInterface> = ({
  label,
  icon,
  onClick,
  filled,
}) => {
  return (
    <div onClick={onClick} className={cvaRoot({ filled })}>
      <p className={cvaLabel({ filled })}>{label}</p>
      {icon}
    </div>
  );
};

export default ActionButton;
