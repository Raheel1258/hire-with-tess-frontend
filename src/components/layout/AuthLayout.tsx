import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-xl font-semibold text-tess-blue">HireWithTess</h1>
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} HireWithTess. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
