'use client';
import { BriefcaseBusiness, Eye, Search, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import { Badge } from '@/components/ui/badge';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import Searchbar from '@/app/employer/(dashboard)/components/searchbar';
import UseDashboardJobCardStats from '@/Routes/Employer/hooks/GET/jobposting/GetJobCardstats.hook';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/jobposting/GetAllJobs.hook';

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
  const { data: JobTableData } = UseGetAllJob();
  console.log('All Job Data:', JobTableData);

  const DATA = [
    [
      <Eye key={JobTableData?.id} className="w-5 h-5 text-gray-600" />,
      JobTableData?.job_title,
      <Badge key={'status'} className="bg-green-100 text-green-800">
        {JobTableData?.status}
      </Badge>,
      JobTableData?.shortlisted,
      JobTableData?.shortlisted_rate,
      JobTableData?.job_type,
      JobTableData?.created_at,
      JobTableData?.expiry_date,
    ],
  ];

  return (
    <div>
      <h1 className="font-[roboto] text-[24px] font-semibold leading-[30px] mb-4">
        {' '}
        Job Posting
      </h1>
      <Searchbar />
      <TableComponent
        header={TITLE}
        subheader={DATA}
        paginationstart={JobTableData?.current_page}
        paginationend={JobTableData?.total}
      />
    </div>
  );
}
