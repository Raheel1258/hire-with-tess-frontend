import { useMutation } from '@tanstack/react-query';
import { GenerateJobDetails } from '@/Routes/Client/Api/api.routes';
import { useRouter } from 'next/navigation';
import useHomeStore from '@/store/Employee/home.store';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function useGenerateResponse() {
  const router = useRouter();
  const { setJobId } = useHomeStore();

  return useMutation({
    mutationFn: GenerateJobDetails,
    onSuccess: async (data) => {
      if (data?.id) {
        setJobId(data.id);
        router.push(`/interview?job_id=${data.id}`);
      } else {
        toast.error('Failed to generate response');
      }
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to generate response', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during generating response.',
        });
      },
  });
}
