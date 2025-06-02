'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { Badge } from '@/components/ui/badge';
import UseDashboardCardStats from '@/Routes/Employer/hooks/GET/Overview/GetOverviewCardStats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import { Dialog, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';
import OverviewStore from '@/store/EmployeeDashboard/dashboard/overview/overview.store';
import { Loader } from 'lucide-react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

export default function AdminDashboardHome() {
  const TITLE = ['ID', 'Name', 'Job Applied For', 'Applied On', 'Interview Status', 'Score', 'Action'];
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: interviewCardData,
    isLoading: cardLoading,
    error: cardError,
  } = UseDashboardCardStats();
  const {
    data: DashboardTableData,
    isLoading: tableLoading,
    error: tableError,
  } = UseGetAllInterview({ page: currentPage });

  const { selectedCandidate, isDialogOpen, setSelectedCandidate, setIsDialogOpen } =
    OverviewStore();

  // Add error logging
  if (cardError) {
    console.error('Card stats error:', cardError);
  }
  if (tableError) {
    console.error('Table data error:', tableError);
  }

  // Add loading states
  if (cardLoading || tableLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-[#f7941D]" />
      </div>
    );
  }

  // Add error states
  if (cardError || tableError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <p>Error loading dashboard data. Please try again later.</p>
          <p className="text-sm mt-2">{(cardError || tableError)?.message}</p>
        </div>
      </div>
    );
  }
  const DATA =
    DashboardTableData?.items?.map((item: any) => [
      item.id,
      item.candidate_name,
      item.job_title,
      new Date(item.created_at).toLocaleDateString(),

      item.status === 'reject' ? (
        <Badge
          key={`status-${item.status}`}
          className="capitalize bg-red-100 text-red-800"
        >
          {item.status}
        </Badge>
      ) : item.status === 'pending' ? (
        <Badge
          key={`status-${item.status}`}
          className="capitalize bg-yellow-100 text-[#f7941D]"
        >
          {item.status}
        </Badge>
      ) : (
        <Badge
          key={`status-${item.status}`}
          className="capitalize bg-green-100 text-green-800"
        >
          {item.status}
        </Badge>
      ),

      item.ai_score === null ? 0 : item.ai_score,
      <div key={`actions-${item.id}`} className="flex gap-2 items-center">
      <Eye
        onClick={() => {
          setSelectedCandidate(item);
          setIsDialogOpen(true);
        }}
        className="w-5 h-5 text-gray-600 cursor-pointer"
      />
    </div>,
    ]) || [];

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <UserProfile data={selectedCandidate} isSuperAdmin={true} />
          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>
      <div>
        <h1 className="text-[24px] font-[roboto] font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Open Job Listings"
            subheading={interviewCardData?.active_jobs}
            icon={<Users className="text-[#f7941D]" />}
          ></CardComponent>
          <CardComponent
            heading="Total Applicant"
            subheading={interviewCardData?.total_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>

          <CardComponent
            heading="Interviews Completed"
            subheading={interviewCardData?.completed_interviews}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
          <CardComponent
            heading="Shortlised Applicants"
            subheading={interviewCardData?.shortlisted_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
        </div>
        <div className="mt-10">
          <h1 className="font-[roboto] text-[24px] font-semibold leading-[30px] mb-4">
            {' '}
            Latest Interview
          </h1>
          <TableComponent
            header={TITLE}
            subheader={DATA}
            paginationstart={DashboardTableData?.current_page}
            paginationend={DashboardTableData?.pages}
            onPageChange={(page: number) => setCurrentPage(page)}
            isLoading={tableLoading}
          />
        </div>
      </div>
    </>
  );
}
