import HeaderHome from '@/components/layouts/HeaderHome';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Template = ({ children }: { children: React.ReactNode }) => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has('refreshToken');

  if (!hasCookie) {
    redirect('/');
  }

  return (
    <div>
      <HeaderHome />
      <div className='py-10'>{children}</div>
    </div>
  );
};

export default Template;
