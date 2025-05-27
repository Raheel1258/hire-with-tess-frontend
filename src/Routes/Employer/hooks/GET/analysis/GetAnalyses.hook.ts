import { useQuery } from '@tanstack/react-query';
import { getAnalyses } from '../../../Api/employer.route';
import { AnalysisResponse } from '../../../../../Types/Admin/analysis';

export default function useAnalyses() {
  return useQuery<AnalysisResponse>({
    queryKey: ['analyses'],
    queryFn: getAnalyses,
    refetchOnWindowFocus: true,
    refetchInterval: 90000,
    refetchIntervalInBackground: false,
  });
} 