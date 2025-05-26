import { CandidateCardStats } from '@/Routes/Employer/Api/employer.route';
import { useQuery } from '@tanstack/react-query';

export default function UseDashboardCandidateCardStats() {
  return useQuery({
    queryKey: ['candidatestats'],
    queryFn: CandidateCardStats,
    refetchOnWindowFocus: true,
  });
}
