import CustomButton from '@/components/elements/CustomButton';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col gap-5'>
      <h1 className='text-center text-6xl font-bold'>lorem Ipsum</h1>
      <Link href='/auth/signup'>
        <CustomButton label='Get Started' />
      </Link>
    </div>
  );
}
