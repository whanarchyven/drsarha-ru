'use client';
import { useRef } from 'react';
import generatePDF, { Margin } from 'react-to-pdf';
import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { getArticle } from '@/src/shared/api/get-article';

import Footer from '@/src/widgets/footer';
import { viewPost } from '@/src/shared/api/view-post';
import OrangeButton from '@/src/shared/ui/orange-button';
import { getProfile } from '@/src/shared/api/get-profile';
import { PostType } from '@/src/app/new/page';
import Markdown from 'react-markdown';
import { useRouter } from 'next/navigation';

export interface ArticleInterface {
  articleUrl: string;
  content: string;
  createdAt: string;
  mainUrl: string;
  publishedDate: string;
  title: string;
  updatedAt: string;
  summary_ai: string;
  summary_human: string;
  translation_ai: string;
  translation_human: string;
  title_translation_ai: string;
  title_translation_human: string;
  source: string;
  mutateFunc: () => any;
  isPublished?: string;
  category: string;
  subcategory: string;
  pdf_text?: string;
  pdf_text_summary_human?: string;
  pdf_text_translation_human?: string;
  references?: string[];
}

const ArticlePage = () => {
  const params = useSearchParams();

  const articleUrl = params.get('url');

  const [lang] = useState('ru');

  const [article, setArticle] = useState<ArticleInterface | null>(null);

  const fetchArticle = async () => {
    if (articleUrl) {
      const data = await getArticle(articleUrl);
      const user = await getProfile();
      console.log(user);
      if (
        !user?.viewed?.find(
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

  const targetRef = useRef<HTMLDivElement>(null);
  const [isExport, setIsExport] = useState(false);
  const router = useRouter();

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
          <div className={'w-[90%] bg-white rounded-xl overflow-hidden pt-5'}>
            <div ref={targetRef} id={'article'} className={'px-10'}>
              {!isExport && (
                <div
                  onClick={() => {
                    router.back();
                  }}
                  className={'flex cursor-pointer items-center gap-0.5'}>
                  <img className={'w-1'} src={'/images/arrow_back.svg'} />
                  <p className={'text-[#099F96] text-sm'}>Назад</p>
                </div>
              )}
              <div className={'flex mt-3 justify-between items-center'}>
                <img className={'w-[20rem]'} src={'/images/logo_black.png'} />
                <div className={'flex items-center gap-2'}>
                  {/*{!isExport && (*/}
                  {/*  <div*/}
                  {/*    onClick={() => {*/}
                  {/*      if (lang == 'ru') {*/}
                  {/*        setLang('en');*/}
                  {/*      } else {*/}
                  {/*        setLang('ru');*/}
                  {/*      }*/}
                  {/*    }}*/}
                  {/*    className={'flex items-center gap-1'}>*/}
                  {/*    <p className={'text-sm font-bold'}>EN</p>*/}
                  {/*    <div*/}
                  {/*      className={*/}
                  {/*        'flex relative cursor-pointer w-4 items-center'*/}
                  {/*      }>*/}
                  {/*      <div*/}
                  {/*        className={*/}
                  {/*          'absolute bg-black z-0 w-full rounded-full h-1.4 bg-opacity-10'*/}
                  {/*        }></div>*/}
                  {/*      <motion.div*/}
                  {/*        variants={variants}*/}
                  {/*        animate={lang == 'en' ? 'en' : 'ru'}*/}
                  {/*        className={*/}
                  {/*          'bg-cOrange h-2 w-2 absolute rounded-full'*/}
                  {/*        }></motion.div>*/}
                  {/*    </div>*/}
                  {/*    <p className={'text-sm font-bold'}>RU</p>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                  {!isExport && (
                    <OrangeButton
                      onClick={async () => {
                        setIsExport(true);
                        setTimeout(async () => {
                          await generatePDF(targetRef, {
                            filename: `${lang == 'en' ? article?.title : article?.title_translation_human}.pdf`,
                            page: { margin: Margin.MEDIUM },
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
                  {lang == 'en' ? 'by ' : 'источник:  '}{' '}
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
              <Markdown
                className={
                  'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                }>
                {article.summary_human}
              </Markdown>
              <p className={'font-bold text-[#172C31] text-md mt-4'}>
                {lang == 'en' ? 'Text:' : 'Текст:'}
              </p>
              <Markdown
                className={
                  'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                }>
                {lang == 'en' ? article.content : article.translation_human}
              </Markdown>
              {article.pdf_text_translation_human && (
                <>
                  <p className={'font-bold text-[#172C31] text-md mt-4'}>
                    Перевод прикреплённой PDF статьи
                  </p>
                  <Markdown
                    className={
                      'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                    }>
                    {article.pdf_text_translation_human}
                  </Markdown>
                </>
              )}

              {article.pdf_text_summary_human && (
                <>
                  <p className={'font-bold text-[#172C31] text-md mt-4'}>
                    Краткое содержание прикреплённой PDF статьи
                  </p>
                  <Markdown
                    className={
                      'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'
                    }>
                    {article.pdf_text_summary_human}
                  </Markdown>
                </>
              )}

              {article.references && (
                <>
                  <p className={'font-bold text-[#172C31] text-md mt-4'}>
                    Список литературы
                  </p>
                  {/*<Markdown className={*/}
                  {/*  'text-justify text-[#172C31] whitespace-pre-wrap text-sm mt-1'*/}
                  {/*}>*/}
                  {/*</Markdown>*/}
                  {article.references.map((ref, counter) => {
                    return (
                      <p
                        className={
                          'text-justify text-[#172C31] w-full text-sm mt-2'
                        }
                        key={counter}>
                        {counter + 1}. {ref + ' \n'}
                      </p>
                    );
                  })}
                </>
              )}

              <p
                className={
                  'text-justify text-cOrange font-bold italic whitespace-pre-wrap text-sm mt-3'
                }>
                Эта статья была создана с использованием нескольких инструментов
                для редактирования, включая обработку текста с помощью ИИ. Перед
                публикацией содержание было проверено специалистом.
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
