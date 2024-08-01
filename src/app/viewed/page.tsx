'use client';
import SavedIcon from '@/public/icons/view_filled.svg';
import { useEffect, useState } from 'react';
import PostsBlock from '@/src/widgets/posts-block';
import { PostType } from '@/src/app/new/page';
import { getProfile } from '@/src/shared/api/get-profile';

export default function Home() {
  const [savedPosts, setSavedPosts] = useState<PostType[]>([]);

  const fetchSaved = async () => {
    const user = await getProfile();
    if (user.viewed) {
      setSavedPosts(user.viewed);
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
            Прочитанные статьи
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
