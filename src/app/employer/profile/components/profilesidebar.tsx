'use client';

import { Ban, Pencil } from 'lucide-react';
import LogoutMenuItem from '@/components/sidebar/LogoutMenuItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { sidebarProfileItem } from '@/app/employer/profile/Constants/profileitem';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import DeleteDialogue from './deletedialogue';
import LogoutDialogue from './logoutdialogue';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/Profileinfo.hook';
import UseUpdateProfileHook from '@/Routes/Employer/hooks/PUT/profile/Updateprofilehook';
import { Input } from '@/components/ui/input';

export interface MobileProfileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProfileAvatar({
  previewUrl,
  profileInfo,
  size = 'desktop',
  inputId,
  onFileChange,
}: {
  previewUrl: string | null;
  profileInfo: ReturnType<typeof UseProfileInfo>['data'];
  size?: 'desktop' | 'mobile';
  inputId: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const avatarSize = size === 'desktop' ? 'w-40 h-40' : 'w-28 h-28';

  return (
    <div className="relative group">
      <Avatar
        className={cn(avatarSize, 'border-4 border-[#F7941D] cursor-pointer')}
        onClick={() => document.getElementById(inputId)?.click()}
      >
        {previewUrl ? (
          <AvatarImage src={previewUrl} alt={profileInfo?.first_name} className="object-cover" />
        ) : (
          <AvatarFallback>
            {profileInfo?.first_name?.slice(0, 1).toUpperCase() ?? 'E'}
          </AvatarFallback>
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
          <Pencil className="h-6 w-6 text-white" />
        </div>
      </Avatar>
      <Input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}

function ProfileSidebarContent({
  onNavigate,
  onDeleteClick,
  onLogoutClick,
}: {
  onNavigate?: () => void;
  onDeleteClick: () => void;
  onLogoutClick: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState(pathname);
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
    onNavigate?.();
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

  const inputId = onNavigate ? 'mobile-image-upload' : 'sidebar-image-upload';

  const renderLinks = () =>
    sidebarProfileItem.map((link) => {
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
        <ProfileAvatar
          previewUrl={previewUrl}
          profileInfo={profileInfo}
          size={onNavigate ? 'mobile' : 'desktop'}
          inputId={inputId}
          onFileChange={handleFileChange}
        />
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
      <div className="flex flex-col gap-3 mt-2 items-start p-2 w-full">
        <div
          onClick={() => {
            onDeleteClick();
            onNavigate?.();
          }}
          className="flex flex-row items-center gap-4 cursor-pointer px-4 py-2"
        >
          <Ban /> Delete
        </div>
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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
            onNavigate={() => onOpenChange(false)}
            onDeleteClick={() => setIsDeleteOpen(true)}
            onLogoutClick={() => setIsLogout(true)}
          />
        </SheetContent>
      </Sheet>
      <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}

export default function ProfileSidebar() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-full min-w-0 shrink-0 rounded-xl border border-slate-200 bg-white p-4 xl:p-6">
        <ProfileSidebarContent
          onDeleteClick={() => setIsDeleteOpen(true)}
          onLogoutClick={() => setIsLogout(true)}
        />
      </aside>
      <DeleteDialogue open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}
