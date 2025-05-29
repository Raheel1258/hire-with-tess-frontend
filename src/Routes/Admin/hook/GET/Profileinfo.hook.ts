import { useQuery } from '@tanstack/react-query';
import { GetSuperAdminProfile } from '../../Api/admin.route';

const UseProfileInfo = () => {
  return useQuery({
    queryKey: ['adminProfile'],
    queryFn: GetSuperAdminProfile,
  });
};

export default UseProfileInfo; 