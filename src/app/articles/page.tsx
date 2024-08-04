'use client';
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { getArticle } from '@/src/shared/api/get-article';

import Footer from '@/src/widgets/footer';
import { viewPost } from '@/src/shared/api/view-post';
import OrangeButton from '@/src/shared/ui/orange-button';
import { getProfile } from '@/src/shared/api/get-profile';
import { PostType } from '@/src/app/new/page';

const ArticlePage = () => {
  const params = useSearchParams();

  const articleUrl = params.get('url');

  const [lang, setLang] = useState('en');

  const articleMock = {
    articleUrl:
      'https://practicaldermatology.com/news/spevigo-gets-expanded-indication-generalized-pustular-psoriasis-treatment-and-prevention/2467564/',
    content:
      "The European Medicines Agency’s Committee for Medicinal Products for Human Use (CHMP) has issued a positive opinion recommending the approval expanded indications for spesolimab (SPEVIGO®), according to a press release.\n\nA humanized selective IgG1 antibody targeting the interleukin-36 receptor (IL-36R), spesolimab is currently approved in 51 countries for the treatment of generalized pustular psoriasis (GPP) flares. The Committee's recommendation includes new approvals for preventing GPP flares in adults and adolescents aged 12 and older, as well as extending its approved use as a monotherapy for GPP flares in the same age group.\n\n“GPP presents a significant diagnostic challenge for healthcare professionals as it is a highly variable rare disease that is experienced differently by everyone who has it, and it has suffered from a historic lack of treatment options,” said Dr Peter van der Kerkhof, Professor and previous Chairman of the Department of Dermatology, Radboud University Nijmegen Medical Centre, Nijmegen, the Netherlands, in a news release from Boehringer Ingelheim. “Spesolimab’s recent approvals, combined with the CHMP recommendation provides us with the potential for continuous treatment, addressing a significant unmet need.”\n\nThe recommendation is based on the EFFISAYIL 2 clinical trial, the results of which showed a significant (84%) reduction in the risk of GPP flares over 48 weeks, with no flares observed after the fourth week of subcutaneous spesolimab administration in the high-dose group. The trial included 123 participants and found a similar incidence of adverse events in both the spesolimab and placebo groups.\n\n\"GPP goes way beyond the skin, it's a relentless and unpredictable disease that can impact every aspect of a person's life,” said Frida Dunger, Executive Director, IFPA (International Federation of Psoriasis Associations), in the press release. “I want a world where every person with GPP is diagnosed quickly and receives the treatment they need, and this is their right. There is much more to do, but I believe with all stakeholders working together we are headed in the right direction.”\n\n\n\nSource: Boehringer Ingelheim press release. July 29, 2024.",
    createdAt: '2024-07-29T18:31:19.436000',
    mainUrl: 'https://practicaldermatology.com/medical-news',
    publishedDate: '2024-07-29T00:00:00',
    title:
      'Committee Recommends Expanded Indications for Spesolimab, Targeting Generalized Pustular Psoriasis',
    updatedAt: '2024-07-31T14:24:08.430000',
    summary_ai:
      '- Европейское агентство по лекарственным средствам (EMA) рекомендовало расширение показаний для использования спецолимаба (SPEVIGO®), направленного на рецептор интерлейкина-36 (IL-36R).\n- Спецолимаб одобрен в 51 стране для лечения обострений генерализованного пустулезного псориаза (ГПП). Новые показания включают предотвращение обострений ГПП у взрослых и подростков (12+), а также использование в качестве монотерапии для обострений в той же возрастной группе.\n- Рекомендация основана на результатах клинического исследования EFFISAYIL 2, в котором показано значительное (84%) снижение риска обострений ГПП в течение 48 недель. После четвертой недели применения подкожного спецолимаба не наблюдалось обострений у участников высокой дозы.\n- Профессор Питер ван дер Керхоф отметил, что спецолимаб заполняет значительный пробел в лечении ГПП, который является редким и вариабельным заболеванием, с историческим дефицитом лечебных опций.\n- Клиницисты и представители пациентских организаций подчеркивают важность своевременной диагностики и лечения ГПП, который существенно влияет на качество жизни пациентов.',
    title_translation_ai:
      'Европейский агентство по лекарственным средствам расширяет показания для применения Спезолимаба в лечении и профилактике генерализованного пустулезного псориаза',
    translation_ai:
      'Комитет по лекарственным средствам для человека (CHMP) Европейского агентства по лекарственным средствам (EMA) выпустил положительное заключение, рекомендующее одобрение расширенных показаний для специлимаба (SPEVIGO®), согласно пресс-релизу.\n\nСпецилимаб, являющийся гуманизированным селективным антителом IgG1, направленным на рецептор интерлейкина-36 (IL-36R), в настоящее время одобрен в 51 стране для лечения вспышек генерализованного пустулезного псориаза (ГПП). Рекомендация Комитета включает новые одобрения для предотвращения вспышек ГПП у взрослых и подростков в возрасте от 12 лет и старше, а также расширение его применения как монотерапии для лечения вспышек ГПП в той же возрастной группе.\n\n«ГПП представляет значительную диагностическую проблему для медицинских профессионалов, так как это весьма вариабельное редкое заболевание, которое по-разному проявляется у каждого пациента и исторически испытывало недостаток в вариантах лечения», — сказал доктор Питер ван дер Керхоф, профессор и бывший председатель кафедры дерматологии, Медицинский центр Университета Радбоуд в Неймегене, Нидерланды, в пресс-релизе компании Boehringer Ingelheim. «Недавние одобрения специлимаба, в сочетании с рекомендацией CHMP, предоставляют нам потенциал для непрерывного лечения, что удовлетворяет значительную незакрытую потребность».\n\nРекомендация основывается на клиническом исследовании EFFISAYIL 2, результаты которого показали значительное (84%) снижение риска вспышек ГПП в течение 48 недель, без наблюдавшихся вспышек после четвертой недели подкожного введения специлимаба в группе с высокой дозировкой. В исследовании приняли участие 123 человека, и была выявлена схожая частота нежелательных явлений как в группе специлимаба, так и в группе плацебо.\n\n«ГПП выходит далеко за пределы кожи, это непреклонное и непредсказуемое заболевание, которое может затронуть все аспекты жизни человека», — сказала Фрида Дунгер, исполнительный директор Международной федерации ассоциаций псориаза (IFPA), в пресс-релизе. «Я хочу видеть мир, в котором каждый человек с ГПП будет быстро диагностирован и получит необходимое лечение, и это их право. Предстоит еще многое сделать, но я верю, что с сотрудничеством всех заинтересованных сторон мы движемся в правильном направлении».\n\nИсточник: пресс-релиз компании Boehringer Ingelheim. 29 июля 2024 года.',
    summary_human:
      '- Европейское агентство по лекарственным средствам (EMA) рекомендовало расширение показаний для использования спецолимаба (SPEVIGO®), направленного на рецептор интерлейкина-36 (IL-36R).\n- Спецолимаб одобрен в 51 стране для лечения обострений генерализованного пустулезного псориаза (ГПП). Новые показания включают предотвращение обострений ГПП у взрослых и подростков (12+), а также использование в качестве монотерапии для обострений в той же возрастной группе.\n- Рекомендация основана на результатах клинического исследования EFFISAYIL 2, в котором показано значительное (84%) снижение риска обострений ГПП в течение 48 недель. После четвертой недели применения подкожного спецолимаба не наблюдалось обострений у участников высокой дозы.\n- Профессор Питер ван дер Керхоф отметил, что спецолимаб заполняет значительный пробел в лечении ГПП, который является редким и вариабельным заболеванием, с историческим дефицитом лечебных опций.\n- Клиницисты и представители пациентских организаций подчеркивают важность своевременной диагностики и лечения ГПП, который существенно влияет на качество жизни пациентов.',
    title_translation_human:
      'Европейский агентство по лекарственным средствам расширяет показания для применения Спезолимаба в лечении и профилактике генерализованного пустулезного псориаза',
    translation_human:
      'Комитет по лекарственным средствам для человека (CHMP) Европейского агентства по лекарственным средствам (EMA) выпустил положительное заключение, рекомендующее одобрение расширенных показаний для специлимаба (SPEVIGO®), согласно пресс-релизу.\n\nСпецилимаб, являющийся гуманизированным селективным антителом IgG1, направленным на рецептор интерлейкина-36 (IL-36R), в настоящее время одобрен в 51 стране для лечения вспышек генерализованного пустулезного псориаза (ГПП). Рекомендация Комитета включает новые одобрения для предотвращения вспышек ГПП у взрослых и подростков в возрасте от 12 лет и старше, а также расширение его применения как монотерапии для лечения вспышек ГПП в той же возрастной группе.\n\n«ГПП представляет значительную диагностическую проблему для медицинских профессионалов, так как это весьма вариабельное редкое заболевание, которое по-разному проявляется у каждого пациента и исторически испытывало недостаток в вариантах лечения», — сказал доктор Питер ван дер Керхоф, профессор и бывший председатель кафедры дерматологии, Медицинский центр Университета Радбоуд в Неймегене, Нидерланды, в пресс-релизе компании Boehringer Ingelheim. «Недавние одобрения специлимаба, в сочетании с рекомендацией CHMP, предоставляют нам потенциал для непрерывного лечения, что удовлетворяет значительную незакрытую потребность».\n\nРекомендация основывается на клиническом исследовании EFFISAYIL 2, результаты которого показали значительное (84%) снижение риска вспышек ГПП в течение 48 недель, без наблюдавшихся вспышек после четвертой недели подкожного введения специлимаба в группе с высокой дозировкой. В исследовании приняли участие 123 человека, и была выявлена схожая частота нежелательных явлений как в группе специлимаба, так и в группе плацебо.\n\n«ГПП выходит далеко за пределы кожи, это непреклонное и непредсказуемое заболевание, которое может затронуть все аспекты жизни человека», — сказала Фрида Дунгер, исполнительный директор Международной федерации ассоциаций псориаза (IFPA), в пресс-релизе. «Я хочу видеть мир, в котором каждый человек с ГПП будет быстро диагностирован и получит необходимое лечение, и это их право. Предстоит еще многое сделать, но я верю, что с сотрудничеством всех заинтересованных сторон мы движемся в правильном направлении».\n\nИсточник: пресс-релиз компании Boehringer Ingelheim. 29 июля 2024 года.',
    isPublished: false,
    category: '',
    source: 'practicaldermatology',
  };

  const [article, setArticle] = useState<typeof articleMock | null>(null);

  const fetchArticle = async () => {
    if (articleUrl) {
      const data = await getArticle(articleUrl);
      const user = await getProfile();
      if (
        !user?.saved.find(
          (item: PostType) => item.articleUrl == data.articleUrl
        )
      ) {
        const viewed = await viewPost(data);
        console.log(viewed, 'AUE', data);
      }
      setArticle(data);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const variants = {
    en: { left: 0, right: 'auto' },
    ru: { right: 0, left: 'auto' },
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const [isExport, setIsExport] = useState(false);

  return (
    <div
      className={'min-h-screen py-5 flex items-start justify-center relative'}>
      {article ? (
        <>
          <img
            src={'/asset_top.png'}
            className={'absolute z-[-1] left-0 top-0'}
          />
          <img
            src={'/asset_bottom.png'}
            className={'absolute z-[-1] right-0 bottom-0'}
          />
          <div
            ref={targetRef}
            id={'article'}
            className={'w-[90%] bg-white rounded-xl overflow-hidden pt-5'}>
            <div className={'px-5'}>
              {/*<div*/}
              {/*  onClick={() => {*/}
              {/*    router.back();*/}
              {/*  }}*/}
              {/*  className={'flex cursor-pointer items-center gap-0.5'}>*/}
              {/*  <img className={'w-1'} src={'/images/arrow_back.svg'} />*/}
              {/*  <p className={'text-[#099F96] text-sm'}>Назад</p>*/}
              {/*</div>*/}
              <div className={'flex mt-3 justify-between items-center'}>
                <img className={'w-[20rem]'} src={'/images/logo_black.png'} />
                <div className={'flex items-center gap-2'}>
                  {!isExport && (
                    <div
                      onClick={() => {
                        if (lang == 'ru') {
                          setLang('en');
                        } else {
                          setLang('ru');
                        }
                      }}
                      className={'flex items-center gap-1'}>
                      <p className={'text-sm font-bold'}>EN</p>
                      <div
                        className={
                          'flex relative cursor-pointer w-4 items-center'
                        }>
                        <div
                          className={
                            'absolute bg-black z-0 w-full rounded-full h-1.4 bg-opacity-10'
                          }></div>
                        <motion.div
                          variants={variants}
                          animate={lang == 'en' ? 'en' : 'ru'}
                          className={
                            'bg-cOrange h-2 w-2 absolute rounded-full'
                          }></motion.div>
                      </div>
                      <p className={'text-sm font-bold'}>RU</p>
                    </div>
                  )}
                  {!isExport && (
                    <OrangeButton
                      onClick={async () => {
                        setIsExport(true);
                        setTimeout(async () => {
                          await generatePDF(targetRef, {
                            filename: `${lang == 'en' ? article?.title : article?.title_translation_human}.pdf`,
                          });
                          setIsExport(false);
                        }, 2000);
                      }}
                      className={'text-xs py-1 rounded-[0.5rem]'}>
                      Скачать PDF
                    </OrangeButton>
                  )}
                </div>
              </div>
              <div
                className={
                  'mt-5 flex flex-col gap-1 justify-center items-center'
                }>
                <p
                  className={
                    'font-extrabold text-[#172C31] text-center text-md'
                  }>
                  {lang == 'en'
                    ? article.title
                    : article.title_translation_human}
                </p>
                <p className={'text-base'}>
                  {lang == 'en' ? 'by ' : 'ист: '}{' '}
                  <a
                    className={'underline font-bold text-[#099F96]'}
                    href={article.mainUrl}>
                    {article.source}
                  </a>
                </p>
              </div>
              <p className={'font-bold text-[#172C31] text-md mt-4'}>
                {lang == 'en' ? 'Summary:' : 'Краткое содержание:'}
              </p>
              <p
                className={
                  'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                }>
                {article.summary_human}
              </p>
              <p className={'font-bold text-[#172C31] text-md mt-4'}>
                {lang == 'en' ? 'Text:' : 'Текст:'}
              </p>
              <p
                className={
                  'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                }>
                {lang == 'en' ? article.content : article.translation_human}
              </p>
            </div>
            <div className={'mt-10'}>
              <Footer />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ArticlePage;
