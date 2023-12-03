'use client';

import Card from '@/components/elements/PostCard';
import ModalOverlay from '@/components/elements/ModalOverlay';
import { useState } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { Post } from '@/interfaces/Post.interface';
import getUser from '@/actions/user.action';
import { toast } from 'react-toastify';
import EditPostForm from './EditPostForm';
import { User } from '@/interfaces/User.interface';

const ListPostCard = ({ posts, user }: { posts: Post[]; user?: User }) => {
  const auth = getUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post>();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (post: Post) => {
    setIsOpen(true);
    setSelectedPost(post);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/v1/posts/${id}`);

      toast.success('Successfully Deleted Post');
    } catch (error: any) {
      toast.error(error);
    }
  };

  return posts.length > 0 ? (
    <>
      {posts.map((post) => (
        <div key={post.uuid}>
          <Card
            href={`/homepage/post/${post.uuid}`}
            post={post}
            user={user ? user : post.user!}
            isSameUser={auth?.id === post.userId}
            openModal={() => openModal(post)}
            onDelete={() => handleDelete(post.uuid)}
          />
        </div>
      ))}
      <ModalOverlay isOpen={isOpen} closeModal={closeModal}>
        <EditPostForm
          setIsOpenOverlay={setIsOpen}
          postID={selectedPost?.uuid!}
          user={user!}
        />
      </ModalOverlay>
    </>
  ) : (
    <div className='text-center text-lg'>post not found</div>
  );
};

export default ListPostCard;
