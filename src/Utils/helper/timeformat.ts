export interface NotificationItem {
    id: string;
    notification_type: string;
    message: string;
    created_at: string;
    read: boolean;
  }

  export default function TimeFormat(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
  
    if (isNaN(date.getTime())) return "Invalid date";
  
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute(s) ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour(s) ago`;
    return `${Math.floor(diffInSeconds / 86400)} day(s) ago`;
  }
  