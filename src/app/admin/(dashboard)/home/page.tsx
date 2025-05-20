'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { Badge } from '@/components/ui/badge';
import UseDashboardCardStats from '@/Routes/Employer/hooks/GET/Overview/GetOverviewCardStats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import { Dialog, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';

export default function AdminDashboardHome() {
  const TITLE = [
    'Action',
    'Name',
    'Job Applied For',
    'Interview Date',
    'Interview Status',
    'Status',
    'AI Score',
  ];

  const { data: interviewCardData } = UseDashboardCardStats();
  const { data: DashboardTableData } = UseGetAllInterview();
  console.log('Interview Dashboard Table Data:', DashboardTableData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const DATA = [
    [
      <Eye
        onClick={() => setIsDialogOpen(true)}
        key={DashboardTableData?.id}
        className="w-5 h-5 text-gray-600 cursor-pointer"
      />,
      DashboardTableData?.candidate_name,
      DashboardTableData?.job_title,
      DashboardTableData?.created_at,
      <Badge key={'status'} className="bg-green-100 text-green-800">
        {DashboardTableData?.status}
      </Badge>,
      '81%',
    ],
  ];

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <UserProfile />
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
            subheading={interviewCardData?.total_applicants}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>

          <CardComponent
            heading="Interviews Completed"
            subheading={interviewCardData?.total_interviews}
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
            paginationend={DashboardTableData?.total}
          />
        </div>
      </div>
    </>
  );
}
