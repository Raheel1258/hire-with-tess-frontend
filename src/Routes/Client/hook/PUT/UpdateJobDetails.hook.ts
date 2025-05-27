import { updateJobDetails } from '@/Routes/Client/Api/api.routes';
import { useMutation } from '@tanstack/react-query';
import useHomeStore from '@/store/Employer/home.store';
import JobDetails from '@/Types/Employer/jobdetails.type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
export const useUpdateJob = () => {
  const { jobId } = useHomeStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: JobDetails) => updateJobDetails(jobId, data),
    onSuccess: () => {
      router.push(`/interview/review/${jobId}`);
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error(' Failed to Update Details', {
        description: axiosError.response?.data?.detail,
      });
    },
  });
};
