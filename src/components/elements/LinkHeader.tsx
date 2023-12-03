import Link from 'next/link';
import React from 'react';

type LinkHeaderProps = {
  isActive?: boolean;
  className?: string;
  href: string;
  label: string | JSX.Element;
  onClick?: () => void;
};

const LinkHeader = (props: LinkHeaderProps) => {
  const { className, isActive, href, label, onClick } = props;

  return (
    <Link
      href={href}
      className={`hover:text-gray-200 ${
        isActive ? 'text-gray-200' : ''
      } ${className}`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default LinkHeader;
