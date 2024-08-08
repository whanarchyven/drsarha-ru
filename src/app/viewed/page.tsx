'use client';
import SavedIcon from '@/public/icons/view_filled.svg';
import { useEffect, useState } from 'react';
import PostsBlock from '@/src/widgets/posts-block';
import { PostType } from '@/src/app/new/page';
import { getProfile } from '@/src/shared/api/get-profile';
import { checkAuth } from '@/src/shared/utils/check-auth';

export default function Home() {
  const [savedPosts, setSavedPosts] = useState<PostType[]>([]);

  const fetchSaved = async () => {
    setIsLoading(true);
    const user = await getProfile();
    if (user.viewed) {
      setSavedPosts(user.viewed);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
    fetchSaved();
  }, []);

  const [category, setCategory] = useState('news');
  const [subcategory, setSubCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <main>
        <div className={'flex items-center p-3 gap-3'}>
          <SavedIcon className={'w-4'} />
          <p className={'md:text-xl text-white font-bold'}>
            Прочитанные статьи
          </p>
        </div>
        <PostsBlock
          isLoading={isLoading}
          hideFilter
          search={search}
          page={page}
          setPage={setPage}
          setSearch={setSearch}
          subCategory={subcategory}
          mutateSubCategory={setSubCategory}
          category={category}
          mutateCategory={setCategory}
          displaySaveBtn={false}
          posts={savedPosts}
        />
      </main>
    </>
  );
}
