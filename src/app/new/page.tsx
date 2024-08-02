'use client';
import MainBlock from '@/src/widgets/main-block';
import PostsBlock from '@/src/widgets/posts-block';
import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import { getArticles } from '@/src/shared/api/get-articles';
import { checkAuth } from '@/src/shared/utils/check-auth';

const postsMock = [
  {
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
  },
];

export type PostType = (typeof postsMock)[0];
export default function Home() {
  const [posts, setPosts] = useState<PostType[]>(postsMock);

  const fetchPosts = async (
    category: string,
    subcategory: string,
    search: string,
    page: number
  ) => {
    const data: any = await getArticles(
      category ?? '',
      subcategory ?? '',
      search ?? '',
      page ?? 0
    );
    setPosts(data);
  };

  const [category, setCategory] = useState('news');
  const [subcategory, setSubCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    checkAuth();
    fetchPosts(category, subcategory, search, page);
  }, [category, subcategory, search, page]);

  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep] = useState(0);

  const steps = [
    {
      element: '#new',
      intro:
        'В данном разделе вы можете ознакомиться с научными статьями и публикациями',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#saved',
      intro:
        'В данном разделе вы можете просмотреть ваши сохраненные материалы',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#viewed',
      intro:
        'В данном разделе вы можете просмотреть материалы, которые вы уже прочитали',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#profile',
      intro:
        'Ваш личный кабинет, где вы можете обновить персональные данные, продлить подписки или проверить их актуальность',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#type_articles',
      intro:
        'Нажимайте, чтобы изучить все международные статьи и публикации, использовать материалы для научных исследований и находить ссылки на первоисточники',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#type_news',
      intro:
        'Нажимайте, чтобы быть в курсе всех актуальных мировых новостей ежедневно',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#post_read0',
      intro: 'Нажимайте, чтобы открыть полный текст научной статьи',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#post_save0',
      intro: 'Нажимайте, чтобы сохранить статью и легко вернуться к ней позже',
      position: 'right',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
    {
      element: '#dr_sara',
      intro:
        'Нажимайте и задавайте вопросы – ваш персональный AI-помощник, навигатор по научным материалам, поможет быстро найти ответы и подготовить краткую аннотацию по вашему запросу',
      position: 'left',
      tooltipClass:
        '!bg-white !bg-opacity-10 !backdrop-blur-xl !text-white !text-sm',
      highlightClass: '!border-white',
    },
  ];

  const startTour = () => {
    setStepsEnabled(true);
  };

  const onExit = () => {
    setStepsEnabled(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('education_passed')) {
      startTour();
      localStorage.setItem('education_passed', 'true');
    }
  }, []);

  return (
    <>
      <main>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={onExit}
          options={{
            nextLabel: 'Дальше',
            overlayOpacity: 0.5,
            prevLabel: 'Назад',
            doneLabel: 'Завершить',
            scrollToElement: true,
          }}
        />
        <MainBlock />
        <PostsBlock
          search={search}
          page={page}
          setPage={setPage}
          setSearch={setSearch}
          subCategory={subcategory}
          mutateSubCategory={setSubCategory}
          category={category}
          mutateCategory={setCategory}
          displayTitle={true}
          posts={posts}
        />
      </main>
    </>
  );
}
