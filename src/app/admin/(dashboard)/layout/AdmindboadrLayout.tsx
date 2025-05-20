'use client';
import Header from '@/app/employer/(dashboard)/components/header';
import Sidebar from '@/app/employer/(dashboard)/components/sidebar';
import EmployeeAuthStore from '@/store/Employee/auth.store';
import { adminSidebarLinks } from '@/app/admin/(dashboard)/constant/sidebar';

export default function AdminDashboardBussinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAccessToken } = EmployeeAuthStore();
  const handleLogout = () => {
    setAccessToken('');
    localStorage.removeItem('accessToken');
    document.cookie = 'accessToken=; path=/; max-age=0;';
  };
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pl-6">
        <Sidebar links={adminSidebarLinks} onLogout={handleLogout} />
        <div className="main-content-area px-4 md:px-6 py-4 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
