'use client';
import { Copy, BriefcaseBusiness, Users } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import DeleteJobDialogue from '@/app/employer/(dashboard)/components/deletejobdialogue';

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
  const { data: JobPostedTableData, isLoading: tableLoading } = UseGetAllJob({
    page: currentPage,
  });
  const deleteJobMutation = UseDeleteJobByID();
  const updatejobstatus = UseUpdateJobStatus();
  const { data: jobDetails } = UseGETJobBYID(postedjobdata.id);

  const { selectedCandidate, setSelectedCandidate } = OverviewStore();

  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{ id: string; title: string } | null>(null);

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
      <div key={`job-title-${item.id}`} className="truncate">
        {item?.job_title}
      </div>,
      <div key={`company-name-${item.id}`} className="truncate">
        {item?.company_name ? (
          item?.company_name
        ) : (
          <StatusBadge
            className="text-red-500 bg-red-100 text-center"
            status={'Not Provided'}
          />
        )}
      </div>,
      <StatusBadge status={item.status} key={`status-${item.id}`} />,
      <div key={`shortlisted-${item.id}`} className="text-center">
        {item?.shortlisted_stats?.shortlisted}
      </div>,
      <div key={`shortlisted-ratio-${item.id}`} className="text-center">
        {item?.shortlisted_stats?.shortlist_ratio}
      </div>,
      <div key={`job-type-${item.id}`} className="truncate">
        {item?.job_type ? (
          item?.job_type
        ) : (
          <StatusBadge
            className="text-red-500 bg-red-100 text-center"
            status={'Not Provided'}
          />
        )}
      </div>,
      <div key={`job-posted-date-${item.id}`} className="text-center">
        {new Date(item.created_at).toLocaleDateString()}
      </div>,

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

  const requestDeleteJob = (rowIndex: number) => {
    if (!filteredJobs || filteredJobs.length === 0) {
      toast.error('No jobs available to delete');
      return;
    }
    if (rowIndex < 0 || rowIndex >= filteredJobs.length) {
      toast.error('Invalid job index');
      return;
    }

    const job = filteredJobs[rowIndex];

    if (!job?.id) {
      toast.error('Invalid job data');
      return;
    }

    setJobToDelete({ id: job.id, title: job.job_title });
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteJob = () => {
    if (!jobToDelete) return;

    deleteJobMutation.mutate(jobToDelete.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setJobToDelete(null);
      },
    });
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
        <DialogContent className="flex w-[calc(100vw-2rem)] max-h-[90vh] max-w-lg flex-col gap-0 overflow-hidden rounded-2xl border-0 p-0 shadow-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4 pr-12 sm:px-6">
            <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900">
              Posted Job Details
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            <JobpProfile data={jobDetails} />
          </div>
          <DialogClose asChild />
        </DialogContent>
      </Dialog>

      <Dialog open={isInterviewDialogOpen} onOpenChange={setIsInterviewDialogOpen}>
        <DialogContent className="flex w-[calc(100vw-2rem)] max-h-[90vh] max-w-lg flex-col gap-0 overflow-hidden rounded-2xl border-0 p-0 shadow-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4 pr-12 sm:px-6">
            <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900">
              Interview Details
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
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
          </div>
          <DialogClose asChild />
        </DialogContent>
      </Dialog>
      <DeleteJobDialogue
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) setJobToDelete(null);
        }}
        jobTitle={jobToDelete?.title}
        onConfirm={confirmDeleteJob}
        isPending={deleteJobMutation.isPending}
      />
      <div>
        <h1 className="text-[24px] font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
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
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:my-8 my-6'>
          <h1 className="text-[24px] font-semibold leading-[30px]">
            Job Posting
          </h1>
          <Searchbar value={searchTerm} onChange={handleSearchChange} />
        </div>
        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={JobPostedTableData?.current_page}
          paginationend={JobPostedTableData?.pages}
          onPageChange={(page: number) => setCurrentPage(page)}
          onDelete={requestDeleteJob}
          showTrashIcon={true}
          showEyeIcon={true}
          onView={handleViewJob}
          isLoading={tableLoading}
        />
      </div>
    </>
  );
}
