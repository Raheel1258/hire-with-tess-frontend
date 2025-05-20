import { useMutation } from "@tanstack/react-query";
import { AnalyzeInterview } from "@/Routes/Employer/Api/employer.route";

export default function AnalyzeInterviewHook(){
    return useMutation({
        mutationFn:({interview_id}:{interview_id:string}) =>AnalyzeInterview(interview_id)
    })
}