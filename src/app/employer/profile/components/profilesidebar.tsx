'use client';

import { Ban, Delete, LogOut, Menu } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { sidebarProfileItem } from '@/app/employer/profile/Constants/profileitem';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import DeleteDialogue from './deletedialogue';
import LogoutDialogue from './logoutdialogue';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/profileinfohook';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState(pathname);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const {data:profileInfo}  = UseProfileInfo();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleClick = (route: string) => {
    setActivePath(route);
    router.push(route);
  };

  const renderLinks = () =>
    sidebarProfileItem.map((link) => {
      const isSelected =
        link.route === activePath ||
        (link.route.length > 1 && activePath.includes(link.route));

      return (
        <Link href={link.route} key={link.route} onClick={() => handleClick(link.route)}>
          <div
            className={cn(
              'flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer',
              isSelected && 'bg-[#f7941D] text-white'
            )}
          >
            <div className="relative w-6 h-6">
              <Image
                src={link.img}
                alt="icon"
                fill
                className={cn('object-contain', isSelected && 'brightness-0 invert')}
              />
            </div>
            <p className={cn(isSelected ? 'text-white' : 'text-dark')}>{link.label}</p>
          </div>
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[250px] p-6 bg-white border-r rounded-xl">
        <div className="flex flex-col items-center">
          <Avatar className="w-40 h-40 border-4 border-[#F7941D]">
            {/* <AvatarImage src={user?.img} alt={user?.name} />
          <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback> */}
          </Avatar>
          <div className="text-center mt-4">
            <h1 className="font-semibold text-[#4B4B4B]">{profileInfo?.first_name} {profileInfo?.last_name}</h1>
            <p className="text-sm font-light">Employer</p>
          </div>
          <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
        </div>
        <nav className="flex flex-col gap-2 text-sm font-light">{renderLinks()}</nav>
        <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
        <div className='flex flex-col gap-2 mt-2 items-start p-2'>
          <div onClick={() => setIsDeleteOpen(true)} className='flex flex-row gap-4 cursor-pointer'>
            <Ban /> Delete
          </div>
          <div onClick={() => setIsLogout(true)} className='flex flex-row gap-4 mt-2 cursor-pointer'>
            <LogOut /> Logout
          </div>
        </div>
      </aside>
      <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      <div className=" top-4 left-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] bg-white p-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-28 h-28 border-4 border-[#F7941D]" />
              <div className="text-center mt-4">
                <h1 className="font-semibold text-[#4B4B4B]">John Doe</h1>
                <p className="text-sm font-light">Employer</p>
              </div>
              <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
            </div>
            <nav className="flex flex-col gap-2 text-sm font-light">{renderLinks()}</nav>
            <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
            <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
            <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
