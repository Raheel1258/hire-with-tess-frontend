'use client';
import '@/app/globals.css';
import React from 'react';
import ReactQueryProvider from '@/Utils/Providers/ReactQueryprovider';
import CustomToast from './(dashboard)/components/customtoast';

export default function EmployeeRootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ReactQueryProvider>
      <CustomToast />
      <main>{children}</main>
    </ReactQueryProvider>
  );
}
