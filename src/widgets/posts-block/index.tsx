'use client';
import { FC, useEffect, useState } from 'react';
import GridPicker from '@/src/shared/ui/grid-picker';
import { cva, VariantProps } from 'class-variance-authority';
import Post from '@/src/entities/post';
import clsx from 'clsx';
import { PostType } from '@/src/app/new/page';
import { getProfile } from '@/src/shared/api/get-profile';
import { savePost } from '@/src/shared/api/save-post';

interface postsBlockInterface {
  posts: PostType[];
  locale?: string;
  displayTitle?: boolean;
  displaySaveBtn?: boolean;
  category: string;
  mutateCategory: (category: string) => any;
}

const PostsBlock: FC<postsBlockInterface> = ({
  posts,
  displayTitle,
  displaySaveBtn,
  locale,
  mutateCategory,
  category,
}) => {
  const [gridDisplayMode, setGridDisplayMode] =
    useState<VariantProps<typeof cvaPostGrid>['mode']>('grid');

  const cvaPostGrid = cva(['grid mt-2 gap-2'], {
    variants: {
      mode: {
        grid: 'grid-cols-1 md:grid-cols-2',
        row: 'grid-cols-1',
      },
    },
  });

  const [savedPosts, setSavedPosts] = useState<typeof posts>([]);

  const fetchSaved = async () => {
    const user = await getProfile();
    if (user.saved) {
      setSavedPosts(user.saved);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const savePostCallback = async (post: (typeof posts)[0]) => {
    const saved = await savePost(post);
    fetchSaved();
    console.log(saved);
  };
  //
  // const deletePost = (post: (typeof posts)[0]) => {
  //   const temp = [...savedPosts];
  //   const index = temp.findIndex((item) => item.id == post.id);
  //   if (index != -1) {
  //     temp.splice(index, 1);
  //   }
  //   const jsonStr = JSON.stringify(temp);
  //   localStorage.setItem('savedPosts', jsonStr);
  //   setSavedPosts([...temp]);
  // };

  // const [viewedPosts, setViewedPosts] = useState<typeof posts>([]);
  //
  // useEffect(() => {
  //   const savedPostsString = localStorage.getItem('viewedPosts');
  //   if (savedPostsString) {
  //     const temp = JSON.parse(savedPostsString);
  //     setViewedPosts(temp);
  //   }
  // }, []);
  //
  // const viewPost = (post: (typeof posts)[0]) => {
  //   if (viewedPosts.findIndex((item) => item.id == post.id) == -1) {
  //     const temp = [...viewedPosts, post];
  //     const jsonStr = JSON.stringify(temp);
  //     localStorage.setItem('viewedPosts', jsonStr);
  //     setViewedPosts([...viewedPosts, post]);
  //   }
  // };

  const [type, setType] = useState(
    category == 'news'
      ? 'Новости/статьи'
      : 'Детская дерматология/Дерматовенерология'
  );

  return (
    <div className={'mt-2 pb-10'}>
      <div className={'flex justify-end gap-1 md:gap-4'}>
        {/*<SelectInput*/}
        {/*  className={'w-1/3'}*/}
        {/*  mutateFunc={setCategory}*/}
        {/*  value={category}*/}
        {/*  options={*/}
        {/*    locale == 'en'*/}
        {/*      ? ['Dermatology', 'Pediatric', 'Venereology']*/}
        {/*      : ['Дерматология', 'Педиатрия', 'Дермато-венерология']*/}
        {/*  }*/}
        {/*/>*/}
        {/*<SearchInput*/}
        {/*  className={'w-2/3 md:w-full'}*/}
        {/*  mutateFunc={setSearchString}*/}
        {/*  value={searchString}*/}
        {/*  placeholder={locale == 'en' ? 'Search...' : 'Поиск...'}*/}
        {/*/>*/}
        <GridPicker
          className={'hidden md:flex'}
          mutateFunc={setGridDisplayMode}
          gridArg={'grid'}
          rowArg={'row'}
        />
      </div>
      {displayTitle && (
        <div className={'flex my-4 items-center gap-3'}>
          <p
            id={'type_articles'}
            onClick={() => {
              setType('Новости/статьи');
              mutateCategory('news');
            }}
            className={clsx(
              'text-white cursor-pointer md:text-left text-center md:pl-2 font-bold',
              type == 'Новости/статьи' ? 'opacity-100 underline' : 'opacity-50'
            )}>
            Новости/статьи
          </p>
          <p
            id={'type_news'}
            onClick={() => {
              setType('Детская дерматология/Дерматовенерология');
              mutateCategory('derma');
            }}
            className={clsx(
              'text-white cursor-pointer md:text-left text-center md:pl-4 font-bold',
              type == 'Детская дерматология/Дерматовенерология'
                ? 'opacity-100 underline'
                : 'opacity-50'
            )}>
            Детская дерматология/Дерматовенерология
          </p>
        </div>
      )}
      <div className={cvaPostGrid({ mode: gridDisplayMode })}>
        {posts.map((post, counter) => (
          <Post
            locale={locale}
            key={counter}
            viewFunc={() => {
              // viewPost(post);
            }}
            saveFunc={() => {
              savePostCallback(post);
            }}
            deleteFunc={() => {
              // deletePost(post);
            }}
            mode={gridDisplayMode}
            displayView={'top'}
            displaySaveBtn={!displaySaveBtn}
            isViewed={
              // Boolean(viewedPosts.find((item) => item.id == post.id)) ?? false
              false
            }
            isSaved={
              Boolean(
                savedPosts.find((item) => item.articleUrl == post.articleUrl)
              ) ?? false
              // false
            }
            {...post}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsBlock;
