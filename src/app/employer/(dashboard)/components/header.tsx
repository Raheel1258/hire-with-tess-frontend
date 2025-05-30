'use client';
import { useRouter } from 'next/navigation';
import { BellIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/Profileinfo.hook';
import UseProfileSuperAdmin from '@/Routes/Admin/hook/GET/Profileinfo.hook';
import { getAuthRole } from '@/Utils/Providers/auth';


export default function Header() {
  const router = useRouter();
  const { data: profileInfo } = UseProfileInfo();

  const { data: superAdminInfo } = UseProfileSuperAdmin();

  const handleNavigation = () => {
    if (getAuthRole() === 'superadmin') {
      router.push('/admin/profile/account-details');
    } else {
      router.push('/employer/profile/account-details');
    }
  };

  return (
    <div className="bg-white flex justify-between h-18 mb-8 p-6">
      <div className="font-[Space Grotesk] text-[20px]">
        {getAuthRole() === 'superadmin' ? superAdminInfo?.organization_name : profileInfo?.organization_name}
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-[#A2A1A81A] w-[50px] h-12 rounded-xl flex items-center justify-center">
          <BellIcon />
        </div>
        <div
          onClick={handleNavigation}
          className="flex w-full sm:w-[184px] h-[50px] border rounded-lg items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="p-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={profileInfo?.image_url || 'https://github.com/shadcn.png'}
                alt="@shadcn"
              />
              <AvatarFallback>
                {' '}
                {getAuthRole() === 'superadmin'
                  ? superAdminInfo?.firstname
                  : profileInfo?.firstname || 'IN'}{' '}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="pl-2">
            <h1 className="font-normal text-sm truncate max-w-[100px]">
              {getAuthRole() === 'superadmin' ? superAdminInfo?.first_name : profileInfo?.first_name}
            </h1>
            <p className="text-sm text-[#A2A1A8]">
              {getAuthRole() === 'superadmin' ? 'Super Admin' : 'Employer'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
