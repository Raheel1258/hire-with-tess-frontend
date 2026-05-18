'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import SignupDialogue from '@/app/interview/component/signupDialogue';
import { clearAuthToken, getAuthRole, getAuthToken } from '@/Utils/Providers/auth';
import { useRouter } from 'next/navigation';
import { useDashboardRedirect } from '@/Utils/helper/dashboardredirect';
import { useQuestionStore } from '@/store/Employer/questionStore';
import { useToggleStore } from '@/store/Employer/Toggle.store';
import useHomeStore from '@/store/Employer/home.store';

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();


  const DashboardRedirect = () => {
    useDashboardRedirect(router);
    if (getAuthToken() && getAuthRole() === 'superadmin') {
      router.push('/admin/home');
    } else if (getAuthToken() && getAuthRole() === 'admin') {
      router.push('/employer/home');
    }
  };

  const { resetInterviewLink } = useToggleStore();
  const { resetAIResponse } = useHomeStore();
  const { resetQuestionStore } = useQuestionStore();

  const ResetAll = () => {
    resetAIResponse();
    resetQuestionStore();
    resetInterviewLink();
  };

  const handleSignOut = () => {
    clearAuthToken();
    ResetAll();
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f7941D] via-[#ffbfbf] to-[#1e4b8e]">
      <header className="flex items-center text-white w-full px-4 py-4">
        <div className="flex items-center w-full">
          <Link href="/">
            <h1 className="text-xl pr-2 font-semibold text-black">Hirewithtess</h1>
          </Link>
          <nav className="flex gap-4 ml-auto">
            {getAuthToken() ? (
              <div className="flex gap-2">
                <Button
                  onClick={handleSignOut}
                  variant='secondary'
                  className=" py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Sign Out
                </Button>

                <Button
                  onClick={DashboardRedirect}
                  variant='secondary'
                  className="bg-tess-blue text-white py-2 rounded-md hover:bg-[#1E4B8E]-700 cursor-pointer"
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <>
                <Link href={'/login'}>

                  <Button
                    variant="secondary"
                    className="bg-tess-blue text-white py-2 rounded-md hover:bg-[#1E4B8E]-700 cursor-pointer">
                    Login
                  </Button>
                </Link>
                {/* <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='secondary'
                      className="bg-tess-blue text-white py-2 rounded-md hover:bg-[#1E4B8E]-700 cursor-pointer">
                      Sign up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="items-center bg-white shadow-2xl rounded-lg w-5xl">
                    <DialogTitle></DialogTitle>
                    <SignupDialogue />
                  </DialogContent>
                </Dialog> */}
              </>
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
