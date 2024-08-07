import { FC, ReactNode, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardTileInterface
  extends VariantProps<typeof cvaTitle>,
    VariantProps<typeof cvaBackdropCard> {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

const cvaRoot = cva(['w-full p-2 md:p-4 h-full rounded-[2rem]'], {
  variants: {
    type: {
      white: 'bg-white',
      dark: 'text-white tile-inner-shadow bg-opacity-10 bg-black',
    },
  },
});

const cvaCard = cva(['w-full grid grid-cols-2 gap-3 items-start relative']);

const cvaTitle = cva(['md:text-lg text-sm'], {
  variants: {
    type: {
      white: 'text-[#0E656F]',
      dark: 'text-white',
    },
  },
});

const cvaAbout = cva(['text-sm underline cursor-pointer opacity-50'], {
  variants: {
    type: {
      white: 'text-[#0E656F]',
      dark: 'text-white',
    },
  },
});

const cvaDescription = cva(['text-[1.1rem] md:text-sm whitespace-pre-wrap'], {
  variants: {
    type: {
      white: 'text-[#0E656F]',
      dark: 'text-white',
    },
  },
});

const cvaBackdropCard = cva(
  [
    'w-full absolute md:h-full md:flex hidden bg-black rounded-[2rem] opacity-30 bg-opacity-25 z-[-1]',
  ],
  {
    variants: {
      align: {
        left: '-left-3 -top-3 -rotate-[4deg]',
        right: '-right-3 -bottom-3 rotate-[4deg]',
      },
    },
  }
);

const CardTile: FC<CardTileInterface> = ({
  type,
  title,
  icon,
  description,
  align,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      onClick={() => setIsOpen(!isOpen)}
      className="relative cursor-pointer w-full h-[20rem] md:h-[30rem]"
      style={{ perspective: 1000 }}>
      {type == 'dark' && <div className={cvaBackdropCard({ align })}></div>}
      <motion.div
        className={clsx(
          'absolute backdrop-blur-2xl z-50 w-full h-full md:h-full'
        )}
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{ duration: 0.6 }}>
        <div className={cvaRoot({ type })}>
          <div className={cvaCard()}>
            {type === 'white' && (
              <div className="rounded-full green-bounce-shadow w-2 md:w-3 absolute -right-1 -top-1 md:-right-2 md:-top-2 aspect-square bg-[#43ABAD]"></div>
            )}
            <div className="flex flex-col gap-3 md:h-full justify-between">
              <div className={cvaTitle({ type })}>{title}</div>
              <p className={cvaAbout({ type })}>Подробнее</p>
            </div>
            <div className="md:h-full flex md:w-full w-10 justify-end">
              {icon}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={clsx('absolute w-full backdrop-blur-2xl h-full')}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.6 }}>
        <div className={cvaRoot({ type })}>
          <div className="h-[20rem]">
            <div className="flex flex-col gap-3">
              <p className={clsx('cursor-pointer', cvaDescription({ type }))}>
                ← Назад
              </p>
              <div className={cvaDescription({ type })}>{description}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CardTile;
