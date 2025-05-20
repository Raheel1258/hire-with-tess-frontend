import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteJobByID } from '../../Api/employer.route';
import { toast } from 'sonner';
import { UserJobResponse } from '@/Types/userJob';
import { AxiosError } from 'axios';

export default function UseDeleteJobByID() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (job_id: string) => DeleteJobByID(job_id),
    onSuccess: async (job_id: string) => {
      toast.success('Job deleted successfully');
      queryClient.setQueryData(['userjobid'], (data: UserJobResponse[]) => {
        return data.filter((job: UserJobResponse) => job.job_id !== job_id);
      });
      queryClient.invalidateQueries({ queryKey: ['userjobid'] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Unable to delete', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during Deletion.',
      });


    },
  });
}
