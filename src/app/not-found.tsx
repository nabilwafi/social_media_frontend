import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const NotFound = () => {
  return (
    <div className='w-full h-full min-h-screen flex items-center justify-center'>
      <div className='text-center text-white'>
        <h1 className='uppercase text-3xl font-bold'>Page Not Found</h1>
        <Link href='/' className='underline text-blue-500 hover:text-blue-600'>
          <span className='flex items-center justify-center gap-2'>
            <AiOutlineArrowLeft />
            Back to home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
