'use client';
import Header from '@/app/employer/(dashboard)/components/header';
import Sidebar from '@/app/employer/(dashboard)/components/sidebar';
import { employeeSidebarLinks } from '../Constant/sidebaritem';
import { clearAuthToken } from '@/Utils/Providers/auth';
import { useRouter } from 'next/navigation';
export default function DashboardBussinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = () => {
    clearAuthToken();
    router.push('/login');
  };
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] px-4 md:px-6">
        <Sidebar links={employeeSidebarLinks} onLogout={handleLogout} />
        <div className="main-content-area py-4 overflow-x-hidden md:pt-0 pt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
