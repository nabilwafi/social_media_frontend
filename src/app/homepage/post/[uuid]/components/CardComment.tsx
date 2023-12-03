import UserProfile from '@/components/elements/UserProfile';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import React from 'react';
import { User } from '@/interfaces/User.interface';
import { Comment } from '@/interfaces/Comment.interface';

type CardCommentProps = {
  comment: Comment;
  user: User;
  isSameUser: boolean;
  openModal?: () => void;
  onDelete?: () => void;
};

const CardComment = (props: CardCommentProps) => {
  const { comment, isSameUser, onDelete, openModal, user } = props;

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

      <p>{comment.description}</p>
    </div>
  );
};

export default CardComment;
