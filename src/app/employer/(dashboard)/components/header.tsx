"use client"

import { useRouter } from "next/navigation"

import { Menu } from "lucide-react"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import CustomNotification from "@/app/employer/(dashboard)/components/notification"

import { cn } from "@/lib/utils"

import { useHeaderProfile } from "@/hooks/useHeaderProfile"



interface HeaderProps {

  onMobileMenuOpen?: () => void

  /** Match when the layout sidebar is hidden — profile uses md, dashboard uses lg */

  mobileMenuBreakpoint?: "md" | "lg"

}



export default function Header({

  onMobileMenuOpen,

  mobileMenuBreakpoint = "lg",

}: HeaderProps) {

  const router = useRouter()

  const { role, organizationName, firstName, imageUrl, isLoading } = useHeaderProfile()



  const handleNavigation = () => {

    if (role === "superadmin") {

      router.push("/admin/profile/account-details")

    } else {

      router.push("/employer/profile/account-details")

    }

  }



  const roleLabel = role === "superadmin" ? "Super Admin" : "Employer"

  const avatarFallback = firstName?.slice(0, 1).toUpperCase() || "U"



  return (

    <div className="bg-white flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-8 px-4 py-4">

      <div className="flex items-center gap-2 min-w-0 flex-1">

        {onMobileMenuOpen && (

          <Button

            type="button"

            variant="outline"

            size="icon"

            className={cn(

              "shrink-0",

              mobileMenuBreakpoint === "md" ? "md:hidden" : "lg:hidden",

            )}

            onClick={onMobileMenuOpen}

            aria-label="Open navigation menu"

          >

            <Menu className="h-5 w-5" />

          </Button>

        )}

        <div

          className="min-w-0 flex-1 text-base font-medium leading-snug text-[#1B2559] sm:text-xl"

          title={organizationName || undefined}

        >

          {isLoading ? (

            <span className="inline-block h-6 w-32 animate-pulse rounded bg-slate-200 sm:w-48" />

          ) : (

            organizationName || "Organization"

          )}

        </div>

      </div>

      <div className="flex gap-2 items-center shrink-0">

        <CustomNotification/>

        <div

          onClick={handleNavigation}

          className="flex w-[160px] sm:w-[184px] h-[44px] sm:h-[50px] border rounded-lg items-center cursor-pointer hover:bg-gray-100 transition shrink-0"

        >

          <div className="p-2">

            <Avatar className="w-10 h-10">

              <AvatarImage src={imageUrl || undefined} alt={firstName || "User profile"} />

              <AvatarFallback>{avatarFallback}</AvatarFallback>

            </Avatar>

          </div>

          <div className="pl-2 min-w-0">

            <h1 className="font-normal text-sm truncate max-w-[100px]">{firstName || "User"}</h1>

            <p className="text-sm text-[#A2A1A8]">{roleLabel}</p>

          </div>

        </div>

      </div>

    </div>

  )

}

