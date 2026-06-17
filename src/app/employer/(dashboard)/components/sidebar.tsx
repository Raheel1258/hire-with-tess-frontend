'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import LogoutDialogue from '@/app/employer/profile/components/logoutdialogue';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import LogoutMenuItem from '@/components/sidebar/LogoutMenuItem';
import type { SidebarNavItem } from '@/components/sidebar/types';

export type SidebarLink = SidebarNavItem;

export interface SidebarProps {
  links: SidebarLink[];
  onLogout?: () => void;
}

export interface MobileSidebarProps {
  links: SidebarLink[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SidebarNav({
  links,
  onLogoutClick,
  onNavigate,
  isMobile = false,
}: {
  links: SidebarLink[];
  onLogoutClick: () => void;
  onNavigate?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (route: string) => {
    if (pathname !== route) {
      router.push(route);
    }
    onNavigate?.();
  };

  const renderLink = (link: SidebarLink) => {
    const isSelected =
      link.route === pathname ||
      (link.route !== '/login' && pathname.includes(link.route));
    const Icon = link.icon;

    return (
      <button
        key={link.route}
        onClick={() => handleClick(link.route)}
        className={cn(
          'group flex w-full items-center gap-3 rounded-lg transition-all duration-300 ease-in-out outline-none relative',
          isMobile ? 'px-3 py-3.5 text-base' : 'px-4 py-2 text-sm',
          isSelected
            ? 'bg-[#FFFAF4] text-[#f7941D] font-semibold'
            : 'text-slate-600 hover:bg-gray-100 hover:text-orange-500',
          'focus-visible:ring-2 focus-visible:ring-orange-300',
        )}
        aria-current={isSelected ? 'page' : undefined}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <Icon
            className={cn('h-5 w-5', isSelected ? 'text-[#f7941D]' : 'text-slate-500 group-hover:text-orange-500')}
            strokeWidth={2}
          />
        </span>
        <span>{link.label}</span>
        <span
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 bg-orange-400 transition-all',
            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
          )}
        />
      </button>
    );
  };

  return (
    <nav
      className={cn(
        'flex flex-col',
        isMobile ? 'min-h-full flex-1 gap-1' : 'gap-2 text-sm font-light',
      )}
    >
      {links.map(renderLink)}
      <div
        className={cn(
          'flex flex-col items-stretch',
          isMobile ? 'mt-auto border-t border-gray-100 pt-4' : 'mt-2 gap-2 items-start p-2',
        )}
      >
        <LogoutMenuItem
          onClick={onLogoutClick}
          className={isMobile ? 'px-4 py-3 text-base' : undefined}
        />
      </div>
    </nav>
  );
}

export function MobileSidebar({ links, open, onOpenChange }: MobileSidebarProps) {
  const [isLogout, setIsLogout] = useState(false);

  const handleLogoutClick = () => {
    onOpenChange(false);
    setIsLogout(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="!inset-y-0 !left-0 !right-auto flex h-full w-[min(280px,85vw)] max-w-[85vw] flex-col gap-0 rounded-none border-0 bg-white p-0 shadow-xl sm:max-w-[280px]"
        >
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <div className="flex items-center border-b border-gray-100 px-6 py-4 pr-12">
            <h2 className="text-lg font-medium text-[#1B2559]">Menu</h2>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
            <SidebarNav
              links={links}
              onLogoutClick={handleLogoutClick}
              onNavigate={() => onOpenChange(false)}
              isMobile
            />
          </div>
        </SheetContent>
      </Sheet>
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}

export default function Sidebar({ links }: SidebarProps) {
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-[250px] p-6 bg-white rounded-2xl">
        <SidebarNav links={links} onLogoutClick={() => setIsLogout(true)} />
      </aside>
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}
