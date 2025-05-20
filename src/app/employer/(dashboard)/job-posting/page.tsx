'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '../components/card';
import { Badge } from '@/components/ui/badge';
import TableComponent from '../components/table';
import Searchbar from '../components/searchbar';
import UseDashboardJobCardStats from '@/Routes/Employer/hooks/GET/jobposting/GetJobCardstats.hook';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/jobposting/GetAllJobs.hook';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserProfile from '../components/candiateprofile';
import { useState } from 'react';
import JobPostingTableTitle from '@/app/employer/(dashboard)/Constant/jobposting';
import UseDeleteJobByID from '@/Routes/Employer/hooks/DELETE/DeleteJobById.hook';

export default function JobPosting() {
  const { data: jobdata } = UseDashboardJobCardStats();
  const { data: JobPostedTableData } = UseGetAllJob();
  const deleteJobMutation = UseDeleteJobByID();


  // const { data: FilteredJobData } = UseGetFilteredJob(filters);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [candidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = JobPostedTableData?.items?.filter((item: any) =>
    item.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteJob =(rowIndex: number)=>{
    const jobIds = filteredJobs?.map((item: any) => item.id) ?? [];
    const jobId = jobIds[rowIndex];
    deleteJobMutation.mutate(jobId);
  }
 


  const DATA = (filteredJobs ?? []).map((item: any) => [
    <Eye
      onClick={() => {
        setSelectedCandidate(item);
        setIsDialogOpen(true);
      }}
      key={item.id}
      className="w-5 h-5 text-gray-600 cursor-pointer"
    />,
    item?.job_title,
    <Badge
      key={item.id}
      className="bg-[#34D399]/10 text-[#027A48]">{item?.status}</Badge>,
    item?.shortlisted_stats?.shortlisted,
    item?.shortlisted_stats?.shortlist_ratio,
    item?.job_type,
    item?.created_at,
    item?.expiry_date,
  ]);

  return (
    <>
      {/* <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Posted Job Details</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <UserProfile data={candidate} />
          <DialogClose asChild />
        </DialogContent>
      </Dialog> */}

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
          <Searchbar
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <TableComponent
            header={JobPostingTableTitle}
            subheader={DATA}
            paginationstart={JobPostedTableData?.current_page}
            paginationend={JobPostedTableData?.total}
            showTrashIcon
            onDelete={deleteJob}
          />
        </div>
      </div>
    </>
  );
}
