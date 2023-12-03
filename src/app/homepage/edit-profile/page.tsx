'use client';

import ChangePasswordForm from './components/ChangePasswordForm';
import ProfileForm from './components/ProfileForm';
import TitleComponent from './components/TitleComponent';

const Page = () => {
  return (
    <div className='mt-10'>
      <div className='mb-10'>
        <TitleComponent title='User Settings' />
        <ProfileForm />
      </div>

      <div className='mb-10'>
        <TitleComponent title='Privacy Settings' />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Page;
