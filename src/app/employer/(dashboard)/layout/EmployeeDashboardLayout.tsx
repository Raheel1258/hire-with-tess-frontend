'use client';

import Header from '@/app/employer/(dashboard)/components/header';

import Sidebar, { MobileSidebar } from '@/app/employer/(dashboard)/components/sidebar';

import { employeeSidebarLinks } from '../Constant/sidebaritem';

import { useState } from 'react';



export default function DashboardBussinessLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (

    <div className="bg-slate-100">

      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />

      <MobileSidebar

        links={employeeSidebarLinks}

        open={mobileMenuOpen}

        onOpenChange={setMobileMenuOpen}

      />

      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr] px-4 md:px-6 xl:pb-4">

        <Sidebar links={employeeSidebarLinks} />

        <div className="main-content-area py-4 overflow-x-hidden">

          {children}

        </div>

      </div>

    </div>

  );

}

