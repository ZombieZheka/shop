// ui/sidenav.tsx

'use client';

import clsx from 'clsx';
import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { DropdownMenu } from "./dropdown-menu";
import { IconButton } from "@/app/ui/icon-button";

import {
  HeartIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

export default function NavPanel() {
  const session = useSession();
  const UserMenu = session.status === 'authenticated'
    ? authentificatedMenu
    : unAuthentificatedMenu;

  return (
    <div className="relative flex items-center justify-between w-full">
      <div className="flex flex-1">
        <NavLinks/>
      </div>
      <div className="flex justify-center flex-none w-6 mx-auto">
        <BuildingLibraryIcon className="w-6 text-gray-500 mx-auto"/>
      </div>
      <div className="flex flex-1 justify-end space-x-5">
        <IconButton
          icon={<HeartIcon className="w-6"/>}
          className='text-gray-500 hover:text-gray-400'
          onClick={undefined}
        />
        <IconButton
          icon={<ShoppingCartIcon className="w-6"/>}
          className='text-gray-500 hover:text-gray-400'
          onClick={undefined}
        />
        <UserMenu/>
      </div>
    </div>
  );
}

function unAuthentificatedMenu() {
  const links = [
    { name: 'Sign In', href: '/auth/signin' },
    { name: 'Sign Up', href: '/auth/signup' },
  ];

  return (
    <DropdownMenu
      icon={<UserCircleIcon className="w-6"/>}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'block justify-self-center px-2',
            'text-base text-gray-500 hover:text-gray-400',
            'border text-center',
          )}
        >
          <span className='p-2'>{link.name}</span>
        </Link>
      )
      )}
    </DropdownMenu>
  )
}

function authentificatedMenu() {
  const links = [
    { name: 'Profile', href: '/profile' },
    { name: 'Orders', href: '/orders' },
  ];

  return (
    <DropdownMenu
      icon={<UserCircleIcon className="w-6"/>}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'block justify-self-center px-2',
            'text-base text-gray-500 hover:text-gray-400',
            'border text-center',
          )}
        >
          <span className='p-2'>{link.name}</span>
        </Link>
      ))}
      <button
        className={clsx(
          'block justify-self-center px-2',
          'text-base text-gray-500 hover:text-gray-400',
          'border text-center',
        )}
        onClick={() => signOut()}
      >
          <span className='p-2'>Sign Out</span>
      </button>
    </DropdownMenu>
  )
}
