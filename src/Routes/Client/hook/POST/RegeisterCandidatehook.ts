import { useMutation } from '@tanstack/react-query';
import { RegisterCandidate } from '@/Routes/Client/Api/api.routes';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useCandidateInfoStore from '@/store/candidate/userinfo';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function RegeisterCandidatehook() {
  const { jobId } = useParams<{ jobId: string }>();
  const setInterviewId = useCandidateInfoStore((state) => state.setInterviewId);
  const setPhone = useCandidateInfoStore((state) => state.setPhone);
  const router = useRouter();

  return useMutation({
    mutationFn: RegisterCandidate,
    onSuccess: (response) => {
      setInterviewId(response.data.interview_id);
      setPhone(response.data.phone);
      router.push(`/interview/choose-option/${jobId}`);
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to submit details', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during starting Interview.',
      });
    },
  });
}
