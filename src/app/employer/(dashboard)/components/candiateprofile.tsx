'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Waveform from '@/app/interview/component/Waveform';
import { useState } from 'react';
import UseUpdateInterviewStatus from '@/Routes/Employer/hooks/PUT/overview/UpdateInterviewStatus.hook';
import { toast } from 'sonner';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Loader,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import StatusBadge from './status.badge';
import Interviewplatform from './interviewplatform';
import downloadAudio from '@/Utils/helper/aduioDownloader';
import { cn } from '@/lib/utils';

interface UserProfileProps {
  data: {
    id: string;
    candidate_name: string;
    email: string;
    phone: string;
    status: string;
    job_title: string;
    created_at: string;
    ai_score: number | null;
    callback_number: string | null;
    image_url?: string;
    interview_metadata: string;
    answers: Record<
      string,
      {
        submission_type: string;
        url: string;
        transcription: string;
      }
    >;
  } | null;
  isSuperAdmin?: boolean;
}

function DetailTile({
  icon: Icon,
  label,
  children,
  className,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md',
        className,
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1E4B8E]/[0.08] text-[#1E4B8E] transition-colors group-hover:bg-[#1E4B8E]/[0.12]">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <div className="mt-1 text-sm font-medium leading-snug text-slate-800">{children}</div>
      </div>
    </div>
  );
}

const actionButtonBase =
  'h-11 w-full rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-60';

export default function UserProfile({ data, isSuperAdmin = false }: UserProfileProps) {
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [downloadingStates, setDownloadingStates] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();

  if (!data) return null;
  const answers = data.answers;
  const questions = Object.keys(answers || {});
  const updatejobstatus = UseUpdateInterviewStatus();

  const handleDownloadAudio = async (url: string, fileName: string, questionKey: string) => {
    try {
      setDownloadingStates((prev) => ({ ...prev, [questionKey]: true }));
      await downloadAudio(url, fileName);
      toast.success('Audio downloaded successfully');
    } catch {
      toast.error('Failed to download audio file');
    } finally {
      setDownloadingStates((prev) => ({ ...prev, [questionKey]: false }));
    }
  };

  const handleStatusUpdate = async (status: 'shortlisted' | 'reject' | 'pending') => {
    try {
      if (status === 'shortlisted') {
        setIsShortlisting(true);
      } else if (status === 'pending') {
        setIsPending(true);
      } else {
        setIsRejecting(true);
      }

      await updatejobstatus.mutateAsync({
        interview_id: data.id,
        status: status,
      });
      toast.success(
        `Candidate ${
          status === 'shortlisted'
            ? 'shortlisted'
            : status === 'pending'
              ? 'pending'
              : 'rejected'
        } successfully`,
      );

      await queryClient.invalidateQueries({ queryKey: ['interviews'] });
    } catch {
      toast.error('Failed to update status');
    } finally {
      if (status === 'shortlisted') {
        setIsShortlisting(false);
      } else if (status === 'pending') {
        setIsPending(false);
      } else {
        setIsRejecting(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Profile hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#1E4B8E]/[0.06] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#f7941D]/[0.08] blur-2xl" />

        <div className="relative flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-5">
            <Avatar className="h-20 w-20 shrink-0 ring-4 ring-white shadow-lg md:h-24 md:w-24">
              {data.image_url ? (
                <AvatarImage src={data.image_url} alt={data.candidate_name} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-[#1E4B8E] to-[#2d6bc4] text-2xl font-semibold text-white sm:text-3xl">
                  {data.candidate_name?.[0] || 'C'}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0 text-center md:text-left">
              <h2 className="truncate text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                {data.candidate_name}
              </h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500 md:justify-start">
                <Briefcase className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{data.job_title}</span>
              </p>
              <div className="mt-2.5 flex justify-center md:justify-start">
                <StatusBadge status={data.status} />
              </div>
            </div>
          </div>

          {!isSuperAdmin && (
            <div className="flex w-full shrink-0 flex-col gap-2 md:w-[180px] lg:w-[200px]">
              <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:text-left">
                Update Status
              </p>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  disabled={isShortlisting || isRejecting}
                  onClick={() => handleStatusUpdate('shortlisted')}
                  className={cn(actionButtonBase, 'bg-[#1E4B8E] text-white hover:bg-[#163a6e]')}
                >
                  {isShortlisting ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Shortlisted
                    </>
                  )}
                </Button>
                <Button
                  disabled={isShortlisting || isRejecting}
                  onClick={() => handleStatusUpdate('reject')}
                  className={cn(actionButtonBase, 'bg-[#F55141] text-white hover:bg-[#e04435]')}
                >
                  {isRejecting ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      Reject
                    </>
                  )}
                </Button>
                <Button
                  disabled={isShortlisting || isRejecting || isPending}
                  onClick={() => handleStatusUpdate('pending')}
                  className={cn(actionButtonBase, 'bg-[#f7941D] text-white hover:bg-[#e08519]')}
                >
                  {isPending ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Clock className="h-4 w-4" />
                      Pending
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail tiles — 2-col on tablet with last tile full-width; 3-col on desktop */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <DetailTile icon={Mail} label="Email" className="md:col-span-2 lg:col-span-1">
          <span className="break-all">{data.email}</span>
        </DetailTile>
        <DetailTile icon={Calendar} label="Interview Date">
          {new Date(data.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </DetailTile>
        <DetailTile icon={Sparkles} label="AI Rating">
          {data.ai_score !== null ? (
            <span className="inline-flex items-center gap-1">
              <span className="text-base font-semibold text-[#1E4B8E]">{data.ai_score}%</span>
            </span>
          ) : (
            <span className="text-slate-400">Not available</span>
          )}
        </DetailTile>
        {data.interview_metadata === 'phone_interview' ? (
          <DetailTile icon={Phone} label="Caller ID">
            {data.phone || (
              <StatusBadge className="bg-red-50 text-red-600" status="Not Submitted" />
            )}
          </DetailTile>
        ) : (
          <DetailTile icon={MessageSquare} label="Interview Type">
            <Interviewplatform platform={data.interview_metadata} />
          </DetailTile>
        )}
        <DetailTile icon={Phone} label="Callback Number">
          {data.callback_number ?? <span className="text-slate-400">Not provided</span>}
        </DetailTile>
      </div>

      {/* Interview responses */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <h3 className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Interview Responses
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>

          {questions.map((question, index) => {
            const answer = answers[question];

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3.5 sm:px-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1E4B8E] text-xs font-bold text-white shadow-sm">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm font-medium leading-relaxed text-slate-800">{question}</p>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                  {answer?.submission_type === 'audio' && (
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:p-4">
                      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                        <div className="min-w-0 flex-1">
                          <Waveform recordedVoiceURL={answer.url} />
                        </div>
                        <Button
                          disabled={downloadingStates[question]}
                          size="sm"
                          className="h-9 shrink-0 rounded-lg bg-[#1E4B8E] px-4 text-white shadow-sm hover:bg-[#163a6e] sm:w-auto"
                          onClick={() =>
                            handleDownloadAudio(
                              answer.url,
                              `${data.candidate_name}_${question}.mp3`,
                              question,
                            )
                          }
                        >
                          {downloadingStates[question] ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1E4B8E]">
                      Transcription
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {answer?.transcription || 'Transcription not available'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
