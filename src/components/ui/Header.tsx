"use client";

import { useSession, signOut } from "next-auth/react";
import { UserProfile } from "./UserProfile";
import { Button } from "./Button";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link href='/' className='text-xl font-bold text-gray-900'>
            Dashboard Builder
          </Link>

          {session?.user ? (
            <UserProfile
              user={session.user}
              onSignOut={() => signOut({ callbackUrl: "/" })}
            />
          ) : (
            <Link href='/login'>
              <Button variant='outline' size='sm'>
                로그인
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
