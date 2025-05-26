import { GetEmployees } from '@/Routes/Admin/Api/admin.route';
import { useQuery } from '@tanstack/react-query';

export default function UseDashboardEmployee() {
  return useQuery({
    queryKey: ['employeestats'],
    queryFn: GetEmployees,
    refetchOnWindowFocus: true,
  });
}
