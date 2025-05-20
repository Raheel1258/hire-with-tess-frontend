import React from 'react';
import Link from 'next/link';

export default function MainLayout({
  children,
  hideSignUp = false,
}: {
  children: React.ReactNode;
  hideSignUp?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-orange-400 to-pink-500">
      <header className="flex justify-between items-center p-6 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold">Hirewithtess</h1>
          </Link>
          <nav className="flex gap-4">
            {!hideSignUp && (
              <Link
                href="/signup"
                className="bg-tess-blue rrrr text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center text-center px-6 py-12">
        {children}
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Hiring Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
