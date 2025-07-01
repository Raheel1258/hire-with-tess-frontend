import { useQuery } from "@tanstack/react-query";
import { GetSuperAdminNotification } from "@/Routes/Admin/Api/admin.route";

interface SuperAdminOptions {
    enabled?: boolean;
  }
export const useGetSuperAdminNotification = (options?: SuperAdminOptions) => {
  return useQuery({
    queryKey: ["superadmin-notification"],
    queryFn: GetSuperAdminNotification,
    enabled: options?.enabled ?? true,
  });
};


