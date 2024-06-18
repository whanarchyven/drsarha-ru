import { FC } from 'react';
import ViewIcon from '@/public/icons/view.svg';
import DocumentIcon from '@/public/icons/doc.svg';
import SaveIcon from '@/public/icons/save.svg';
import OkIcon from '@/public/icons/check.svg';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';
import ActionButton from '@/src/shared/ui/action-button';
import Link from 'next/link';

interface postInterface extends VariantProps<typeof cvaRoot> {
  title: string;
  description: string;
  source: string;
  file: string;
  isSaved?: boolean;
  isViewed?: boolean;
  displayView: 'top' | 'bottom';
  deleteFunc: () => any;
  saveFunc: () => any;
  viewFunc: () => any;
  displaySaveBtn?: boolean;
  locale?: string;
}

const cvaRoot = cva(
  ['bg-black text-white bg-opacity-[0.15] rounded-2xl flex flex-col '],
  {
    variants: {
      mode: {
        grid: 'p-3 gap-2',
        row: 'p-6 gap-3',
      },
    },
    defaultVariants: { mode: 'grid' },
  }
);

const cvaTitle = cva(['font-bold w-full'], {
  variants: {
    mode: {
      grid: 'md:text-lg',
      row: 'text-xl',
    },
  },
  defaultVariants: { mode: 'grid' },
});

const cvaDescription = cva([''], {
  variants: {
    mode: {
      grid: 'text-xs md:text-base',
      row: 'text-md',
    },
  },
  defaultVariants: { mode: 'grid' },
});

const cvaIcon = cva(['w-1 md:w-2'], {
  variants: {
    filled: {
      true: 'fill-cGreen',
      false: 'fill-white',
    },
  },
});

const Post: FC<postInterface> = ({
  title,
  description,
  isSaved,
  file,
  isViewed,
  displayView,
  mode,
  saveFunc,
  deleteFunc,
  viewFunc,
  displaySaveBtn,
  locale,
}) => {
  return (
    <div className={clsx(cvaRoot({ mode: mode }))}>
      <div className={'flex items-start justify-between'}>
        <p className={cvaTitle({ mode: mode })}>{title}</p>
        {displayView == 'top' && isViewed && (
          <ViewIcon className={'w-3 opacity-50'} />
        )}
      </div>
      <p className={cvaDescription({ mode: mode })}>{description}</p>
      {/*<p className={'md:text-md text-sm opacity-50'}>Источник: {source}</p>*/}
      <div className={'flex gap-3 items-center'}>
        <Link
          target={'_blank'}
          onClick={() => {
            viewFunc();
          }}
          href={file}>
          <ActionButton
            label={locale == 'en' ? 'Read' : 'Читать'}
            icon={<DocumentIcon className={cvaIcon({ filled: true })} />}
            filled={true}
          />
        </Link>
        {displaySaveBtn && (
          <>
            {isSaved ? (
              <ActionButton
                label={locale == 'en' ? 'Saved' : 'Сохранено'}
                icon={<OkIcon className={cvaIcon({ filled: true })} />}
                filled={true}
                onClick={() => {
                  deleteFunc();
                }}
              />
            ) : (
              <ActionButton
                label={locale == 'en' ? 'Save' : 'Сохранить'}
                icon={<SaveIcon className={cvaIcon({ filled: false })} />}
                filled={false}
                onClick={() => {
                  saveFunc();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
