import { useMutation } from '@tanstack/react-query';
import { RegisterCandidate } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export default function RegeisterCandidatehook() {
  const params = useParams();
  const jobId = params.jobId as string;
  const router = useRouter();
  return useMutation({
    mutationFn: RegisterCandidate,
    onSuccess: () => {
      router.push(`/interview/${jobId}/candidate-question/1`);
    },
      onError: (error) => {
          const axiosError = error as AxiosError<{ detail: string }>;
          toast.error('Failed to register candidate', {
            description:
              axiosError.response?.data?.detail || 'An error occurred during Regeistered Candidate.',
          });
        },
  });
}
