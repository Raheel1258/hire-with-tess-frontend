'use client';
import Header from '@/app/employer/(dashboard)/components/header';
import Sidebar, { MobileSidebar } from '@/app/employer/(dashboard)/components/sidebar';
import { adminSidebarLinks } from '@/app/admin/(dashboard)/constant/sidebar';
import { useState } from 'react';

export default function AdminDashboardBussinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
      <MobileSidebar
        links={adminSidebarLinks}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
      <div className="flex w-full flex-1 px-4 pb-4 md:px-6 lg:pl-6">
        <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[280px_1fr]">
          <Sidebar links={adminSidebarLinks} />
          <main className="main-content-area min-w-0 xl:py-4 xl:px-6 overflow-x-clip">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
