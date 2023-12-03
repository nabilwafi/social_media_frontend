'use client';

import React from 'react';
import Image from 'next/image';
import { User } from '@/interfaces/User.interface';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';

const ProfileSection = ({ user }: { user: User }) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <Image
            width={500}
            height={500}
            className='w-20 h-20 rounded-full'
            style={{ width: 'auto' }}
            alt={user.username}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/uploads/${user.photo_profile}`}
          />

          <h3 className='font-bold text-xl'>{user.username}</h3>
        </div>

        <Link
          href='/homepage/edit-profile'
          className='text-lg text-blue-500 hover:text-blue-700'
        >
          <AiOutlineEdit />
        </Link>
      </div>

      <p className='mt-5'>{user.bio}</p>
    </div>
  );
};

export default ProfileSection;
