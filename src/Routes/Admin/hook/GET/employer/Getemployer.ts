import { useQuery } from "@tanstack/react-query";
import { GetEmployers } from "@/Routes/Admin/Api/admin.route";
import { EmployersResponse } from "@/Types/Admin/employer";

interface UseGetEmployersProps {
  page?: number;
  limit?: number;
}

export const useGetEmployers = ({ page = 1, limit = 10 }: UseGetEmployersProps) => {
  return useQuery<EmployersResponse>({
    queryKey: ["employers", page, limit],
    queryFn: () => GetEmployers(page, limit),
  });
}; 