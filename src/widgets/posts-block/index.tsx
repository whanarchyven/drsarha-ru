'use client';
import { FC, useEffect, useState } from 'react';
import GridPicker from '@/src/shared/ui/grid-picker';
import SearchInput from '@/src/shared/ui/search-input';
import SelectInput from '@/src/shared/ui/select-input';
import { cva, VariantProps } from 'class-variance-authority';
import Post from '@/src/entities/post';

interface postsBlockInterface {
  posts: {
    id: string;
    title: string;
    description: string;
    source: string;
    file: string;
  }[];
  locale?:string
  displayTitle?: boolean;
  displaySaveBtn?: boolean;
}

const PostsBlock: FC<postsBlockInterface> = ({
  posts,
  displayTitle,
  displaySaveBtn, locale
}) => {
  const [searchString, setSearchString] = useState('');
  const [category, setCategory] = useState('Категория');
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

  useEffect(() => {
    const savedPostsString = localStorage.getItem('savedPosts');
    if (savedPostsString) {
      const temp = JSON.parse(savedPostsString);
      setSavedPosts(temp);
    }
  }, []);

  const savePost = (post: (typeof posts)[0]) => {
    const temp = [...savedPosts, post];
    const jsonStr = JSON.stringify(temp);
    localStorage.setItem('savedPosts', jsonStr);
    setSavedPosts([...savedPosts, post]);
  };

  const deletePost = (post: (typeof posts)[0]) => {
    const temp = [...savedPosts];
    const index = temp.findIndex((item) => item.id == post.id);
    if (index != -1) {
      temp.splice(index, 1);
    }
    const jsonStr = JSON.stringify(temp);
    localStorage.setItem('savedPosts', jsonStr);
    setSavedPosts([...temp]);
  };

  const [viewedPosts, setViewedPosts] = useState<typeof posts>([]);

  useEffect(() => {
    const savedPostsString = localStorage.getItem('viewedPosts');
    if (savedPostsString) {
      const temp = JSON.parse(savedPostsString);
      setViewedPosts(temp);
    }
  }, []);

  const viewPost = (post: (typeof posts)[0]) => {
    if (viewedPosts.findIndex((item) => item.id == post.id) == -1) {
      const temp = [...viewedPosts, post];
      const jsonStr = JSON.stringify(temp);
      localStorage.setItem('viewedPosts', jsonStr);
      setViewedPosts([...viewedPosts, post]);
    }
  };

  return (
    <div className={'mt-2 pb-10'}>
      <div className={'flex justify-between gap-1 md:gap-4'}>
        <SelectInput
          className={'w-1/3'}
          mutateFunc={setCategory}
          value={category}
          options={locale=='en'?['Dermatology', 'Pediatric', 'Venereology']:['Дерматология', 'Педиатрия', 'Дермато-венерология']}
        />
        <SearchInput
          className={'w-2/3 md:w-full'}
          mutateFunc={setSearchString}
          value={searchString} placeholder={locale=='en'?'Search...':'Поиск...'}
        />
        <GridPicker
          className={'hidden md:flex'}
          mutateFunc={setGridDisplayMode}
          gridArg={'grid'}
          rowArg={'row'}
        />
      </div>
      {displayTitle && (
        <p
          className={
            'my-4 text-white md:text-left text-center md:pl-4 font-bold'
          }>{locale=='en'?'New articles':'Новые статьи'}</p>
      )}
      <div className={cvaPostGrid({ mode: gridDisplayMode })}>
        {posts.map((post, counter) => (
          <Post locale={locale}
            key={counter}
            viewFunc={() => {
              viewPost(post);
            }}
            saveFunc={() => {
              savePost(post);
            }}
            deleteFunc={() => {
              deletePost(post);
            }}
            mode={gridDisplayMode}
            displayView={'top'}
            displaySaveBtn={!displaySaveBtn}
            isViewed={
              Boolean(viewedPosts.find((item) => item.id == post.id)) ?? false
            }
            isSaved={
              Boolean(savedPosts.find((item) => item.id == post.id)) ?? false
            }
            {...post}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsBlock;
