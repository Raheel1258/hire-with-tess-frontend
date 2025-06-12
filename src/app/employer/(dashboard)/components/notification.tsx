'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useGetSuperAdminNotification } from '@/Routes/Admin/hook/GET/notification/GetNotification.hook';
import useSuperAdminUnreadNotifications from '@/Routes/Admin/hook/GET/notification/unreadnotification';
import UseAdminNotification from '@/Routes/Employer/hooks/GET/Notification/GetNotificationhook';
import useAdminUnreadNotifications from '@/Routes/Employer/hooks/PUT/notification/UnreadNotification';
import {
  NotificationItem,
  NotificationProps,
} from '@/Types/EmployerDashboard/Dashboard/Notification/notification.type';
import getNotificationTitle from '@/Utils/helper/notification';
import TimeFormat from '@/Utils/helper/timeformat';
import { getAuthRole } from '@/Utils/Providers/auth';
import { BellIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

export default function CustomNotification() {
  const role = getAuthRole();
  const previousNotificationsRef = useRef<NotificationItem[]>([]);

  const isAdmin = role === 'admin';
  const isSuperAdmin = role === 'superadmin';

  const { data: superAdminUnreadNotification, refetch: refetchSuperAdminUnread } =
    useSuperAdminUnreadNotifications({
      enabled: isSuperAdmin,
    });

  const { data: adminUnreadNotification, refetch: refetchAdminUnread } =
    useAdminUnreadNotifications({
      enabled: isAdmin,
    });

  const { data: adminnotification, refetch: refetchAdmin } = UseAdminNotification({
    enabled: isAdmin,
  });

  const { data: superadminnotification, refetch: refetchSuperAdmin } =
    useGetSuperAdminNotification({
      enabled: isSuperAdmin,
    });
  console.log('SuperAdmin Notification', superadminnotification);
  const adminData = adminnotification?.items || [];
  const superadminData = superadminnotification?.items || [];
  const combinedNotifications = isAdmin ? adminData : isSuperAdmin ? superadminData : [];

  const notifications: NotificationProps[] = combinedNotifications.map(
    (item: NotificationItem) => ({
      id: item.id,
      title: getNotificationTitle(item.notification_type),
      subtitle: item.message,
      time: TimeFormat(item.created_at),
      isRead: item.read,
      type: item.notification_type,
    }),
  );

  useEffect(() => {
    const checkNewNotifications = () => {
      const currentNotifications = combinedNotifications;
      const previousNotifications = previousNotificationsRef.current;

      const newNotifications = currentNotifications.filter(
        (current: NotificationItem) =>
          !previousNotifications.some((prev: NotificationItem) => prev.id === current.id),
      );

      newNotifications.forEach((notification: NotificationItem) => {
        toast(getNotificationTitle(notification.notification_type), {
          description: `${notification.message} • ${TimeFormat(notification.created_at)}`,
          duration: 6000,
          position: 'bottom-right',
          className:
            'bg-white text-gray-800 border border-gray-200 shadow-md rounded-md px-4 py-3',
          icon: <BellIcon className="text-[#f7941D]" />,
        });
      });

      previousNotificationsRef.current = currentNotifications;
    };

    checkNewNotifications();

    const intervalId = setInterval(() => {
      if (isAdmin) {
        refetchAdmin();
        refetchAdminUnread();
      } else if (isSuperAdmin) {
        refetchSuperAdmin();
        refetchSuperAdminUnread();
      }
      checkNewNotifications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [combinedNotifications, isAdmin, isSuperAdmin]);

  const unreadFlag = isAdmin
    ? adminUnreadNotification?.items?.flag === 1
    : isSuperAdmin
      ? superAdminUnreadNotification?.items?.flag === 1
      : false;

  const hasUnreadNotifications = notifications.some((n) => !n.isRead);
  const hasNotifications = hasUnreadNotifications || unreadFlag;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-[#A2A1A81A] w-[50px] h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#A2A1A82A] transition-colors relative">
          <BellIcon className="w-5 h-5 text-gray-600" />

          {hasNotifications && (
            <div className="absolute -top-1 -right-1">
              <div className="relative flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#f7941D] px-1 text-xs font-medium text-white border-2 border-white z-10">
                {unreadCount > 99 ? '99+' : unreadCount}
                {/* Animated ring behind the badge */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f7941D] opacity-75 z-0"></span>
              </div>
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Notifications
            {hasNotifications && (
              <Badge variant="secondary" className="ml-2">
                New
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          <div className="space-y-1">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                      !notification.isRead
                        ? 'border-l-4 border-[#f7941D] bg-orange-50 text-[#1f1f1f]'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`text-sm font-medium ${!notification.isRead ? 'font-semibold' : ''}`}
                          >
                            {notification.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize bg-green-100 text-green-800"
                          >
                            {notification.type.replace('_', ' ').toLowerCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.subtitle}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
