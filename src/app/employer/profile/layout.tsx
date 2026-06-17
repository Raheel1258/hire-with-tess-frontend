'use client';

import { useState } from 'react';
import ProfileSidebar, { MobileProfileSidebar } from '@/app/employer/profile/components/profilesidebar';
import Header from '../(dashboard)/components/header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-slate-100">
      <Header
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
        mobileMenuBreakpoint="lg"
      />
      <MobileProfileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      <div className="grid min-h-screen w-full grid-cols-1 gap-4 px-4 pb-4 md:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ProfileSidebar />
        <div className="main-content-area min-w-0 w-full py-4 overflow-x-clip">{children}</div>
      </div>
    </div>
  );
}
