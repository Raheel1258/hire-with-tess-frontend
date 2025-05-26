import { RegenerateQuestion } from "@/Routes/Client/Api/api.routes";
import { useQuestionStore } from "@/store/Employer/questionStore";
import QuestionType from "@/Types/Employer/question.type";
import { useMutation } from "@tanstack/react-query";

export default function UseRegenerateQuestionHook() {
  const { setAiQuestions } = useQuestionStore();
  return useMutation({
    mutationFn: ({
      job_id,
      questions,
    }: {
      job_id: string;
      questions: QuestionType[];
    }) => RegenerateQuestion(job_id, questions),
    onSuccess: (data) => {
      setAiQuestions(data);
    },
  });
}
