'use client';
import { BriefcaseBusiness, Copy, Eye, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { Badge } from '@/components/ui/badge';
import UseDashboardCardStats from '@/Routes/Employer/hooks/GET/Overview/GetOverviewCardStats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/Overview/GetAllInterview.hook';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import UserProfile from '../components/candiateprofile';
import HomeTableTile from '../Constant/hometitle';
import { Button } from '@/components/ui/button';
import AnalyzeInterviewHook from '@/Routes/Employer/hooks/POST/AnalyzeInterview.hook';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import OverviewStore from '@/store/EmployeeDashboard/dashboard/overview/overview.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import handleCopyLink from '@/Utils/helper/copylink';
import StatusBadge from '../components/status.badge';
import Interviewplatform from '../components/interviewplatform';
import InterviewItem from '@/Types/EmployerDashboard/Dashboard/Job/interviewitem.type';



export default function DashboardHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: interviewCardData } = UseDashboardCardStats();
  const { data: DashboardTableData, refetch: refetchInterviews } = UseGetAllInterview({
    page: currentPage,
  });

  const Interviewmutation = AnalyzeInterviewHook();

  const router = useRouter();
  const {
    selectedCandidate,
    analyzingInterviewId,
    isDialogOpen,
    setAIResult,
    setSelectedCandidate,
    setAnalyzingInterviewId,
    setAIReportDialogOpen,
    setIsDialogOpen,
  } = OverviewStore();

  const handleButtonClick = () => {
    router.push('/');
  };

  const handleAnalyzeInterview = (interviewId: string) => {
    setAnalyzingInterviewId(interviewId);
    Interviewmutation.mutate(
      { interview_id: interviewId },
      {
        onSuccess: (response) => {
          setAIResult(response?.final_report);
          setAIReportDialogOpen(true);
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

  const DATA =
    DashboardTableData?.items?.map((item: InterviewItem) => [
      item?.id,
      item.candidate_name,
      item.job_title,
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
          <span>Copy Link</span>
        </Button>
      ) : (
        'No link available'
      ),
      <Interviewplatform
        platform={item.interview_metadata}
        key={`platform-${item.id}`}
      />,
      item.ai_score !== null ? (
        <Button
         variant="ghost"
        size="sm"
         className="bg-orange-100 text-orange-400 w-10 flex items-center gap-2 border-2 border-orange-300">{item.ai_score}</Button>
      ) : analyzingInterviewId === item.id ? (
        <Button size="sm" className="text-xs flex items-center gap-2" disabled>
          <Loader
            className="w-4 h-4 animate-spin rounded-full"
            style={{
              background: 'conic-gradient(#f7941D, white, #1E4B8E)',
              maskImage: 'radial-gradient(closest-side, transparent 60%, black 61%)',
              WebkitMaskImage:
                'radial-gradient(closest-side, transparent 60%, black 61%)',
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
    ]) || [];

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <UserProfile data={selectedCandidate} />
          <DialogClose asChild></DialogClose>
        </DialogContent>
      </Dialog>
      <div>
        <div className="flex flex-row justify-between">
          <h1 className="text-[24px] font-[roboto] font-semibold ml-2 mb-4">Overview</h1>
          <Button onClick={handleButtonClick} className="font-semibold">
            Posted a New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <CardComponent
            heading="Open Job Listings"
            subheading={interviewCardData?.active_jobs}
            icon={<Users className="text-[#f7941D]" />}
          ></CardComponent>
          <CardComponent
            heading="Total Applicant"
            subheading={interviewCardData?.total_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>

          <CardComponent
            heading="Interviews Completed"
            subheading={interviewCardData?.completed_interviews}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
          <CardComponent
            heading="Shortlised Applicants"
            subheading={interviewCardData?.shortlisted_candidates}
            icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
          ></CardComponent>
        </div>
        <div className="mt-10">
          <h1 className="font-[roboto] text-[24px] font-semibold leading-[30px] mb-4">
            {' '}
            Latest Interview
          </h1>
          <TableComponent
            header={HomeTableTile}
            subheader={DATA}
            paginationstart={DashboardTableData?.current_page}
            paginationend={DashboardTableData?.pages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
