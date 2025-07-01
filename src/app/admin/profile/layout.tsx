import Header from '@/app/employer/(dashboard)/components/header';
import ProfileSidebar from './components/profilesidebar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100">
      <Header superAdmin={true} />
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] px-6">
        <ProfileSidebar />
        <div className="main-content-area">{children}</div>
      </div>
    </div>
  );
}
