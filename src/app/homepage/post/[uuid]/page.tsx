'use client';

import { Post } from '@/interfaces/Post.interface';
import axiosInstance from '@/services/axiosInstance';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PostSection from './components/PostSection';
import CardComment from './components/CardComment';
import CommentForm from './components/CommentForm';
import getUser from '@/actions/user.action';
import ModalOverlay from '@/components/elements/ModalOverlay';
import EditCommentForm from './components/EditCommentForm';
import { Comment } from '@/interfaces/Comment.interface';

const Page = ({ params }: { params: { uuid: string } }) => {
  const user = getUser();
  const [post, setPost] = useState<Post>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<Comment>();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (comment: Comment) => {
    setIsOpen(true);
    setSelectedComment(comment);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/v1/posts/${params.uuid}`);

        setPost(res.data.data);
      } catch (error: any) {
        toast.error(error);
      }
    };

    getData();
  });

  const handleDelete = async (postId: number, commentUuid: string) => {
    try {
      await axiosInstance.delete(`/v1/posts/${postId}/comments/${commentUuid}`);

      toast.success('Successfully Deleted Post');
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className='max-w-screen-md mx-auto'>
      <div className='mt-10'>
        {post && <PostSection post={post} user={post.user!} />}
      </div>

      <div className='mt-8'>
        {post && <CommentForm postId={post.id!} userId={user?.id!} />}
      </div>

      <div className='mt-8'>
        {post && post.comments.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-5'>
              {post.comments.map((comment) => (
                <CardComment
                  key={comment.uuid}
                  comment={comment}
                  user={post.user!}
                  isSameUser={post.userId! === comment.userId}
                  openModal={() => openModal(comment)}
                  onDelete={() => handleDelete(comment.postId!, comment.uuid)}
                />
              ))}
            </div>
            {selectedComment && (
              <ModalOverlay isOpen={isOpen} closeModal={closeModal}>
                <EditCommentForm
                  comment={selectedComment!}
                  postId={selectedComment?.postId!}
                  user={user!}
                  setIsOpenOverlay={setIsOpen}
                />
              </ModalOverlay>
            )}
          </>
        ) : (
          <div className='text-center'>Comment not found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
