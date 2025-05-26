import { updateJobDetails } from '@/Routes/Client/Api/api.routes';
import { useMutation } from '@tanstack/react-query';
import useHomeStore from '@/store/Employer/home.store';
import JobDetails from '@/Types/Employer/jobdetails.type';

export const useUpdateJob = () => {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ( data: JobDetails ) => updateJobDetails(jobId, data),
  });
};
