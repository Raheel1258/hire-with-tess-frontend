import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface BreadcrumbProps {
    DashboardTitle:string,
    ProfileTitle:string,
    PageTitle:string,
    DashboardUrl:string,
    ProfileUrl:string,
      
}

export default function RedirectToDashboard({DashboardTitle,DashboardUrl,ProfileTitle,ProfileUrl,PageTitle}:BreadcrumbProps){
   return(
   <Breadcrumb>
        <BreadcrumbList className="flex-wrap gap-1">
            <BreadcrumbItem>
                <BreadcrumbLink href={DashboardUrl}>{DashboardTitle}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink href={ProfileUrl}>{ProfileTitle}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{PageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
   );
}