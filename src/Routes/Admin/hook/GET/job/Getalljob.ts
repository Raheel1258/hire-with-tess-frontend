import { GetAllJob } from '@/Routes/Admin/Api/admin.route';
import { useQuery } from '@tanstack/react-query';

export default function UseDashboardEmployee() {
  return useQuery({
    queryKey: ['jobstats'],
    queryFn: GetAllJob,
    refetchOnWindowFocus: true,
  });
}
