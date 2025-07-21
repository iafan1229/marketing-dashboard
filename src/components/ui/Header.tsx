import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  logo,
  actions,
  user,
  className = "",
}) => {
  const LogoIcon = () => (
    <svg className='w-8 h-8' viewBox='0 0 32 32' fill='none'>
      <rect width='32' height='32' rx='8' fill='url(#logoGradient)' />
      <path d='M8 12h16v8H8z' fill='white' fillOpacity='0.2' />
      <path
        d='M12 16l4-4 4 4'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient id='logoGradient' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stopColor='#7fdccb' />
          <stop offset='100%' stopColor='#bb54a8' />
        </linearGradient>
      </defs>
    </svg>
  );

  const SearchIcon = () => (
    <svg
      className='w-5 h-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      />
    </svg>
  );

  const BellIcon = () => (
    <svg
      className='w-5 h-5'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
      />
    </svg>
  );

  const UserAvatar = ({
    user,
  }: {
    user: { name: string; avatar?: string };
  }) => (
    <div className='flex items-center space-x-3'>
      <button className='p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
        <SearchIcon />
      </button>
      <button className='p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative'>
        <BellIcon />
        <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
      </button>
      <div className='flex items-center space-x-2 pl-3 border-l border-gray-200'>
        <div className='w-8 h-8 bg-gradient-to-r from-brand-mint to-brand-purple rounded-full flex items-center justify-center text-white text-sm font-medium'>
          {user.avatar || user.name.charAt(0).toUpperCase()}
        </div>
        <span className='text-sm font-medium text-gray-700 hidden sm:block'>
          {user.name}
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}
    >
      <div className='flex items-center justify-between'>
        {/* Left side - Logo and Title */}
        <div className='flex items-center space-x-4'>
          {logo || <LogoIcon />}
          <div>
            <h1 className='text-xl font-semibold text-gray-900'>{title}</h1>
            {subtitle && (
              <p className='text-sm text-gray-500 mt-0.5'>{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className='flex items-center space-x-4'>
          {actions}
          {user && <UserAvatar user={user} />}
        </div>
      </div>
    </header>
  );
};
