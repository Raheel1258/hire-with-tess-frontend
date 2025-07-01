import { useQuery } from "@tanstack/react-query";
import { GetCandidateJobs } from "@/Routes/Admin/Api/admin.route";

export default function useGetCandidateJobs(user_id: string) {
  return useQuery({
    queryKey: ['candidate-jobs', user_id],
    queryFn: () => GetCandidateJobs(user_id),
  });
}