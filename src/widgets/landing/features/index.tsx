import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import OrangeButton from '@/src/shared/ui/orange-button';
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import clsx from 'clsx';
import Link from 'next/link';

const Features = () => {
  const sectionsRef = useRef<any>([]);

  const swiperRef = useRef<SwiperRef>(null);

  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          swiperRef.current?.swiper.slideTo(
            getSlideId(entry.target.getAttribute('data-section'))
          );
          setActiveSection(
            getSlideId(entry.target.getAttribute('data-section'))
          );
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionsRef.current.forEach((section: any) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section: any) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const getSlideId = (activeSection: any) => {
    switch (activeSection) {
      case 'screen1':
        return 0;
      case 'screen2':
        return 1;
      case 'screen3':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div id={'howtowork'} className={'relative'}>
      <div className={'md:mt-0 mt-7'}>
        <div className={'border-cYellow pl-44 pt-80 relative '}>
          <div className="flex justify-between">
            {/* Левый блок с текстом */}
            <div className="w-1/2 mt:w-2/5">
              <motion.div
                id={'screen1'}
                ref={(el) => (sectionsRef.current[0] = el)}
                data-section="screen1"
                className={
                  'w-full text-white md:h-screen flex flex-col justify-center gap-1 mt:gap-3'
                }>
                <motion.p
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={'font-inter font-bold text-base md:text-[5rem]'}>
                  Быстрый поиск
                  <br />
                  информации
                </motion.p>
                <motion.p
                  className={'md:text-base text-[1.2rem]'}
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
                  С нашим AI-помощником вы мгновенно получаете мировую
                  информацию на одном сервисе и на родном языке. Экономьте
                  время, забыв про переводы и долгие поиски, и сразу получайте
                  свежие научные статьи и новости медицины.
                </motion.p>
                <motion.div
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}>
                  <Link href={'#subscribe'}>
                    <OrangeButton className={'mt:text-base  !mt:p-2'}>
                      Подписаться
                    </OrangeButton>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                id={'screen2'}
                ref={(el) => (sectionsRef.current[1] = el)}
                data-section="screen2"
                className={
                  'w-full text-white md:mt-0 mt-5 md:h-screen flex flex-col justify-center gap-1 mt:gap-3'
                }>
                <motion.p
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={'font-inter font-bold text-base md:text-[5rem]'}>
                  Помощь в
                  <br />
                  написании статей
                </motion.p>
                <motion.p
                  className={'md:text-base text-[1.2rem]'}
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
                  AI-помощник готов ответить на любой ваш вопрос и быстро
                  предоставить необходимую информацию. Вы можете легко найти
                  нужные данные и исследования для написания научных статей,
                  сократив время на поиски и анализ.
                </motion.p>
                <motion.div
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}>
                  <Link href={'#subscribe'}>
                    <OrangeButton className={'mt:text-base  !mt:p-2'}>
                      Подписаться
                    </OrangeButton>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                id={'screen3'}
                ref={(el) => (sectionsRef.current[2] = el)}
                data-section="screen3"
                className={
                  'w-full text-white md:mt-0 mt-5 md:h-screen flex flex-col justify-center gap-1 mt:gap-3'
                }>
                <motion.p
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={'font-inter font-bold text-base md:text-[5rem]'}>
                  Удобная работа
                  <br />с текстами
                </motion.p>
                <motion.p
                  initial={{ y: '-20px', opacity: 0 }}
                  className={'md:text-base text-[1.2rem]'}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
                  Наш сервис позволяет быстро структурировать и формировать
                  собственные научные статьи в один клик. Сосредоточьтесь на
                  содержании, а наш AI-помощник позаботится о структуре и
                  оформлении, значительно ускоряя процесс написания и
                  публикации.
                </motion.p>
                <motion.div
                  initial={{ y: '-20px', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}>
                  <Link href={'#subscribe'}>
                    <OrangeButton className={'mt:text-base  !mt:p-2'}>
                      Подписаться
                    </OrangeButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <div
              className={
                '!absolute z-50 md:hidden flex top-0 right-0 w-1/2 h-full '
              }></div>
            <Swiper
              ref={swiperRef}
              className={
                'md:w-[55rem] w-[20rem] h-[22rem] md:h-[60rem] !sticky top-9'
              }
              spaceBetween={50}
              slidesPerView={1}
              direction={'vertical'}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}>
              <SwiperSlide className={'w-full h-full'}>
                <img
                  className={'w-full h-full'}
                  src={'/images/landing/features/1.png'}
                />
              </SwiperSlide>
              <SwiperSlide className={'w-full h-full'}>
                <img
                  className={'w-full h-full'}
                  src={'/images/landing/features/2.png'}
                />
              </SwiperSlide>
              <SwiperSlide className={'w-full h-full'}>
                <img
                  className={'w-full h-full'}
                  src={'/images/landing/features/3.png'}
                />
              </SwiperSlide>
              <div
                className={'absolute z-50 right-0 flex top-1/2 flex-col gap-1'}>
                {[0, 1, 2].map((dot) => {
                  return (
                    <a
                      href={`#screen${dot + 1}`}
                      onClick={() => {}}
                      key={dot}
                      className={clsx(
                        'bg-white cursor-pointer w-1 h-1 rounded-full',
                        dot == activeSection ? 'opacity-100' : 'opacity-30'
                      )}></a>
                  );
                })}
              </div>
            </Swiper>

            {/*<img*/}
            {/*    src={getImageSrc()}*/}
            {/*    alt="YOZH"*/}
            {/*    className="w-[55rem] h-[60rem] sticky top-9"*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
