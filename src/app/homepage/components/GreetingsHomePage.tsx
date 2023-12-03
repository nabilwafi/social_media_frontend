'use client';

import getUser from '@/actions/user.action';
import React from 'react';

const GreetingsHomePage = () => {
  const user = getUser();

  return (
    <h1 className='font-bold text-2xl'>
      Welcome Back, <span className='text-[#88BFE8]'>{user?.username}</span>
    </h1>
  );
};

export default GreetingsHomePage;
