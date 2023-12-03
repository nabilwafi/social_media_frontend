import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { User } from '@/interfaces/User.interface';

type UserProfile = {
  user: User;
  hasProfile?: boolean;
} & AvatarProps;

const UserProfile = (props: UserProfile) => {
  const { user, hasProfile, ...otherProps } = props;

  return (
    user && (
      <div className='flex items-center gap-3'>
        {hasProfile ? (
          <Avatar
            {...otherProps}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/uploads/${user.photo_profile}`}
          />
        ) : (
          <Avatar {...otherProps}>{user.name.slice(0, 1)}</Avatar>
        )}
        <span>{user.name}</span>
      </div>
    )
  );
};

export default UserProfile;
