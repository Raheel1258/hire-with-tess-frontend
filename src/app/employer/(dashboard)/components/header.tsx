'use client';
import {  useRouter } from 'next/navigation';
import { BellIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/profileinfohook';

export default function Header() {
  const router = useRouter();
  const {data:profileInfo}  = UseProfileInfo();

  return (
    <div className="bg-white flex justify-between h-18 mb-8 p-6">
      <div className="font-[Space Grotesk] text-[20px]">{profileInfo?.organization_name}</div>
      <div className="flex gap-2 items-center">

        <div className="bg-[#A2A1A81A] w-[50px] h-12 rounded-xl flex items-center justify-center">
          <BellIcon />
        </div>
        <div
          onClick={() => router.push('/employer/profile/account-details')}
          className="flex w-full sm:w-[184px] h-[50px] border rounded-lg items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="p-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback> {(profileInfo?.firstname || "IN")} </AvatarFallback>
            </Avatar>
          </div>
          <div className="pl-2">
            <h1 className="font-normal text-sm">{profileInfo?.first_name}</h1>
            <p className="text-sm text-[#A2A1A8]">Employer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
