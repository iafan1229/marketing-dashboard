"use client";

interface UserProfileProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut?: () => void;
}

export function UserProfile({ user, onSignOut }: UserProfileProps) {
  return (
    <div className='flex items-center space-x-3'>
      {user.image ? (
        <img
          src={user.image}
          alt={user.name || "User"}
          className='w-8 h-8 rounded-full'
        />
      ) : (
        <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
          <span className='text-sm font-medium text-white'>
            {user.name?.charAt(0) || "U"}
          </span>
        </div>
      )}
      <div className='hidden sm:block'>
        <p className='text-sm font-medium text-gray-900'>{user.name}</p>
        <p className='text-xs text-gray-500'>{user.email}</p>
      </div>
      {onSignOut && (
        <button
          onClick={onSignOut}
          className='text-sm text-gray-500 hover:text-gray-700'
        >
          로그아웃
        </button>
      )}
    </div>
  );
}
