'use client';
import SavedIcon from '@/public/icons/save_filled.svg';
import { useEffect, useState } from 'react';
import PostsBlock from '@/src/widgets/posts-block';
export default function Home() {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const savedPostsString = localStorage.getItem('savedPosts');
    if (savedPostsString) {
      const temp = JSON.parse(savedPostsString);
      setSavedPosts(temp);
    }
  }, []);

  return (
    <>
      <main>
        <div className={'flex items-center p-3 gap-3'}>
          <SavedIcon className={'w-4'} />
          <p className={'md:text-xl text-white font-bold'}>My saved Posts</p>
        </div>
        <PostsBlock locale={'en'} displaySaveBtn={true} posts={savedPosts} />
      </main>
    </>
  );
}
