import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "@/Routes/Client/Api/api.routes";
import { toast } from "sonner";

export default function useUploadFileMutation() {
    return useMutation({

        mutationFn: ({interview_id,data}: {interview_id: string, data: FormData})=>UploadFile(interview_id,data),
        onError: () => {
            toast.error("Failed to submit answer");
        }
    })
    
}
