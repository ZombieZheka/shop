// ui/dropdown-menu.tsx

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

interface DropdownMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
//   links: Array<
//     { name: string, href: string, icon: ReactNode }
//   >;
  icon: React.ReactNode;
  className?: string;
  // isOpen: boolean;
}

export function DropdownMenu({
  children, icon, className, ...rest
}: DropdownMenuProps) {
  const [isOpen, setState] = useState(false);

  const onEnter = () => {
    setState(true);
  }
  const onLeave = () => {
    setState(false);
  }

  return (
    <div
      className='relative flex'
      onMouseLeave={onLeave}
    >
      <button
        // {...rest}
        className={clsx(
          'flex space-x-1',
          'text-gray-500 hover:text-gray-400',
          className,
        )}
        onMouseEnter={onEnter}
      >
        {icon}
      </button>
      <div className={clsx(
        'absolute inline-block pt-[calc(100%+10px)] right-0',
        'w-max box-border',
        {
          hidden: !isOpen
        }
      )}>
        {children}
      </div>
    </div>
  );
}
