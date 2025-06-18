'use client';
import {  Copy, BriefcaseBusiness, Users } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import Searchbar from '@/app/employer/(dashboard)/components/searchbar';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/jobposting/GetAllJobs.hook';
import UseDeleteJobByID from '@/Routes/Employer/hooks/DELETE/DeleteJobById.hook';
import UseUpdateJobStatus from '@/Routes/Employer/hooks/PUT/job/UpdateJobStatus.hook';
import JobStore from '@/store/EmployeeDashboard/dashboard/job-posting/job.store';
import postedJobProps from '@/Types/EmployerDashboard/Dashboard/Job/podtedjob.type';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import JobpProfile from '@/app/employer/(dashboard)/components/postedjobdialogue';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import UseDashboardCardStats from '@/Routes/Employer/hooks/GET/Overview/GetOverviewCardStats.hook';
import { useState } from 'react';
import StatusBadge from '@/app/employer/(dashboard)/components/status.badge';
import CustomJobDetailDialogue from '@/app/employer/(dashboard)/components/jobdetaildialogue';
import OverviewStore from '@/store/EmployeeDashboard/dashboard/overview/overview.store';
import UseGETJobBYID from '@/Routes/Employer/hooks/GET/candidates/GetJobByID.hook';

export default function AdminJobPosting() {
  const TITLE = [
    'ID',
    'Job Title',
    'Organization',
    'Status',
    'Shortlisted',
    'Shortlisted(%)',
    'Job Type',
    'Job Posted Date',
    'Interview Link',
    'Total Interviews',

  ];
  const {
    isDialogOpen,
    setIsDialogOpen,
    postedjobdata,
    setpostedjobdata,
    searchTerm,
    setSearchTerm,
  } = JobStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: jobdata } = UseDashboardCardStats();
  const { data: JobPostedTableData, isLoading: tableLoading } = UseGetAllJob({ page: currentPage });
  const deleteJobMutation = UseDeleteJobByID();
  const updatejobstatus = UseUpdateJobStatus();
  const { data: jobDetails } = UseGETJobBYID(postedjobdata.id);


 
  const { selectedCandidate, setSelectedCandidate } =
    OverviewStore();

  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);

  const filteredJobs = JobPostedTableData?.items?.filter((item: { job_title: string }) =>
    item?.job_title?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const handleCopyLink = (link: string | undefined) => {
    if (!link) {
      toast.error('No link available to copy');
      return;
    }
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  const DATA =
    (filteredJobs ?? []).map((item: postedJobProps) => [
      item?.id,
      item?.job_title,
      item?.company_name,
      <StatusBadge status={item.status} key={`status-${item.id}`} />,
      item?.shortlisted_stats?.shortlisted,
      item?.shortlisted_stats?.shortlist_ratio,
      item?.job_type,
      new Date(item.created_at).toLocaleDateString(),

      item?.interview_link ? (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => handleCopyLink(item.interview_link)}
        >
          <Copy className="w-4 h-4" />
          <span>Copy Link</span>
        </Button>
      ) : (
        'No link available'
      ),
      <Button
      variant="ghost"
      size="sm"
      className="w-10 flex items-center gap-2 bg-green-100 border-2 border-green-400"
      key={item.id}
      onClick={() => {
        setSelectedCandidate(item.id);
        setIsInterviewDialogOpen(true); 
      }}
    >
      <span>{item.total_interviews}</span>
    </Button>,
    
    ]) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const deleteJob = async (rowIndex: number) => {
    if (!filteredJobs || filteredJobs.length === 0) {
      toast.error('No jobs available to delete');
      return;
    }
    if (rowIndex < 0 || rowIndex >= filteredJobs.length) {
      toast.error('Invalid job index');
      return;
    }

    const job = filteredJobs[rowIndex];

    if (!job || !job.id) {
      toast.error('Invalid job data');
      return;
    }

    const jobIds = filteredJobs?.map((item: { id: string }) => item.id) ?? [];
    const jobId = jobIds[rowIndex];

    deleteJobMutation.mutate(jobId);
  };

  const handleViewJob = (rowIndex: number) => {
    const selectedJob = filteredJobs?.[rowIndex];
    if (selectedJob) {
      setpostedjobdata(selectedJob);
      setIsDialogOpen(true);
    }
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Posted Job Details</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <JobpProfile data={jobDetails} />
          <DialogClose asChild />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isInterviewDialogOpen} onOpenChange={setIsInterviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
          </DialogHeader>
          <DialogTitle>Interview Details</DialogTitle>
          {selectedCandidate && (
            <CustomJobDetailDialogue 
              jobId={selectedCandidate}
              isOpen={isInterviewDialogOpen}
              onClose={() => {
                setIsInterviewDialogOpen(false);
                setSelectedCandidate(''); 
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <div>
        <h1 className="text-[24px] font-[roboto] font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Open Job Listings"
            subheading={jobdata?.active_jobs}
            icon={<Users className="text-[#f7941D]" />}
          ></CardComponent>
          <CardComponent
            heading="Total Applicant"
            subheading={jobdata?.total_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>

          <CardComponent
            heading="Interviews Completed"
            subheading={jobdata?.completed_interviews}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
          <CardComponent
            heading="Shortlised Applicants"
            subheading={jobdata?.shortlisted_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
        </div>
        <h1 className="font-[roboto] mt-2 text-[24px] font-semibold leading-[30px] mb-4">
          Job Posting
        </h1>
        <Searchbar value={searchTerm} onChange={handleSearchChange} />
        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={JobPostedTableData?.current_page}
          paginationend={JobPostedTableData?.pages}
          onPageChange={(page: number) => setCurrentPage(page)}
          onDelete={deleteJob}
          showTrashIcon={true}
          showEyeIcon={true}
          onView={handleViewJob} 
          isLoading={tableLoading}
        />
      </div>
    </>
  );
}
