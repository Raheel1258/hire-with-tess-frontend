import { useQuery } from "@tanstack/react-query";
import { ProfileNotificationPermission } from "@/Routes/Employer/Api/employer.route";

export default function UseProfilePermision(){
    return useQuery({
        queryKey: ['permission'],
        queryFn: ProfileNotificationPermission,
       staleTime:Infinity,
       refetchOnMount:false,
       refetchOnWindowFocus:false,
      });
}