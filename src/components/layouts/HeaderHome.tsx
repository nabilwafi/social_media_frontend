'use client';

import { useEffect } from 'react';
import getUser from '@/actions/user.action';
import LogoButton from '@/components/elements/LogoButton';
import MenuHeader from '@/components/fragments/MenuHeader';
import UserProfileHeader from '../elements/UserProfileHeader';

const HeaderHome = () => {
  const user = getUser();

  useEffect(() => {}, [user]);

  return (
    <header className='w-full py-5'>
      <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
        <LogoButton />

        {user ? (
          <UserProfileHeader
            user={user}
            isUserHasPhotoProfile={Boolean(user.photo_profile)}
          />
        ) : (
          <MenuHeader />
        )}
      </div>
    </header>
  );
};

export default HeaderHome;
