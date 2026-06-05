"use client"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UseProfileInfo from "@/Routes/Employer/hooks/GET/profile/Profileinfo.hook"
import UseProfileSuperAdmin from "@/Routes/Admin/hook/GET/Profileinfo.hook"
import { getAuthRole } from "@/Utils/Providers/auth"
import CustomNotification from "@/app/employer/(dashboard)/components/notification"

export default function Header() {
  const router = useRouter()
  const { data: profileInfo } = UseProfileInfo()
  const { data: superAdminInfo } = UseProfileSuperAdmin({
    enabled: getAuthRole() === "superadmin",
  })

  const handleNavigation = () => {
    if (getAuthRole() === "superadmin") {
      router.push("/admin/profile/account-details")
    } else {
      router.push("/employer/profile/account-details")
    }
  }

  const organizationName = getAuthRole() === "superadmin" ? superAdminInfo?.organization_name : profileInfo?.organization_name
  const firstName = getAuthRole() === "superadmin" ? superAdminInfo?.first_name : profileInfo?.first_name
  const imageUrl = getAuthRole() === "superadmin" ? superAdminInfo?.image_url : profileInfo?.image_url


  return (
    <div className="bg-white flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-8 px-4 py-4 sm:p-6">
      <div className="font-[Space Grotesk] text-base sm:text-xl font-medium truncate max-w-[45vw] sm:max-w-none min-w-0">
        {organizationName}
      </div>
      <div className="flex gap-2 items-center shrink-0">
        <CustomNotification/>
        <div
          onClick={handleNavigation}
          className="flex w-[160px] sm:w-[184px] h-[44px] sm:h-[50px] border rounded-lg items-center cursor-pointer hover:bg-gray-100 transition shrink-0"
        >
          <div className="p-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>
                {getAuthRole() === "superadmin" ? superAdminInfo?.firstname : profileInfo?.firstname || "IN"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="pl-2">
            <h1 className="font-normal text-sm truncate max-w-[100px]">{firstName}</h1>
            <p className="text-sm text-[#A2A1A8]">{getAuthRole() === "superadmin" ? "Super Admin" : "Employer"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
