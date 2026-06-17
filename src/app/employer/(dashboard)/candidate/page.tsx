'use client';
import { BriefcaseBusiness, Copy, Eye, Loader, Users } from 'lucide-react';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UserProfile from '@/app/employer/(dashboard)/components/candiateprofile';
import CandidateTableTitle from '../Constant/candiatetitle';
import { Button } from '@/components/ui/button';
import AnalyzeInterviewHook from '@/Routes/Employer/hooks/POST/AnalyzeInterview.hook';
import { toast } from 'sonner';
import handleCopyLink from '@/Utils/helper/copylink';
import StatusBadge from '../components/status.badge';
import Interviewplatform from '../components/interviewplatform';
import CandidateItem from '@/Types/Candidate/candiate.type';

export default function CandidatePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: candidatestats, refetch: refetchInterviews } =
    UseDashboardCandidateCardStats();
  const { data: CandidateTableData, isLoading: tableLoading } = UseGetAllInterview({
    page: currentPage,
  });
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

  const DATA = (filteredJobs ?? []).map((item: CandidateItem) => [
    item?.id,
    item?.candidate_name,
    item?.job_title,
    new Date(item.created_at).toLocaleDateString(),

    <StatusBadge status={item.status} key={`status-${item.id}`} />,

    item?.interview_link ? (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleCopyLink(item.interview_link)}
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">Copy Link</span>
      </Button>
    ) : (
      'No link available'
    ),
    <Interviewplatform platform={item.interview_metadata} key={`platform-${item.id}`} />,

    item.ai_score !== null ? (
      <Button
        variant="ghost"
        size="sm"
        className="bg-orange-100 text-orange-400 w-10 flex items-center gap-2 border-2 border-orange-300"
      >
        {item.ai_score}
      </Button>
    ) : analyzingInterviewId === item.id ? (
      <Button size="sm" className="text-xs flex items-center gap-2" disabled>
        <Loader
          className="w-4 h-4 animate-spin rounded-full"
          style={{
            background: 'conic-gradient(#f7941D, white, #1E4B8E)',
            maskImage: 'radial-gradient(closest-side, transparent 60%, black 61%)',
            WebkitMaskImage: 'radial-gradient(closest-side, transparent 60%, black 61%)',
          }}
        />
      </Button>
    ) : item.status === 'pending' ? (
      <Badge className="capitalize bg-yellow-100 text-[#f7941D]">Pending</Badge>
    ) : (
      <Button
        size="sm"
        className="text-xs"
        onClick={() => handleAnalyzeInterview(item.id)}
      >
        Analyze
      </Button>
    ),
    <div key={`actions-${item.id}`} className="flex justify-center">
      <Eye
        onClick={() => {
          setSelectedCandidate(item);
          setIsDialogOpen(true);
        }}
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#f7941D] transition"
      />
    </div>,
  ]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex w-[calc(100vw-2rem)] max-h-[90vh] max-w-lg flex-col gap-0 overflow-hidden rounded-2xl border-0 p-0 shadow-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
          <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-4 pr-12 sm:px-6">
            <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900">
              Candidate Details
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            <UserProfile data={selectedCandidate} />
          </div>
          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>
      <div>
        <h1 className="text-xl sm:text-2xl font-open-sans font-semibold mb-4">
          Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
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
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:my-8 my-6'>
            <h1 className="font-roboto text-xl sm:text-2xl font-semibold leading-[30px]">
              Candidates
            </h1>
            <div className="w-full sm:max-w-[300px]">
              <Searchbar value={searchTerm} onChange={handleSearchChange} />
            </div>
          </div>
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
