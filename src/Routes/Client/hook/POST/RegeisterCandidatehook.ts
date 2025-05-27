import { useMutation } from '@tanstack/react-query';
import { RegisterCandidate } from '@/Routes/Client/Api/api.routes';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useCandidateInfoStore from '@/store/candidate/userinfo';

export default function RegeisterCandidatehook() {
  const { jobId } = useParams<{ jobId: string }>();
  const setInterviewId = useCandidateInfoStore((state) => state.setInterviewId);
  const setPhone = useCandidateInfoStore((state) => state.setPhone);
  const router = useRouter();
  return useMutation({
    mutationFn: RegisterCandidate,
    onSuccess: (response) => {
      setInterviewId(response.data.interview_id);
      setPhone(response.data.phone_number);
      console.log(response.data.interview_id);
      router.push(`/interview/choose-option/${jobId}`);
    },
  });
}
