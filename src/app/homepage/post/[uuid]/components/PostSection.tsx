import { Post } from '@/interfaces/Post.interface';
import { User } from '@/interfaces/User.interface';
import Image from 'next/image';

const PostSection = ({ post, user }: { post: Post; user: User }) => {
  return (
    <div>
      <div className='flex items-center gap-5'>
        <Image
          width={500}
          height={500}
          className='w-20 h-20 rounded-full'
          style={{ width: 'auto' }}
          alt={user.username}
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/uploads/${user.photo_profile}`}
        />

        <h3 className='font-bold text-xl'>{user.username}</h3>
      </div>

      <div className='mt-8'>
        <h3 className='font-bold text-lg'>{post.title}</h3>
        <p className='mt-5'>{post.description}</p>
      </div>
    </div>
  );
};

export default PostSection;
