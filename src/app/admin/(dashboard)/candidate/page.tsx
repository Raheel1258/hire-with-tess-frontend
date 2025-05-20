'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { Badge } from '@/components/ui/badge';
import Searchbar from '@/app/employer/(dashboard)/components/searchbar';
import UseDashboardCandidateCardStats from '@/Routes/Employer/hooks/GET/candidates/GetCandidateCardstats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';

export default function AdminCandidatePage() {
  const TITLE = [
    'Action',
    'Name',
    'Job Applied For',
    'Company',
    'Interview Date',
    'Interview Status',
    'Status',
  ];

  const { data: candidatestats } = UseDashboardCandidateCardStats();
  const { data: CandidateTableData } = UseGetAllInterview();
  console.log('Interview Candidate Table Data:', CandidateTableData);
  const DATA = [
    [
      <Eye key={CandidateTableData?.id} className="w-5 h-5 text-gray-600" />,
      CandidateTableData?.candidate_name,
      CandidateTableData?.job_title,
      CandidateTableData?.created_at,
      <Badge key={'status'} className="bg-green-100 text-green-800">
        {CandidateTableData?.status}
      </Badge>,
      '81%',
    ],
  ];
  return (
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
          subheading={candidatestats?.hired}
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
        <Searchbar />
        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={CandidateTableData?.current_page}
          paginationend={CandidateTableData?.total}
        />
      </div>
    </div>
  );
}
