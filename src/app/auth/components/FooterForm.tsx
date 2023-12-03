import Link from 'next/link';

export type FooterFormProps = {
  text: string;
  linkText: string;
  hrefLink: string;
};

const FooterForm = (props: FooterFormProps) => {
  const { text, linkText, hrefLink } = props;

  return (
    <div className='mt-3 text-sm text-black'>
      <span>{text}</span>
      <Link href={hrefLink} className='ms-2 text-blue-500 hover:text-blue-700'>
        {linkText}
      </Link>
    </div>
  );
};

export default FooterForm;
