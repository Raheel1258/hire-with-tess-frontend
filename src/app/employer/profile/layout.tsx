import ProfileSidebar from '@/app/employer/profile/components/profilesidebar';
import Header from '../(dashboard)/components/header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] px-4 md:px-6">
        <ProfileSidebar />
        <div className="main-content-area px-0 py-4 overflow-x-hidden md:pt-0 pt-14">{children}</div>
      </div>
    </div>
  );
}
