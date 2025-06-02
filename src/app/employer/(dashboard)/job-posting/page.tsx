'use client';
import { BriefcaseBusiness, Copy, Eye, Users } from 'lucide-react';
import CardComponent from '../components/card';
import TableComponent from '../components/table';
import Searchbar from '../components/searchbar';
import UseDashboardJobCardStats from '@/Routes/Employer/hooks/GET/jobposting/GetJobCardstats.hook';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/jobposting/GetAllJobs.hook';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import JobPostingTableTitle from '@/app/employer/(dashboard)/Constant/jobposting';
import UseDeleteJobByID from '@/Routes/Employer/hooks/DELETE/DeleteJobById.hook';
import JobpProfile from '../components/postedjobdialogue';
import { DropDownCustomStatus } from '../components/statusfeature';
import UseUpdateJobStatus from '@/Routes/Employer/hooks/PUT/job/UpdateJobStatus.hook';
import postedJobProps from '@/Types/EmployerDashboard/Dashboard/Job/podtedjob.type';
import JobStore from '@/store/EmployeeDashboard/dashboard/job-posting/job.store';
import UseGetFilteredJob from '@/Routes/Employer/hooks/GET/jobposting/GetFilterJob.hook';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import handleCopyLink from '@/Utils/helper/copylink';

export default function JobPosting() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: jobdata } = UseDashboardJobCardStats();
  const { data: JobPostedTableData } = UseGetAllJob({ page: currentPage });
  const deleteJobMutation = UseDeleteJobByID();
  const updatejobstatus = UseUpdateJobStatus();
  // const { data: FilteredJobData } = UseGetFilteredJob({});

  const {
    isDialogOpen,
    setIsDialogOpen,
    postedjobdata,
    setpostedjobdata,
    searchTerm,
    setSearchTerm,
  } = JobStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = JobPostedTableData?.items?.filter((item: { job_title: string }) =>
    item.job_title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const deleteJob = (rowIndex: number) => {
    const jobIds = filteredJobs?.map((item: { id: string }) => item.id) ?? [];
    const jobId = jobIds[rowIndex];
    deleteJobMutation.mutate(jobId);
  };

  const DATA = (filteredJobs ?? []).map((item: postedJobProps) => [
    item?.id,
    item?.job_title,
    <DropDownCustomStatus
      key={item.status}
      Status={item?.status}
      updateStatus={(newStatus) =>
        updatejobstatus.mutate({
          job_id: item.id,
          status: newStatus,
        })
      }
    />,
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
  ]);
  
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
          <JobpProfile data={postedjobdata} />
          <DialogClose asChild />
        </DialogContent>
      </Dialog>

      <div>
        <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Total Job"
            subheading={jobdata?.total_jobs}
            icon={<Users color="#f7941D" size={20} strokeWidth={1.5} />}
          />
          <CardComponent
            heading="New Job"
            subheading={jobdata?.active_jobs}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          />
          <CardComponent
            heading="Close Job"
            subheading={jobdata?.closed_jobs}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          />
          <CardComponent
            heading="Total Candidates"
            subheading={jobdata?.total_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          />
        </div>

        <div className="mt-10">
          <h1 className="font-roboto text-2xl font-bold leading-[30px] mb-4">Jobs</h1>
          <Searchbar value={searchTerm} onChange={handleSearchChange} />
          <TableComponent
            header={JobPostingTableTitle}
            subheader={DATA}
            paginationstart={JobPostedTableData?.current_page}
            paginationend={JobPostedTableData?.total}
            onPageChange={(page: number) => setCurrentPage(page)}
            showTrashIcon
            onDelete={deleteJob}
            showEyeIcon={true}
            onView={handleViewJob} 
          />
        </div>
      </div>
    </>
  );
}
