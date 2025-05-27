'use client';
import { BriefcaseBusiness, Eye, Loader, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { Badge } from '@/components/ui/badge';
import UseDashboardCandidateCardStats from '@/Routes/Employer/hooks/GET/candidates/GetCandidateCardstats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import OverviewStore from '@/store/EmployeeDashboard/dashboard/overview/overview.store';
import { Dialog, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';

export default function AdminCandidatePage() {
  const TITLE = ['Action', 'Name', 'Job Applied For', 'Created At', 'Status', 'Score'];

  const { data: DashboardTableData } = UseGetAllInterview();
  const { data: candidatestats } = UseDashboardCandidateCardStats();

  const {
    selectedCandidate,
    isDialogOpen,
    setSelectedCandidate,
    setIsDialogOpen,
  } = OverviewStore();

  const DATA =
    DashboardTableData?.items?.map((item: any) => [
      <div key={`actions-${item.id}`} className="flex gap-2 items-center">
        <Eye
          onClick={() => {
            setSelectedCandidate(item);
            setIsDialogOpen(true);
          }}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      </div>,
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
        <h1 className="text-[24px] font-[open sans] font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Total Candidates"
            subheading={candidatestats?.total_candidates}
            icon={<Users className="text-[#f7941D]" />}
          ></CardComponent>
          <CardComponent
            heading="New Candidates"
            subheading={candidatestats?.pending}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>

          <CardComponent
            heading="Shortlisted Candidates"
            subheading={candidatestats?.shortlisted}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
          <CardComponent
            heading="Rejected Candidates"
            subheading={candidatestats?.rejected}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
        </div>
        <div className="mt-10">
          <h1 className="font-[roboto] text-[24px] font-bold leading-[30px] mb-4">
            {' '}
            Candidates
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
