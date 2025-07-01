import { useQuery } from '@tanstack/react-query';
import { GetSuperAdminProfile } from '../../Api/admin.route';

interface UseProfileSuperAdminOptions {
  enabled?: boolean;
}

const UseProfileSuperAdmin = (options?: UseProfileSuperAdminOptions) => {
  return useQuery({
    queryKey: ['adminProfile'],
    queryFn: GetSuperAdminProfile,
    enabled: options?.enabled ?? true,
  });
};

export default UseProfileSuperAdmin; 