'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ProfileSidebar from '@/app/employer/profile/components/profilesidebar';
import { sidebarProfileItem } from '../Constants/profileitem';

export default function ProfileLayout() {
  const [activeKey, setActiveKey] = useState('accountdetails');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-slate-100">
      <div className="flex p-4 gap-10">
        <div className="hidden md:block">
          <ProfileSidebar
            items={sidebarProfileItem}
            name="Jane Doe"
            role="Admin"
            imageUrl="https://example.com/avatar.jpg"
            fallback="JD"
            activeKey={activeKey}
            onSelect={setActiveKey}
          />
        </div>
      </div>
    </div>
  );
}
