import { useQuery } from "@tanstack/react-query";
import { ProfileInfo } from "@/Routes/Employer/Api/employer.route";

interface UseProfileInfoOptions {
  enabled?: boolean;
}

export default function UseProfileInfo(options?: UseProfileInfoOptions) {
  return useQuery({
    queryKey: ['profileinfo'],
    queryFn: ProfileInfo,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: options?.enabled ?? true,
  });
}