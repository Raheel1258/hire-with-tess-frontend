import { JobeInterById } from "@/Routes/Employer/Api/employer.route";
import { useQuery } from "@tanstack/react-query";

export default function UseGetJobInterviewByID(job_id: string) {
  return useQuery({
    queryKey: ['job-interview-by-id', job_id],
    queryFn: () => JobeInterById(job_id),
    enabled: !!job_id,
  });
}