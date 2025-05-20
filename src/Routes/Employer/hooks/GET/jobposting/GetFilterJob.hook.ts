import { useQuery } from '@tanstack/react-query';
import { FilteredJob } from '@/Routes/Employer/Api/employer.route';
import { JobFilterType } from '@/Types/Employer/jobfilter';

export default function UseGetFilteredJob(filters: JobFilterType) {
  return useQuery({
    queryKey: ['filteredjob', filters], 
    queryFn: () => FilteredJob(filters),
    enabled: filters.job_title.length > 0,
    

  });
}
