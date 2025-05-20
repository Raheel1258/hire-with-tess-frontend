import EmployeeDashboardLayout from '@/app/employer/(dashboard)/layout/EmployeeDashboardLayout';

export default function ProfileDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      <h2 className="text-2xl font-semibold mb-2">Welcome to the Employee Profile</h2>
      <p className="text-gray-500">
        Please choose an option from the sidebar to get started.
      </p>
    </div>
  );
}
  