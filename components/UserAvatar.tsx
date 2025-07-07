import React from 'react';
import useGetUser from '@/lib/useGetUser';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import supabase from '@/utils/supabase/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

type UserAvatarProps = {
  className?: string;
  size?: number;
};

export function UserAvatar({ className, size = 40 }: UserAvatarProps) {
  const { user, loading, refresh } = useGetUser();

  if (loading) {
    return <Skeleton className={cn('rounded-sm', className)} style={{ width: size, height: size }} />;
  }

  const avatarSeed = user?.email?.split('@')[0] || 'fallback';
  const avatarUrl = user?.profile?.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`;

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn('rounded-sm overflow-hidden focus:outline-none', className)}
          style={{ width: size, height: size, padding: 0, border: 'none', background: 'none' }}
        >
          <Image
            src={avatarUrl}
            alt={user?.profile?.full_name || user?.email || 'User avatar'}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            priority
            unoptimized
            draggable={false}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        <div className="px-3 py-2 text-sm font-medium border-b border-border">
          {user?.profile?.full_name || user?.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
