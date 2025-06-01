import { GenerateQuestion } from "@/Routes/Client/Api/api.routes";
import { useQuestionStore } from "@/store/Employer/questionStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function GenerateQuestionResponse() {
  const { setAiQuestions } = useQuestionStore();
  return useMutation({
    mutationFn: ({ job_id }: { job_id: string }) => GenerateQuestion(job_id),
    onSuccess: (data) => {
      setAiQuestions(data);
    },
    onError: async (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to generate questions', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during question generation.',
      });
    },
  });
}
