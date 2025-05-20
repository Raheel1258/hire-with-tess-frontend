import { useQuery } from '@tanstack/react-query';
import { NotificationSetting } from '@/Routes/Employer/Api/employer.route';

export default function UseGetSettingNotification() {
  return useQuery({
    queryKey: ['setting'],
    queryFn: NotificationSetting,
    enabled: true,
  });
}
