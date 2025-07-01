import { useQuery } from "@tanstack/react-query";
import { SuperAdminMonthlyJobStats } from "../../../Api/admin.route";

interface UseSuperAdminAnalyticsOptions {
  enabled?: boolean;
}

export default function useSuperAdminAnalytics(options?: UseSuperAdminAnalyticsOptions) {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: SuperAdminMonthlyJobStats,
    enabled: options?.enabled ?? true,
  });
}
