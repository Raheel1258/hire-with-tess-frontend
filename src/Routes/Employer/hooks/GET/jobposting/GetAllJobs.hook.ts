import { useQuery } from '@tanstack/react-query';
import { GetAllJob } from '../../../Api/employer.route';

export default function UseGetAllJob() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: GetAllJob,
    refetchOnWindowFocus: true,
  });
}
