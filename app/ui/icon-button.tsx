// ui/icon-button.tsx

import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon: React.ReactNode;
  text?: string;
}

export function IconButton({ children, icon, text, className, ...rest }: ButtonProps) {
  return (
    <div>
      <button
        {...rest}
        className={clsx(
          'flex space-x-1',
          className,
        )}
      >
        {icon}
        {text && <span className='hidden md:block'>{text}</span>}
      </button>
      {children}
    </div>
  );
}
