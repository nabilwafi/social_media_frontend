import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logo.svg';

const LogoButton = () => {
  return (
    <Link href='/' className='flex items-center gap-5'>
      <Image
        src={Logo}
        alt='Logo'
        width={500}
        height={500}
        className='w-10 h-10'
        style={{ width: 'auto' }}
      />
      <h3 className='font-bold text-2xl'>MedSOS</h3>
    </Link>
  );
};

export default LogoButton;
