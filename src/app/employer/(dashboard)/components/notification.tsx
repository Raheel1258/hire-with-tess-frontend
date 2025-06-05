'use client'

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetSuperAdminNotification } from "@/Routes/Admin/hook/GET/notification/GetNotification.hook";
import useSuperAdminUnreadNotifications from "@/Routes/Admin/hook/GET/notification/unreadnotification";
import UseAdminNotification from "@/Routes/Employer/hooks/GET/Notification/GetNotificationhook";
import useAdminUnreadNotifications from "@/Routes/Employer/hooks/PUT/notification/UnreadNotification";
import { NotificationItem, NotificationProps } from "@/Types/EmployerDashboard/Dashboard/Notification/notification.type";
import getNotificationTitle from "@/Utils/helper/notification";
import TimeFormat from "@/Utils/helper/timeformat";

import { getAuthRole } from "@/Utils/Providers/auth";
import { BellIcon } from "lucide-react";


export default function CustomNotification() {
  const role = getAuthRole(); 
  const { data: superAdminUnreadNotification } = useSuperAdminUnreadNotifications({
    enabled: role === "superadmin",
  });
  console.log("superAdminUnreadNotification",superAdminUnreadNotification)
  const { data: adminUnreadNotification } = useAdminUnreadNotifications({
    enabled: role === "admin",
  });


  const { data: adminnotification } = UseAdminNotification({
    enabled: role === "admin",
  });

  const { data: superadminnotification } = useGetSuperAdminNotification({
    enabled: role === "superadmin",
  });


  const adminData = adminnotification?.items || [];
  const superadminData = superadminnotification?.items || [];
  const adminUnreadNotificationData = adminUnreadNotification?.items || [];
  const superAdminUnreadNotificationData = superAdminUnreadNotification?.items || [];

  const combinedNotifications = role === "admin" ? adminData : role === "superadmin" ? superadminData : [];


  const notifications: NotificationProps[] = combinedNotifications.map((item: NotificationItem) => ({
    id: item.id,
    title: getNotificationTitle(item.notification_type),
    subtitle: item.message,
    time: TimeFormat(item.created_at),
    isRead: item.read,
    type: item.notification_type,
  }));

  const hasNotifications = role === "admin" 
    ? adminUnreadNotificationData.flag === 1 
    : role === "superadmin" 
      ? superAdminUnreadNotificationData.flag === 1 
      : false;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-[#A2A1A81A] w-[50px] h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#A2A1A82A] transition-colors relative">
          <BellIcon className={`w-5 h-5 ${hasNotifications ? 'text-[#f7941D]' : ''}`} />
          {hasNotifications && (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#f7941D] rounded-full" />
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
              notifications.map((notification,index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      !notification.isRead ? "border-l-4 border-2-green-100 capitalize text-[#f7941D]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize bg-green-100 text-green-800"
                          >
                            {notification.type.replace("_", " ").toLowerCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.subtitle}</p>
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
