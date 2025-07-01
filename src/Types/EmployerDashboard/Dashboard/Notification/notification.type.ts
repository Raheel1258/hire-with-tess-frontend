export interface NotificationProps {
    id: string;
    title: string;
    subtitle: string;
    time: string;
    isRead: boolean;
    type: string;
    notification_type: string;
    message: string;
    created_at: string;
    read: boolean;
    items: NotificationItem[];
  }
  
  export interface NotificationItem {
    id: string;
    notification_type: string;
    message: string;
    created_at: string;
    read: boolean;
  }