'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '../components/card';
import TableComponent from '../components/table';
import { Badge } from '@/components/ui/badge';
import Searchbar from '../components/searchbar';
import UseDashboardCandidateCardStats from '@/Routes/Employer/hooks/GET/candidates/GetCandidateCardstats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';
import CandidateTableTitle from '../Constant/candiatetitle';

export default function CandidatePage() {

  const { data: candidatestats } = UseDashboardCandidateCardStats();
  const { data: CandidateTableData } = UseGetAllInterview();


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = CandidateTableData?.items?.filter((item: any) =>
    item.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const DATA = (filteredJobs ?? []).map((item: any) => [
    <Eye onClick={() => { setSelectedCandidate(item);
      setIsDialogOpen(true);}}
      key={item.id}
      className="w-5 h-5 text-tess-gray cursor-pointer"
    />,
    item?.candidate_name,
    item?.job_title,
    item?.created_at,
    <Badge key={'status'} variant="outline" className="bg-tess-green/10 text-tess-green">
      {item?.status}
    </Badge>,
    item?.ai_score,
  ]);
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Candidates Details</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <UserProfile data={selectedCandidate} />
          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>
      <div>
        <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Total Candidates"
            subheading={candidatestats?.total_candidates}
            icon={<Users size={20} strokeWidth={1.5} color="#f7941D" />}
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
          <h1 className="font-roboto text-2xl font-bold leading-[30px] mb-4">
            Candidates
          </h1>
          <Searchbar
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <TableComponent
            header={CandidateTableTitle}
            subheader={DATA}
            paginationstart={CandidateTableData?.current_page}
            paginationend={CandidateTableData?.total}
          />
        </div>
      </div>
    </>
  );
}
