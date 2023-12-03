'use client';

import React from 'react';
import { Menu } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuProfileProps = {
  menuText: string;
  menuIcon: JSX.Element;
  menuHref?: string;
  onClick?: () => void;
};

const MenuProfile = (props: MenuProfileProps) => {
  const pathname = usePathname();
  const { menuText, menuIcon, menuHref, onClick } = props;

  return (
    <Menu.Item>
      {({ active }) =>
        menuHref ? (
          <Link
            href={menuHref}
            className={`${
              pathname === menuHref || active
                ? 'bg-blue-300 text-white'
                : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {menuIcon}
            {menuText}
          </Link>
        ) : (
          <button
            onClick={onClick}
            className={`${
              pathname === menuHref || active
                ? 'bg-blue-300 text-white'
                : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {menuIcon}
            {menuText}
          </button>
        )
      }
    </Menu.Item>
  );
};

export default MenuProfile;
