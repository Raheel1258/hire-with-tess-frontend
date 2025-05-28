import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteJobByID } from '../../Api/employer.route';
import { toast } from 'sonner';
import { UserJobResponse } from '@/Types/userJob';
import { AxiosError } from 'axios';

export default function UseDeleteJobByID() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (job_id: string) => DeleteJobByID(job_id),
    onMutate: async (job_id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['jobs'] });
      
      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData(['jobs']);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['jobs'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((job: UserJobResponse) => job.job_id !== job_id)
        };
      });
      
      return { previousJobs };
    },
    onSuccess: async (job_id: string) => {
      toast.success('Job deleted successfully');
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['jobs'] });
      await queryClient.invalidateQueries({ queryKey: ['jobstats'] });
    },
    onError: (error, job_id, context) => {
      // Revert the optimistic update
      if (context?.previousJobs) {
        queryClient.setQueryData(['jobs'], context.previousJobs);
      }
      
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to delete job', {
        description: axiosError.response?.data?.detail || 'Please try again later.'
      });
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobstats'] });
    },
  });
}
