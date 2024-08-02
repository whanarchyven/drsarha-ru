'use client';
import { FC, useEffect, useState } from 'react';
import GridPicker from '@/src/shared/ui/grid-picker';
import { cva, VariantProps } from 'class-variance-authority';
import Post from '@/src/entities/post';
import clsx from 'clsx';
import { PostType } from '@/src/app/new/page';
import { getProfile } from '@/src/shared/api/get-profile';
import { savePost } from '@/src/shared/api/save-post';
import SelectInput from '@/src/shared/ui/select-input';
import SearchInput from '@/src/shared/ui/search-input';

interface postsBlockInterface {
  posts: PostType[];
  locale?: string;
  displayTitle?: boolean;
  displaySaveBtn?: boolean;
  category: string;
  mutateCategory: (category: string) => any;
  subCategory: string;
  mutateSubCategory: (subcategory: string) => any;
  search: string;
  setSearch: (search: string) => any;
  page: number;
  setPage: (page: number) => any;
  hideFilter?: boolean;
}

const PostsBlock: FC<postsBlockInterface> = ({
  posts,
  displayTitle,
  displaySaveBtn,
  locale,
  mutateCategory,
  category,
  mutateSubCategory,
  search,
  setSearch,
  subCategory,
  hideFilter,
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

  const [type, setType] = useState(category == 'news' ? 'Новости' : 'Статьи');

  return (
    <div className={'mt-2 pb-10'}>
      <div className={'flex justify-end gap-1 md:gap-4'}>
        {!hideFilter && (
          <>
            <SelectInput
              className={'w-1/3'}
              mutateFunc={mutateSubCategory}
              value={subCategory}
              options={['Детская дерматология', 'Дерматовенерология']}
            />
            <SearchInput
              className={'w-2/3 md:w-full'}
              mutateFunc={setSearch}
              value={search}
              placeholder={locale == 'en' ? 'Search...' : 'Поиск...'}
            />
          </>
        )}
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
              setType('Новости');
              mutateCategory('news');
            }}
            className={clsx(
              'text-white cursor-pointer md:text-left text-center md:pl-2 font-bold',
              type == 'Новости' ? 'opacity-100 underline' : 'opacity-50'
            )}>
            Новости
          </p>
          <p
            id={'type_news'}
            onClick={() => {
              setType('Статьи');
              mutateCategory('articles');
            }}
            className={clsx(
              'text-white cursor-pointer md:text-left text-center md:pl-4 font-bold',
              type == 'Статьи' ? 'opacity-100 underline' : 'opacity-50'
            )}>
            Статьи
          </p>
        </div>
      )}
      <div className={cvaPostGrid({ mode: gridDisplayMode })}>
        {posts.map((post, counter) => (
          <Post
            id={String(counter)}
            locale={locale}
            key={String(counter)}
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
