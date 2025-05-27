import { useMutation } from "@tanstack/react-query";
import { UpdateProfile } from "@/Routes/Employer/Api/employer.route"
import { toast } from "sonner";

export default function UseUpdateProfileHook(){
    return useMutation({
        mutationFn: UpdateProfile,
        onSuccess: () => {
            toast.success('Profile updated successfully');
        },
        onError: () => {
            toast.error('Failed to update profile');
        }
    })
}
