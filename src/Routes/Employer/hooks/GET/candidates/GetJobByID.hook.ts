import { useQuery } from '@tanstack/react-query';
import { UserJobByID } from '../../../Api/employer.route';

export default function UseGETJobBYID(job_id: string) {
  return useQuery({
    queryKey: ['userjobid', job_id],
    queryFn: () => UserJobByID(job_id),
    enabled: !!job_id,
  });
}
