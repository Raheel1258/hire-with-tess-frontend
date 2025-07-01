import { useQuery } from '@tanstack/react-query';
import { FilteredJob } from '@/Routes/Employer/Api/employer.route';
import { JobFilterType } from '@/Types/EmployerDashboard/jobfilter';

const UseGetFilteredJob = (params: JobFilterType, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['filteredJobs', params],
    queryFn: () => FilteredJob(params),
    enabled: options?.enabled ?? true
  });
};

export default UseGetFilteredJob;
