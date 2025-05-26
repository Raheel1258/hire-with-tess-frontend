import { GenerateInterviewLink } from "@/Routes/Client/Api/api.routes";
import { useMutation } from "@tanstack/react-query";
import { useToggleStore } from "@/store/Employer/Toggle.store";
import { toast } from "sonner";

export default function useFetchInterviewLink(job_id: string) {
  const { setInterviewLink, setQrCode } = useToggleStore();

  return useMutation({
    mutationFn: () => GenerateInterviewLink(job_id),
    onSuccess: (data) => {
      setInterviewLink(data.interview_link);
      setQrCode(data.qr_code_base64);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
