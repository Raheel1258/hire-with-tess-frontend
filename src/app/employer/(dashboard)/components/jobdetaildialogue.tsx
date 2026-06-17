'use client';

import UseGetJobInterviewByID from '@/Routes/Employer/hooks/GET/jobposting/GetJobInterviewByID.hook';
import JobInterviewProps from '@/Types/EmployerDashboard/Dashboard/jobposted/postedjob';
import StatusBadge from './status.badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomJobDetailDialogueProps {
  jobId: string;
  isOpen?: boolean;
  onClose?: () => void;
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
        'flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm',
        className,
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1E4B8E]/[0.08] text-[#1E4B8E]">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <div className="mt-1 text-sm font-medium leading-snug text-slate-800">{children}</div>
      </div>
    </div>
  );
}

function InterviewCard({ interview }: { interview: JobInterviewProps }) {
  const initials =
    interview.candidate_name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'C';

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 px-4 py-4 sm:px-5 sm:py-5">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#1E4B8E]/[0.06] blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <Avatar className="h-16 w-16 shrink-0 ring-4 ring-white shadow-md sm:h-[72px] sm:w-[72px]">
            <AvatarFallback className="bg-gradient-to-br from-[#1E4B8E] to-[#2d6bc4] text-xl font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              {interview.candidate_name}
            </h3>
            {interview.job_title && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <Briefcase className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{interview.job_title}</span>
              </p>
            )}
            <div className="mt-2.5">
              <StatusBadge status={interview.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <DetailTile icon={Mail} label="Email">
          {interview.email ? (
            <a href={`mailto:${interview.email}`} className="break-all text-[#1E4B8E] hover:underline">
              {interview.email}
            </a>
          ) : (
            <span className="text-slate-400">Not provided</span>
          )}
        </DetailTile>

        <DetailTile icon={Phone} label="Phone">
          {interview.phone ? (
            <a href={`tel:${interview.phone}`} className="text-[#1E4B8E] hover:underline">
              {interview.phone}
            </a>
          ) : (
            <span className="text-slate-400">Not provided</span>
          )}
        </DetailTile>

        <DetailTile icon={Sparkles} label="AI Score">
          {interview.ai_score !== null && interview.ai_score !== undefined ? (
            `${interview.ai_score}%`
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </DetailTile>

        <DetailTile icon={Calendar} label="Interview Date">
          {new Date(interview.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </DetailTile>

        {interview.resume && (
          <DetailTile icon={FileText} label="Resume" className="sm:col-span-2">
            <a
              href={interview.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#1E4B8E] hover:underline"
            >
              View resume
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </DetailTile>
        )}
      </div>
    </article>
  );
}

const CustomJobDetailDialogue = ({ jobId }: CustomJobDetailDialogueProps) => {
  const { data: response, isLoading, error } = UseGetJobInterviewByID(jobId);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-[#1E4B8E]" />
          <p className="text-sm">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center">
        <p className="text-sm font-medium text-red-700">Unable to load interview details.</p>
        <p className="mt-1 text-sm text-red-600">Please try again later.</p>
      </div>
    );
  }

  if (!response?.items || !Array.isArray(response.items) || response.items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
        <Users className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-sm font-medium text-slate-700">No interviews yet</p>
        <p className="mt-1 text-sm text-slate-500">Candidates who complete interviews will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">Job interviews</p>
        <span className="rounded-full bg-[#1E4B8E]/10 px-3 py-1 text-xs font-semibold text-[#1E4B8E]">
          {response.total} total
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {response.items.map((interview: JobInterviewProps) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default CustomJobDetailDialogue;
