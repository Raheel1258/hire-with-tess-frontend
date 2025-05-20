import { useQuery } from '@tanstack/react-query';
import { FilterInterview } from '../../../Api/employer.route';

export default function UseFilterInterview () {
  return useQuery({
    queryKey: ['filteredinterview'],
    queryFn: FilterInterview,
  });
  
}
