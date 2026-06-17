'use client';

import LogoutMenuItem from '@/components/sidebar/LogoutMenuItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { sidebarProfileItemSuperAdmin } from '@/app/employer/profile/Constants/profileitem';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import LogoutDialogue from './logoutdialogue';
import UseProfileInfo from '@/Routes/Admin/hook/GET/Profileinfo.hook';

export interface MobileProfileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProfileSidebarContent({
  onNavigate,
  onLogoutClick,
  compact = false,
}: {
  onNavigate?: () => void;
  onLogoutClick: () => void;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState(pathname);

  const { data: profileInfo } = UseProfileInfo();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleClick = (route: string) => {
    setActivePath(route);
    router.push(route);
    onNavigate?.();
  };

  const renderLinks = () =>
    sidebarProfileItemSuperAdmin.map((link) => {
      const isSelected =
        link.route === activePath ||
        (link.route.length > 1 && activePath.includes(link.route));
      const Icon = link.icon;

      return (
        <Link href={link.route} key={link.route} onClick={() => handleClick(link.route)}>
          <div
            className={cn(
              'flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer',
              isSelected && 'bg-[#f7941D] text-white',
            )}
          >
            <Icon
              className={cn('h-5 w-5 shrink-0', isSelected ? 'text-white' : 'text-[#f7941D]')}
              strokeWidth={2}
            />
            <p className={cn(isSelected ? 'text-white' : 'text-dark')}>{link.label}</p>
          </div>
        </Link>
      );
    });

  return (
    <>
      <div className="flex flex-col items-center">
        <Avatar className={cn('border-4 border-[#F7941D]', compact ? 'w-28 h-28' : 'w-40 h-40')}>
          <AvatarImage src={profileInfo?.image_url} alt={profileInfo?.first_name} />
          <AvatarFallback>
            {profileInfo?.first_name?.slice(0, 1).toUpperCase() ?? 'A'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center mt-4">
          <h1 className="font-semibold text-[#4B4B4B]">
            {profileInfo?.first_name} {profileInfo?.last_name}
          </h1>
          <p className="text-sm font-light">{profileInfo?.email}</p>
        </div>
        <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
      </div>
      <nav className="flex flex-col gap-2 text-sm font-light">{renderLinks()}</nav>
      <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
      <div className="flex flex-col gap-2 mt-2 items-start p-2">
        <LogoutMenuItem
          onClick={() => {
            onLogoutClick();
            onNavigate?.();
          }}
        />
      </div>
    </>
  );
}

export function MobileProfileSidebar({ open, onOpenChange }: MobileProfileSidebarProps) {
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="!inset-y-0 !left-0 !right-auto flex h-full w-[min(280px,85vw)] max-w-[85vw] flex-col gap-0 overflow-y-auto rounded-none border-0 bg-white p-6 shadow-xl sm:max-w-[280px]"
        >
          <SheetTitle className="sr-only">Profile navigation menu</SheetTitle>
          <ProfileSidebarContent
            compact
            onNavigate={() => onOpenChange(false)}
            onLogoutClick={() => setIsLogout(true)}
          />
        </SheetContent>
      </Sheet>
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}

export default function ProfileSidebar() {
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-full min-w-0 shrink-0 rounded-xl border border-slate-200 bg-white p-4 xl:p-6">
        <ProfileSidebarContent onLogoutClick={() => setIsLogout(true)} />
      </aside>
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}
