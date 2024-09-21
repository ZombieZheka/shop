// ui/nav-links.tsx

'use client';

import clsx from 'clsx';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { IconButton } from "@/app/ui/icon-button";
import {
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'New', href: '/new' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [isOpen, setState] = useState(false);

  const switchState = () => {
    setState(!isOpen);
  }

  return (
    // <div className='bg-gray-200 w-full block md:inline-flex'>
    <div className='block md:inline-flex'>
      <IconButton
        icon={<Bars3BottomLeftIcon className='w-6'/>}
        className='text-gray-500 hover:text-gray-400'
        onClick={switchState}
      />
      <div className='absolute inline-block md:static md:flex'>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex md:px-5 text-gray-500',
              {
                'font-medium hover:text-gray-400': pathname !== link.href,
                'font-bold': pathname === link.href,
                'hidden md:flex': !isOpen,
              },
            )}
          >
            <span className="block">
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
