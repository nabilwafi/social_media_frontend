import LinkHeader from '@/components/elements/LinkHeader';

const MenuHeader = () => {
  return (
    <ul className='flex items-center gap-5 text-white'>
      <li>
        <LinkHeader href='/auth/signin' label='Login' />
      </li>
      <li>
        <LinkHeader href='/auth/signup' label='Register' />
      </li>
    </ul>
  );
};

export default MenuHeader;
