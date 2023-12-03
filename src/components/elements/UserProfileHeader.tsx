'use client';

import React, { Fragment } from 'react';
import { User } from '@/interfaces/User.interface';
import { Menu, Transition } from '@headlessui/react';
import MenuProfile from './MenuProfile';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';

type UserProfileHeaderProps = {
  user: User;
  isUserHasPhotoProfile?: boolean;
};

const UserProfileHeader = (props: UserProfileHeaderProps) => {
  const router = useRouter();
  const { isUserHasPhotoProfile, user } = props;

  const handleLogout = async () => {
    try {
      await axiosInstance.delete('/auth/logout');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      toast.success('Successfully Logout!');
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast.error('Failed to log out, please try again!');
    }
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button>
        <UserProfile user={user} hasProfile={isUserHasPhotoProfile} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute -right-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
          <div className='px-1 py-1'>
            <MenuProfile
              menuHref='/homepage/profile'
              menuText='Profile'
              menuIcon={<AiOutlineUser />}
            />
          </div>
          <div className='px-1 py-1'>
            <MenuProfile
              onClick={handleLogout}
              menuText='Logout'
              menuIcon={<AiOutlineLogout />}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserProfileHeader;
