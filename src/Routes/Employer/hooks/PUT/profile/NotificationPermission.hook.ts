import { UpdateNotificationType } from "@/Routes/Employer/Api/employer.route";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function UseUpdateNotificationPermission() {
    return useMutation({
      mutationFn: ({
        notification_type,
        enabled,
      }: {
        notification_type: string;
        enabled: boolean;
      }) => UpdateNotificationType(notification_type, { enabled }),
      onSuccess: () => {
        toast.success("Notification permission updated successfully");
      },
      onError: () => {
        toast.error("Failed to update notification permission");
      },
    });
  }
  