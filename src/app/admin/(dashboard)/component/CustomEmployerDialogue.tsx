'use client';

import {
  formatSalaryType,
} from '@/app/employer/(dashboard)/Constant/jobformoptions';
import StatusBadge from '@/app/employer/(dashboard)/components/status.badge';
import useGetCandidateJobs from '@/Routes/Admin/hook/GET/candidate/GetCandidate.hook';
import { cn } from '@/lib/utils';
import {
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  Loader2,
  MapPin,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface CustomEmployeDialogueProps {
  employerId: string;
}

interface CandidateJobsProps {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  currency: string;
  interview_link: string;
  job_description: string;
  job_title: string;
  job_type: string;
  location: string;
  salary: string;
  salary_type: string;
  total_interviews: number;
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

function EmptyValue() {
  return <span className="text-slate-400">Not provided</span>;
}

function formatSalary(currency?: string, salary?: string, salaryType?: string) {
  if (!salary) return null;

  const formattedType = salaryType ? formatSalaryType(salaryType) : '';
  const amount = currency ? `${currency} ${salary}` : salary;

  return formattedType ? `${amount} / ${formattedType}` : amount;
}

function JobCard({ job }: { job: CandidateJobsProps }) {
  const salaryDisplay = formatSalary(job.currency, job.salary, job.salary_type);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 px-4 py-4 sm:px-5 sm:py-5">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#1E4B8E]/[0.06] blur-2xl" />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              {job.job_title || 'Untitled Job'}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.company_name || 'Company not provided'}</span>
            </p>
          </div>
          <StatusBadge status={job.status} className="w-fit shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <DetailTile icon={Briefcase} label="Job Type">
          {job.job_type || <EmptyValue />}
        </DetailTile>

        <DetailTile icon={MapPin} label="Location">
          {job.location || <EmptyValue />}
        </DetailTile>

        <DetailTile icon={Banknote} label="Compensation">
          {salaryDisplay || <EmptyValue />}
        </DetailTile>

        <DetailTile icon={Calendar} label="Posted On">
          {new Date(job.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </DetailTile>

        <DetailTile icon={Users} label="Total Interviews" className="sm:col-span-2">
          <span className="inline-flex items-center rounded-full bg-[#1E4B8E]/10 px-3 py-1 text-xs font-semibold text-[#1E4B8E]">
            {job.total_interviews ?? 0} completed
          </span>
        </DetailTile>
      </div>
    </article>
  );
}

export default function CustomEmployeDialogue({ employerId }: CustomEmployeDialogueProps) {
  const { data: response, isLoading, error } = useGetCandidateJobs(employerId);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-[#1E4B8E]" />
          <p className="text-sm">Loading posted jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center">
        <p className="text-sm font-medium text-red-700">Unable to load posted jobs.</p>
        <p className="mt-1 text-sm text-red-600">Please try again later.</p>
      </div>
    );
  }

  if (!response?.items || !Array.isArray(response.items) || response.items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
        <Briefcase className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-sm font-medium text-slate-700">No jobs posted yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Jobs posted by this employer will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">Posted jobs</p>
        <span className="rounded-full bg-[#1E4B8E]/10 px-3 py-1 text-xs font-semibold text-[#1E4B8E]">
          {response.total} total
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {response.items.map((job: CandidateJobsProps) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
