import { useMutation } from '@tanstack/react-query';
import { DeleteUser } from '@/Routes/Admin/Api/admin.route';
import { toast } from 'sonner';

export default function UseDeleteUser() {
  return useMutation({
    mutationFn: DeleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error('Unable to delete User');
      console.log(error);
    },
  });
}
