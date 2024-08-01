'use client';
import SavedIcon from '@/public/icons/save_filled.svg';
import { useEffect, useState } from 'react';
import PostsBlock from '@/src/widgets/posts-block';
import { getProfile } from '@/src/shared/api/get-profile';
import { PostType } from '@/src/app/new/page';

export default function Home() {
  const [savedPosts, setSavedPosts] = useState<PostType[]>([]);

  const fetchSaved = async () => {
    const user = await getProfile();
    if (user.saved) {
      setSavedPosts(user.saved);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const [category, setCategory] = useState('news');

  return (
    <>
      <main>
        <div className={'flex items-center p-3 gap-3'}>
          <SavedIcon className={'w-4'} />
          <p className={'md:text-xl text-white font-bold'}>
            Мои сохранённые статьи
          </p>
        </div>
        <PostsBlock
          category={category}
          mutateCategory={setCategory}
          displaySaveBtn={true}
          posts={savedPosts}
        />
      </main>
    </>
  );
}
