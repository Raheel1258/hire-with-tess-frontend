import React from 'react';
import Link from 'next/link';

export default function EmployerLayout({
  children,
  hideSignUp = false,
}: {
  children: React.ReactNode;
  hideSignUp?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f7941D] via-[#ffbfbf] to-[#1e4b8e]">
      <header className="flex justify-between items-center p-6 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold text-black">Hirewithtess</h1>
          </Link>
          <nav className="flex gap-4">
            {/*Route sign up button to /signUp page when sing up page is completed */}
            {!hideSignUp && (
              <Link
                href={'/signup'}
                className="bg-tess-blue text-white px-4 py-2 rounded-md hover:bg-[#1E4B8E]-700"
              >
                Sign up
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
            © {new Date().getFullYear()} Hiring Platform.All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
