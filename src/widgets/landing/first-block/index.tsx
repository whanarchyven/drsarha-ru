'use client';
import React, { useEffect, useState } from 'react';
import OrangeButton from '@/src/shared/ui/orange-button';
import AssistentIcon from '@/public/images/landing/personal-ai-helper.svg';
import QuestionIcon from '@/public/images/landing/question.svg';
import CursorIcon from '@/public/images/landing/cursor.svg';
import AddAiIcon from '@/public/images/landing/add_ai.svg';
import DocIcon from '@/public/images/landing/doc.svg';
import DrugIcon from '@/public/images/landing/drug.svg';
import { useMotionValue, useTransform, motion } from 'framer-motion';
import CardTile from '@/src/shared/ui/card-tile';
import { cva } from 'class-variance-authority';

const FirstBlock = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Motion values for x and y
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      // Transform motion values for parallax effect
      const handleMouseMove = (event: any) => {
        setMouseX(event.clientX);
        setMouseY(event.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Update motion values based on state
  useEffect(() => {
    x.set(mouseX);
    y.set(mouseY);
  }, [mouseX, mouseY, x, y]);

  // Default values for width and height to avoid undefined errors during SSR
  const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;

  const xTransform = useTransform(x, [0, innerWidth], [-50, 50]);
  const yTransform = useTransform(y, [0, innerHeight], [-50, 50]);

  const cvaCardIcon = cva(['h-[20rem]'], {
    variants: {
      type: {
        dark: 'fill-white opacity-20',
        white: 'fill-[#035964] opacity-10',
      },
    },
  });

  return (
    <>
      <div className={'h-screen -mt-10 flex justify-between items-center'}>
        <motion.div className={'w-1/2 text-white flex flex-col gap-3'}>
          <motion.p
            initial={{ x: '-200px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={'font-inter font-bold text-[5rem]'}>
            С нами вы всегда
            <br />
            на шаг впереди!
          </motion.p>
          <motion.p
            initial={{ y: '-20px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
            Читайте свежие статьи и новости в сфере дерматологии на родном языке
            и ускоряйте работу над научными трудами с персональным
            AI-помощником.
          </motion.p>
          <motion.div
            initial={{ y: '-20px', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}>
            <OrangeButton>Подписаться</OrangeButton>
          </motion.div>
        </motion.div>
        <div className={'relative h-[50rem]'}>
          <div
            className={
              'w-[40rem] aspect-square green-shadow absolute right-0 z-10 bottom-0 backdrop-blur-3xl bg-black bg-opacity-25 rounded-[4rem]'
            }></div>
          <div
            className={
              'w-[32rem] aspect-square green-shadow opacity-30 -rotate-[7deg] absolute right-[20rem] bottom-1 bg-black bg-opacity-25 rounded-[4rem]'
            }></div>
          <motion.div
            initial={{ x: '-100px', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
            className={
              'p-2 whitespace-nowrap flex justify-end w-[20rem] font-bold text-white green-shadow absolute -right-3 z-20 top-[15rem] backdrop-blur-3xl bg-[#DDDDDD] bg-opacity-25 rounded-r-[2rem]'
            }>
            Доктор <br /> сара
          </motion.div>
          <motion.div
            initial={{ y: '0', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={
              'w-[40rem] aspect-square absolute right-0 z-30 bottom-0'
            }>
            <img src={'/images/landing/sara_main.png'} />
          </motion.div>

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            className={
              'p-2 flex justify-center items-center gap-2 font-bold text-white green-shadow absolute right-[27rem] z-30 bottom-[5rem] backdrop-blur-3xl bg-[#DDDDDD] bg-opacity-25 rounded-[2rem]'
            }>
            <AssistentIcon className={'w-6'} />
            <p>Персональный AI-помощник</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            style={{ x: xTransform, y: yTransform }}
            className={'absolute -right-[3rem] z-50 bottom-[7rem]'}>
            <CursorIcon />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ x: xTransform, y: yTransform }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            className={'absolute right-[30rem] z-50 top-[15rem]'}>
            <QuestionIcon />
          </motion.div>
        </div>
      </div>
      <div className={'h-screen flex justify-between items-center'}>
        <div className={'w-full grid grid-cols-2 gap-3'}>
          <CardTile
            type={'dark'}
            align={'left'}
            icon={<AssistentIcon className={cvaCardIcon({ type: 'dark' })} />}
            title={
              <p>
                <strong>Всегда в курсе</strong> событий в мире дерматологии
              </p>
            }
            description={
              <p>
                Всегда в курсе событий в мире дерматологии Всегда в курсе
                событий в мире дерматологии Всегда в курсе событий в мире
                дерматологии Всегда в курсе событий в мире дерматологии
              </p>
            }
          />
          <CardTile
            type={'white'}
            icon={<AddAiIcon className={cvaCardIcon({ type: 'white' })} />}
            title={
              <p>
                Персональный <br />
                <strong>AI-помощник</strong>
              </p>
            }
            description={
              <p>
                Всегда в курсе событий в мире дерматологии Всегда в курсе
                событий в мире дерматологии Всегда в курсе событий в мире
                дерматологии Всегда в курсе событий в мире дерматологии
              </p>
            }
          />

          <CardTile
            type={'white'}
            icon={<DocIcon className={cvaCardIcon({ type: 'white' })} />}
            title={
              <p>
                Доступ к последним <br />
                научным статьям и новостям <br />
                <strong>на родном языке</strong>
              </p>
            }
            description={
              <p>
                Всегда в курсе событий в мире дерматологии Всегда в курсе
                событий в мире дерматологии Всегда в курсе событий в мире
                дерматологии Всегда в курсе событий в мире дерматологии
              </p>
            }
          />

          <CardTile
            type={'dark'}
            align={'right'}
            icon={<DrugIcon className={cvaCardIcon({ type: 'dark' })} />}
            title={
              <p>
                <strong>Доказательная медицина</strong> и международные
                клинические рекомендации
              </p>
            }
            description={
              <p>
                Всегда в курсе событий в мире дерматологии Всегда в курсе
                событий в мире дерматологии Всегда в курсе событий в мире
                дерматологии Всегда в курсе событий в мире дерматологии
              </p>
            }
          />
        </div>
      </div>
    </>
  );
};

export default FirstBlock;
