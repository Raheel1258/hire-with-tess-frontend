'use client';

import { Ban, LogOut, Menu, Pencil } from 'lucide-react';
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
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/Profileinfo.hook';
import UseUpdateProfileHook from '@/Routes/Employer/hooks/PUT/profile/Updateprofilehook';
import { Input } from '@/components/ui/input';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState(pathname);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: profileInfo } = UseProfileInfo();
  const UpdateProfileMutation = UseUpdateProfileHook();

  useEffect(() => {
    setActivePath(pathname);
    if (profileInfo?.image_url) {
      setPreviewUrl(profileInfo.image_url);
    }
  }, [pathname, profileInfo]);

  const handleClick = (route: string) => {
    setActivePath(route);
    router.push(route);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('first_name', profileInfo?.first_name || '');
      formData.append('last_name', profileInfo?.last_name || '');
      formData.append('organization_name', profileInfo?.organization_name || '');
      formData.append('email', profileInfo?.email || '');

      UpdateProfileMutation.mutate(formData);
    }
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
              isSelected && 'bg-[#f7941D] text-white',
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
          <div className="relative group">
            <Avatar 
              className="w-40 h-40 border-4 border-[#F7941D] cursor-pointer"
              onClick={() => document.getElementById('sidebar-image-upload')?.click()}
            >
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt={profileInfo?.first_name} className="object-cover" />
              ) : (
                <AvatarFallback>
                  {profileInfo?.first_name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-6 h-6 text-white" />
              </div>
            </Avatar>
            <Input
              id="sidebar-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="font-semibold text-[#4B4B4B]">
              {profileInfo?.first_name} {profileInfo?.last_name}
            </h1>
            <p className="text-sm font-light">Employer</p>
          </div>
          <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
        </div>
        <nav className="flex flex-col gap-2 text-sm font-light">{renderLinks()}</nav>
        <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
        <div className="flex flex-col gap-2 mt-2 items-start p-2">
          <div
            onClick={() => setIsDeleteOpen(true)}
            className="flex flex-row gap-4 cursor-pointer"
          >
            <Ban /> Delete
          </div>
          <div
            onClick={() => setIsLogout(true)}
            className="flex flex-row gap-4 mt-2 cursor-pointer"
          >
            <LogOut /> Logout
          </div>
        </div>
      </aside>
      <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      <div className="fixed top-20 left-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-md bg-white">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] max-w-[85vw] bg-white p-6">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar 
                  className="w-28 h-28 border-4 border-[#F7941D] cursor-pointer"
                  onClick={() => document.getElementById('mobile-image-upload')?.click()}
                >
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt={profileInfo?.first_name} className="object-cover" />
                  ) : (
                    <AvatarFallback>
                      {profileInfo?.first_name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                </Avatar>
                <Input
                  id="mobile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center mt-4">
                <h1 className="font-semibold text-[#4B4B4B]">
                  {profileInfo?.first_name} {profileInfo?.last_name}
                </h1>
                <p className="text-sm font-light">Employer</p>
              </div>
              <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
            </div>
            <nav className="flex flex-col gap-2 text-sm font-light">{renderLinks()}</nav>
            <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
            <div className="flex flex-col gap-2 mt-2 items-start p-2">
              <div
                onClick={() => setIsDeleteOpen(true)}
                className="flex flex-row gap-4 cursor-pointer"
              >
                <Ban /> Delete
              </div>
              <div
                onClick={() => setIsLogout(true)}
                className="flex flex-row gap-4 mt-2 cursor-pointer"
              >
                <LogOut /> Logout
              </div>
            </div>
            <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
            <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
