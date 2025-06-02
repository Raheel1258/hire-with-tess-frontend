import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "@/Routes/Client/Api/api.routes";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useUploadFileMutation() {
    return useMutation({

        mutationFn: ({interview_id,data}: {interview_id: string, data: FormData})=>UploadFile(interview_id,data),
        onError: async (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to submit answer', {
                description:
                  axiosError.response?.data?.detail || 'An error occurred during answer submission.',
              });
        }
    })
    
}
