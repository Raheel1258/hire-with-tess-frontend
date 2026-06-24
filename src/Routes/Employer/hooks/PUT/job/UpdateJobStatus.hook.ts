import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateJobStatusByID } from '@/Routes/Employer/Api/employer.route';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
export default function UseUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ job_id, status }: { job_id: string; status: string }) =>
      UpdateJobStatusByID(job_id, status),

    onSuccess: (_, { job_id }) => {
      queryClient.invalidateQueries({ queryKey: ['status', job_id] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobstats'] });
      queryClient.invalidateQueries({ queryKey: ['overiewstats'] });
      queryClient.invalidateQueries({ queryKey: ['candidatestats'] });
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
    },

    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Unable to update status', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during job status update.',
      });
    },
  });
}
