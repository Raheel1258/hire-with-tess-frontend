export interface NotificationItem {
    id: string;
    notification_type: string;
    message: string;
    created_at: string;
    read: boolean;
  }

export default function getNotificationTitle(type: string): string {
    switch (type) {
      case "NEW_ADMIN_SIGNUP": return "New Admin Signup";
      case "INTERVIEW_SUBMITTED": return "Interview Submitted";
      case "APPLICATION_RECEIVED": return "New Application";
      case "PROFILE_UPDATED": return "Profile Updated";
      default: return "Notification";
    }
  };
