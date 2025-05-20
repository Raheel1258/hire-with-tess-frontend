'use client';

import '@/app/globals.css';
import React, { useEffect } from 'react';
import ReactQueryProvider from '@/Utils/Providers/ReactQueryprovider';
import CustomToast from '@/app/employer/(dashboard)/components/customtoast';
import { useRouter } from 'next/navigation';
import EmployeeAuthStore from '@/store/Employee/auth.store';

export default function EmployeeRootLayout({ children }: { children: React.ReactNode }) {
  //   const router = useRouter();
  //   const { accessToken } = EmployeeAuthStore();

  //   useEffect(() => {
  //     if (!accessToken) {
  //       router.push('/login');
  //     }
  //   }, [accessToken, router]);

  //   if (!accessToken) {
  //     return null;
  //   }

  return (
    <ReactQueryProvider>
      <CustomToast />
      <main>{children}</main>
    </ReactQueryProvider>
  );
}
