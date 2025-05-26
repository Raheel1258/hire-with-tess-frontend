import { GenerateQuestion } from "@/Routes/Client/Api/api.routes";
import { useQuestionStore } from "@/store/Employer/questionStore";
import { useMutation } from "@tanstack/react-query";

export default function GenerateQuestionResponse() {
  const { setAiQuestions } = useQuestionStore();
  return useMutation({
    mutationFn: ({ job_id }: { job_id: string }) => GenerateQuestion(job_id),
    onSuccess: (data) => {
      setAiQuestions(data);
    },
  });
}
