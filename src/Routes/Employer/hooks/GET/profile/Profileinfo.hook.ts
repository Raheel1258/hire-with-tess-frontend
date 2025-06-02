import { useQuery } from "@tanstack/react-query";
import { ProfileInfo } from "@/Routes/Employer/Api/employer.route";



export default function UseProfileInfo() {
  return useQuery({
    queryKey: ['profileinfo'],
    queryFn: ProfileInfo,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: true,
  });
}