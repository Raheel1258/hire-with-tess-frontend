import { updateJobQuestions } from '@/Routes/Client/Api/api.routes';
import useHomeStore from '@/store/Employee/home.store';
import { useMutation } from '@tanstack/react-query';
export default function useUpdateJobQuestion() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ questions }: { questions: string[] }) =>
      updateJobQuestions(jobId, questions),
  });
}
