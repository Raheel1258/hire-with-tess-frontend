'use client';
import { Eye } from 'lucide-react';
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
import UseDashboardJobCardStats from '@/Routes/Employer/hooks/GET/jobposting/GetJobCardstats.hook';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/jobposting/GetAllJobs.hook';
import UseDeleteJobByID from '@/Routes/Employer/hooks/DELETE/DeleteJobById.hook';
import UseUpdateJobStatus from '@/Routes/Employer/hooks/PUT/job/UpdateJobStatus.hook';
import JobStore from '@/store/EmployeeDashboard/dashboard/job-posting/job.store';
import postedJobProps from '@/Types/EmployerDashboard/Dashboard/Job/podtedjob.type';
import { DropDownCustomStatus } from '@/app/employer/(dashboard)/components/statusfeature';
import JobpProfile from '@/app/employer/(dashboard)/components/postedjobdialogue';

export default function AdminJobPosting() {
  const TITLE = [
    'Action',
    'Jobs',
    'Status',
    'Shortlisted',
    'Shortlisted Rate (%)',
    'Job Type',
    'Job Posted Date',
    'Job Expiry Date',
  ];
  const { data: jobdata } = UseDashboardJobCardStats();
  const { data: JobPostedTableData } = UseGetAllJob();
  const deleteJobMutation = UseDeleteJobByID();
  const updatejobstatus = UseUpdateJobStatus();
  const {
    isDialogOpen,
    setIsDialogOpen,
    postedjobdata,
    setpostedjobdata,
    searchTerm,
    setSearchTerm,
  } = JobStore();

  const filteredJobs = JobPostedTableData?.items?.filter((item: { job_title: string }) =>
    item?.job_title?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const DATA =
    (filteredJobs ?? []).map((item: postedJobProps) => [
      <Eye
        onClick={() => {
          setpostedjobdata(item);
          setIsDialogOpen(true);
        }}
        key={item.id}
        className="w-5 h-5 text-gray-600 cursor-pointer"
      />,
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
      item?.expiry_date,
    ]) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const deleteJob = (rowIndex: number) => {
    const jobIds = filteredJobs?.map((item: { id: string }) => item.id) ?? [];
    const jobId = jobIds[rowIndex];
    deleteJobMutation.mutate(jobId);
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
        <h1 className="font-[roboto] text-[24px] font-semibold leading-[30px] mb-4">
          {' '}
          Job Posting
        </h1>
        <Searchbar value={searchTerm} onChange={handleSearchChange} />
        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={JobPostedTableData?.current_page}
          paginationend={JobPostedTableData?.total}
          // onDelete={deleteJob}
          // showTrashIcon={true}
        />
      </div>
    </>
  );
}
