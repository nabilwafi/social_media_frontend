import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const template = ({ children }: { children: React.ReactNode }) => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has('refreshToken');

  if (hasCookie) {
    redirect('/homepage');
  }

  return (
    <div className='flex items-center min-h-screen w-full justify-center'>
      {children}
    </div>
  );
};

export default template;
