import { Post } from '@/interfaces/Post.interface';
import React from 'react';
import Link from 'next/link';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import UserProfile from './UserProfile';
import { User } from '@/interfaces/User.interface';

type CardPostProps = {
  post: Post;
  user: User;
  isSameUser: boolean;
  href?: string;
  openModal?: () => void;
  onDelete?: () => void;
};

const Card = (props: CardPostProps) => {
  const { post, isSameUser, onDelete, href, openModal, user } = props;

  return (
    <div className='shadow-lg rounded-lg w-full p-5 text-white bg-[#1D2E4E]'>
      <p className='text-sm mb-3 flex justify-between items-center'>
        <UserProfile user={user} hasProfile={Boolean(user?.photo_profile)} />

        <span>
          {isSameUser ? (
            <div className='flex items-center gap-5'>
              <button type='button' onClick={openModal}>
                <span className='cursor-pointer text-blue-300'>
                  <FaPencilAlt />
                </span>
              </button>
              <button type='button' onClick={onDelete}>
                <span className='cursor-pointer text-red-500'>
                  <FaTrash />
                </span>
              </button>
            </div>
          ) : null}
        </span>
      </p>
      {href ? (
        <Link href={href}>
          <h1 className='font-bold text-lg'>{post.title}</h1>
        </Link>
      ) : (
        <h1 className='font-bold text-lg'>{post.title}</h1>
      )}
      <p>{post.description}</p>
    </div>
  );
};

export default Card;
