'use client';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import RedirectToDashboard from '../components/breadcrumb';
import UseAdminProfilePermision from '@/Routes/Employer/hooks/GET/profile/Permission.hook';
import UseUpdateNotificationPermission from '@/Routes/Employer/hooks/PUT/profile/NotificationPermission.hook';
import { useEffect, useState } from 'react';

interface Permission {
  enabled: boolean;
  name: string;
  type: string;
}

export default function UserProfilePermission() {
  const { data: permission } = UseAdminProfilePermision();
  const { mutate: updateNotificationPermission } = UseUpdateNotificationPermission();

  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (permission) {
      setPermissions(permission);
    }
  }, [permission]);

  const handleUpdateNotificationPermission = (type: string, enabled: boolean) => {
    updateNotificationPermission({ notification_type: type, enabled });
    setPermissions((prev) =>
      prev.map((perm) => (perm.type === type ? { ...perm, enabled } : perm))
    );
  };
  

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
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Permissions</h1>
      </div>
      <Card className="p-4">
        {permissions.map((permission, index) => (
          <div
            key={permission.type}
            className={`gap-2 ${index !== permissions.length - 1 ? 'mb-2' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="font-[open Sans] text-[#1E293B] font-semibold">
                  {permission.name}
                </h1>
                <p className="font-thin text-sm">
                  Get updates when {permission.name.toLowerCase()}
                </p>
              </div>
              <Switch
                checked={permission.enabled}
                onCheckedChange={(checked) =>
                  handleUpdateNotificationPermission(permission.type, checked)
                }
              />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
