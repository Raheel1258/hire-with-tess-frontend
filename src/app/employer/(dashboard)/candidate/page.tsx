'use client';
import { BriefcaseBusiness, Eye, Loader, Users } from 'lucide-react';
import CardComponent from '../components/card';
import TableComponent from '../components/table';
import { Badge } from '@/components/ui/badge';
import Searchbar from '../components/searchbar';
import UseDashboardCandidateCardStats from '@/Routes/Employer/hooks/GET/candidates/GetCandidateCardstats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';
import CandidateTableTitle from '../Constant/candiatetitle';
import { Button } from '@/components/ui/button';
import AnalyzeInterviewHook from '@/Routes/Employer/hooks/POST/AnalyzeInterview.hook';
import { toast } from 'sonner';

export default function CandidatePage() {

  const { data: candidatestats, refetch: refetchInterviews } =
    UseDashboardCandidateCardStats();
   const { data: CandidateTableData, isLoading: tableLoading } = UseGetAllInterview({ page: currentPage });
  const Interviewmutation = AnalyzeInterviewHook();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzingInterviewId, setAnalyzingInterviewId] = useState<string | null>(null);
  const [aiResult, setAIResult] = useState(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = CandidateTableData?.items?.filter((item: any) =>
    item.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAnalyzeInterview = (interviewId: string) => {
    setAnalyzingInterviewId(interviewId);
    Interviewmutation.mutate(
      { interview_id: interviewId },
      {
        onSuccess: (response) => {
          setAIResult(response?.final_report);
          setAnalyzingInterviewId('');
          refetchInterviews();
        },
        onError: (error) => {
          toast.error('AI analysis already exists', {
            description: error.message,
          });
          setAnalyzingInterviewId('');
        },
      },
    );
  };

  const DATA = (filteredJobs ?? []).map((item: any) => [
    <Eye
      onClick={() => {
        setSelectedCandidate(item);
        setIsDialogOpen(true);
      }}
      key={`eye-${item.id}`}
      className="w-5 h-5 text-tess-gray cursor-pointer"
    />,
    item?.candidate_name,
    item?.job_title,
    new Date(item.created_at).toLocaleDateString(),

    item.status === 'reject' ? (
      <Badge key={`status-${item.status}`} className="capitalize bg-red-100 text-red-800">
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

    item.ai_score === null ? (
      analyzingInterviewId === item.id ? (
        <Loader className="w-4 h-4 animate-spin text-[#f7941D] mx-auto" />
      ) : item.status === 'pending' ? (
        <p>Pending</p>
      ) : (
        <Button
          size="sm"
          className="text-xs"
          onClick={() => handleAnalyzeInterview(item.id)}
        >
          Analyze
        </Button>
      )
    ) : (
      <Badge className="bg-[#f7941D] text-white">{item.ai_score}</Badge>
    ),
  ]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Candidates Details</DialogTitle>
            <DialogDescription></DialogDescription>
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
            subheading={candidatestats?.new_candidates}
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
          <Searchbar value={searchTerm} onChange={handleSearchChange} />
          <TableComponent
            header={CandidateTableTitle}
            subheader={DATA}
            paginationstart={CandidateTableData?.current_page}
            paginationend={CandidateTableData?.pages}
            onPageChange={(page: number) => setCurrentPage(page)}
            isLoading={tableLoading}
          />
        </div>
      </div>
    </>
  );
}
