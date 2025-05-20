import { useQuery } from '@tanstack/react-query';
import { GetEmployeesById } from '@/Routes/Admin/Api/admin.route';

export default function UseGetEmployeesById(user_id: string) {
  return useQuery({
    queryKey: ['userId', user_id],
    queryFn: () => GetEmployeesById(user_id),
    enabled: !!user_id,
  });
}
