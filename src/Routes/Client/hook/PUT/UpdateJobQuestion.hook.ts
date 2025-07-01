import { updateJobQuestions } from "@/Routes/Client/Api/api.routes";
import useHomeStore from "@/store/Employer/home.store";
import QuestionType from "@/Types/Employer/question.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
export default function useUpdateJobQuestion() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ questions }: { questions: QuestionType[] }) =>
      updateJobQuestions(jobId, questions),
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to update job questions', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during job question update.',
      });
    },
  });
}
