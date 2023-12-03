'use client';

import { useEffect, useState } from 'react';
import ProfileSection from './components/ProfileSection';
import { User } from '@/interfaces/User.interface';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import ListPostCard from '../components/ListPostCard';
import getUser from '@/actions/user.action';

const Page = () => {
  const auth = getUser();
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile');

        setProfile(res.data.data);
      } catch (error: any) {
        toast.error(error);
      }
    };

    getData();
  });

  return (
    <div className='max-w-screen-md mx-auto'>
      <div className='mt-20'>
        <div className='mb-8'>
          {profile && <ProfileSection user={profile} />}
        </div>

        <div className='grid grid-cols-1 gap-5'>
          {profile && <ListPostCard posts={profile.posts} user={auth!} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
