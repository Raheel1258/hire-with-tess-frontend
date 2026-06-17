'use client';

import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoutMenuItemProps {
  onClick: () => void;
  className?: string;
}

export default function LogoutMenuItem({ onClick, className }: LogoutMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[#f7941D] transition-colors hover:bg-gray-200',
        className,
      )}
    >
      <LogOut className="h-5 w-5 shrink-0" />
      <span>Logout</span>
    </button>
  );
}
