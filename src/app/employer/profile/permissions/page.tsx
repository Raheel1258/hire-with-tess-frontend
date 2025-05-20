import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UpdateNotificationType } from '@/Routes/Employer/Api/employer.route';
import UseProfilePermision from '@/Routes/Employer/hooks/GET/profile/permission';
import RedirectToDashboard from '../components/breadcrumb';
// import { useEffect } from 'react';

export default function UserProfilePermission() {
  // const {data:permission} = UseProfilePermision();
  // useEffect(() => {
  //   if (permission) {
  //     console.log("Permission data", permission);
  //   }
  // }, [permission]);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <RedirectToDashboard
          DashboardTitle="Dashboard"
          ProfileTitle="Profile"
          PageTitle="Permissions"
          DashboardUrl="/employer/home"
          ProfileUrl="/employer/profile"
        />
        <h1 className="text-2xl font-semibold text-slate-800">Permissions</h1>
      </div>
      <Card className="p-4">
        {/* Permission 1 */}
        <div className="gap-2 mb-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="font-[open Sans] text-[#1E293B] font-semibold">
                Receive Interview Completion Alerts
              </h1>
              <p className="font-thin text-sm">
                Get updates with candidates finish interviews{' '}
              </p>
            </div>
            <Switch 
            
             />
          </div>
        </div>

        {/* Permission 2 */}
        <div className="gap-2 mb-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="font-[open Sans] text-[#1E293B] font-semibold">
                Receive Notification for New Applicants
              </h1>
              <p className="font-thin text-sm">
                Get notofied whenever a candidates completes an interview or submits
                application{' '}
              </p>
            </div>
            <Switch />
          </div>
        </div>

        {/* Permission 3 */}
        <div className="gap-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="font-[open Sans] text-[#1E293B] font-semibold">
                Show Company Brand on Job Listings{' '}
              </h1>
              <p className="font-thin text-sm">
                Display your company logo and details on job postings for better
                visibility{' '}
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
}
