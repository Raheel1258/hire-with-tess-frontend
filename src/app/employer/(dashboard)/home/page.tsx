'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
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

export default function DashboardHome() {
  const { data: interviewCardData } = UseDashboardCardStats();
  const { data: DashboardTableData, refetch: refetchInterviews } = UseGetAllInterview();

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
    DashboardTableData?.items?.map((item: any) => [
      <div key={`actions-${item.id}`} className="flex gap-2 items-center">
        <Eye
          onClick={() => {
            setSelectedCandidate(item);
            setIsDialogOpen(true);
          }}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      </div>,
      item.candidate_name,
      item.job_title,
      new Date(item.created_at).toLocaleDateString(),

      item.status === 'reject' ? (
        <Badge
          key={`status-${item.status}`}
          className="capitalize bg-red-100 text-red-800"
        >
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
            paginationend={DashboardTableData?.total}
          />
        </div>
      </div>
    </>
  );
}
