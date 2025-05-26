import { updateJobQuestions } from "@/Routes/Client/Api/api.routes";
import useHomeStore from "@/store/Employer/home.store";
import QuestionType from "@/Types/Employer/question.type";
import { useMutation } from "@tanstack/react-query";
export default function useUpdateJobQuestion() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ questions }: { questions: QuestionType[] }) =>
      updateJobQuestions(jobId, questions),
  });
}
