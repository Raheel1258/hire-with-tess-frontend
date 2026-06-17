import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/Utils/Providers/ReactQueryprovider';
import React from 'react';
import CustomToast from './employer/(dashboard)/components/customtoast';

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Hire with Tess',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans antialiased`}>
        <CustomToast />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
