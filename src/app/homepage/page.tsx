'use client';

import { useEffect, useState } from 'react';
import GreetingsHomePage from './components/GreetingsHomePage';
import ListPostCard from './components/ListPostCard';
import PostForm from './components/PostForm';
import TitleHomePage from './components/TitleHomePage';
import { Post } from '@/interfaces/Post.interface';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'react-toastify';

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/v1/posts');

        setPosts(res.data.data);
      } catch (error: any) {
        toast.error(error);
      }
    };

    getData();
  });

  return (
    <div className='w-full min-h-screen max-w-screen-lg mx-auto py-20'>
      <div className='max-w-2xl mx-auto'>
        <GreetingsHomePage />
      </div>

      <div className='mt-5'>
        <PostForm />
      </div>

      <div className='mt-5'>
        <TitleHomePage title='Feeds' />
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5'>
        <ListPostCard posts={posts} />
      </div>
    </div>
  );
};

export default Page;
