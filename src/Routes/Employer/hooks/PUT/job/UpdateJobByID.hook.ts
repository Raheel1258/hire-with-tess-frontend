import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateJobByID } from '@/Routes/Employer/Api/employer.route';
import { toast } from 'sonner';
import { UserJobResponse } from '@/Types/userJob';
import { AxiosError } from 'axios';

export default function UseUpdateJobByID() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ job_id, data }: { job_id: string; data: UserJobResponse }) =>
      UpdateJobByID(job_id, data),

    onSuccess: (apiData, { job_id }) => {
      queryClient.setQueryData(['userjobid'], (userdata: UserJobResponse[] = []) =>
        userdata.map((job) => (job.job_id === job_id ? apiData : job)),
      );

      queryClient.invalidateQueries({ queryKey: ['userjobid'] });
    },

    onError: async (error) => {
          const axiosError = error as AxiosError<{ detail: string }>;
          toast.error('There was a problem with your request.', {
            description:
              axiosError.response?.data?.detail || 'An error occurred during job update.',
          });
    },
  });
}
