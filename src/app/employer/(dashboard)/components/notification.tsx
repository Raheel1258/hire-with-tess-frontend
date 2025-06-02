import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UseAdminNotification from "@/Routes/Employer/hooks/GET/Notification/GetNotificationhook";
import { getAuthRole } from "@/Utils/Providers/auth";
import { BellIcon } from "lucide-react";

export default function CustomNotification(){
    const { data: adminnotification } = UseAdminNotification({
        enabled: getAuthRole() === "admin",
    })
    console.log(adminnotification);
      // Extract notifications from the API response structure
  const notificationsData = adminnotification?.items || []

  // Function to format the created_at timestamp
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  // Function to get notification title based on type
  const getNotificationTitle = (notificationType: string) => {
    switch (notificationType) {
      case "INTERVIEW_SUBMITTED":
        return "Interview Submitted"
      case "APPLICATION_RECEIVED":
        return "New Application"
      case "PROFILE_UPDATED":
        return "Profile Updated"
      default:
        return "Notification"
    }
  }

  // Use actual data from API
  const notifications = notificationsData.map((item: any) => ({
    id: item.id,
    title: getNotificationTitle(item.notification_type),
    subtitle: item.message,
    time: formatTimeAgo(item.created_at),
    isRead: false, // You can add a read status field to your API if needed
    type: item.notification_type,
  }))

  // Count unread notifications (assuming all are unread for now)
  const unreadCount = notifications.length
    return(
        <Sheet>
        <SheetTrigger asChild>
          <div className="bg-[#A2A1A81A] w-[50px] h-12 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#A2A1A82A] transition-colors relative">
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-6">
            <div className="space-y-1">
              {notifications.length > 0 ? (
                notifications.map((notification:any, index:number) => (
                  <div key={notification.id}>
                    <div
                      className={`p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        !notification.isRead ? "border-l-4 border-2-green-100 capitalize text-[#f7941D] " : ""
                      }`
                    }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h4>
                            <Badge variant="outline" className="text-xs capitalize bg-green-100 text-green-800 ">
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
    )
}