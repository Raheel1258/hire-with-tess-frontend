'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CURRENCY_OPTIONS,
  formatSalaryType,
  JOB_TYPE_OPTIONS,
  SALARY_TYPE_OPTIONS,
} from '@/app/employer/(dashboard)/Constant/jobformoptions';
import UseUpdateJobByID from '@/Routes/Employer/hooks/PUT/job/UpdateJobByID.hook';
import { UserJobResponse } from '@/Types/userJob';
import {
  Banknote,
  Briefcase,
  Building2,
  ClipboardList,
  HelpCircle,
  ListChecks,
  Loader2,
  MapPin,
  Pencil,
  Save,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import StatusBadge from './status.badge';
import { cn } from '@/lib/utils';

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

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E4B8E]/[0.08] text-[#1E4B8E]">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h2>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function NotGeneratedBadge() {
  return <StatusBadge className="bg-red-50 text-red-600" status="Not Generated" />;
}

const actionButtonBase =
  'h-10 rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]';

const primaryActionButtonClass = cn(
  actionButtonBase,
  'border-2 border-transparent bg-[#1E4B8E] text-white',
  'hover:!bg-[#163a6e] hover:!text-white hover:!border-[#163a6e]',
  'focus-visible:ring-[#1E4B8E]/30',
  '[&_svg]:text-white hover:[&_svg]:!text-white',
);

function EditSelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-10 w-full rounded-md border border-input bg-white text-sm text-black">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-black">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function JobpProfile({ data }: { data: UserJobResponse | undefined }) {
  const { mutate: updateJob, isPending } = UseUpdateJobByID();
  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState<UserJobResponse | null>(null);

  useEffect(() => {
    if (data) {
      setEditedData(data);
      setEdit(false);
    }
  }, [data]);

  if (!data || !editedData) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#1E4B8E]" />
      </div>
    );
  }

  const handleEdit = () => {
    if (edit) {
      setEditedData(data);
    }
    setEdit(!edit);
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditedData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const SaveEditedData = () => {
    updateJob({
      job_id: data.id,
      data: {
        ...editedData,
        interview_questions: editedData.interview_questions.map((question) => ({
          text: question.text,
          type: 'audio',
        })),
      },
    });
    setEdit(false);
  };

  const displayData = edit ? editedData : data;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Job hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#1E4B8E]/[0.06] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#f7941D]/[0.08] blur-2xl" />

        <div className="relative flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1 text-center md:text-left">
            {edit ? (
              <div className="space-y-3">
                <Input
                  value={editedData.job_title}
                  onChange={(e) => handleInputChange('job_title', e.target.value)}
                  className="text-lg font-semibold sm:text-xl"
                  placeholder="Job title"
                />
                <Textarea
                  value={editedData.job_description}
                  onChange={(e) => handleInputChange('job_description', e.target.value)}
                  className="min-h-[80px] text-sm text-slate-600"
                  placeholder="Job description"
                />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {data.job_title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{data.job_description}</p>
              </>
            )}
          </div>

          {!edit && (
            <div className="flex shrink-0 justify-center md:justify-end">
              <Button
                onClick={handleEdit}
                className={cn(primaryActionButtonClass, 'w-full sm:w-auto')}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Meta tiles */}
      {edit ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</label>
            <Input
              value={editedData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</label>
            <Input
              value={editedData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <EditSelectField
            label="Job Type"
            value={editedData.job_type}
            placeholder="Select job type"
            options={JOB_TYPE_OPTIONS}
            onChange={(value) => handleInputChange('job_type', value)}
          />
          <EditSelectField
            label="Currency"
            value={editedData.currency}
            placeholder="Select currency"
            options={CURRENCY_OPTIONS}
            onChange={(value) => handleInputChange('currency', value)}
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Salary</label>
            <Input
              value={editedData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
            />
          </div>
          <EditSelectField
            label="Salary Type"
            value={editedData.salary_type}
            placeholder="Select salary type"
            options={SALARY_TYPE_OPTIONS}
            onChange={(value) => handleInputChange('salary_type', value)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <DetailTile icon={Building2} label="Company" className="md:col-span-2 lg:col-span-1">
            {displayData.company_name || <NotGeneratedBadge />}
          </DetailTile>
          <DetailTile icon={MapPin} label="Location">
            {displayData.location || <NotGeneratedBadge />}
          </DetailTile>
          <DetailTile icon={Briefcase} label="Job Type">
            {displayData.job_type || <NotGeneratedBadge />}
          </DetailTile>
          <DetailTile icon={Banknote} label="Salary">
            {displayData.salary ? (
              <span>
                {displayData.currency} {displayData.salary}
              </span>
            ) : (
              <NotGeneratedBadge />
            )}
          </DetailTile>
          <DetailTile icon={Sparkles} label="Salary Type">
            {displayData.salary_type ? (
              formatSalaryType(displayData.salary_type)
            ) : (
              <NotGeneratedBadge />
            )}
          </DetailTile>
        </div>
      )}

      {/* Requirements */}
      <SectionCard title="Requirements" icon={ListChecks}>
        {edit ? (
          <Textarea
            value={editedData.requirements?.join('\n')}
            onChange={(e) => handleInputChange('requirements', e.target.value.split('\n'))}
            className="min-h-[120px]"
            placeholder="One requirement per line"
          />
        ) : (
          <ol className="space-y-2.5">
            {displayData.requirements?.map((req: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E4B8E] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{req}</span>
              </li>
            ))}
          </ol>
        )}
      </SectionCard>

      {/* Responsibilities */}
      <SectionCard title="Responsibilities" icon={ClipboardList}>
        {edit ? (
          <Textarea
            value={editedData.responsibilities?.join('\n')}
            onChange={(e) => handleInputChange('responsibilities', e.target.value.split('\n'))}
            className="min-h-[120px]"
            placeholder="One responsibility per line"
          />
        ) : (
          <ul className="space-y-2.5">
            {displayData.responsibilities?.map((res: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7941D]" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Skills" icon={Sparkles}>
        {edit ? (
          <Textarea
            value={editedData.skills?.join(', ')}
            onChange={(e) =>
              handleInputChange(
                'skills',
                e.target.value.split(',').map((s) => s.trim()),
              )
            }
            className="min-h-[72px]"
            placeholder="Enter skills separated by commas"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {displayData.skills?.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Interview questions */}
      <SectionCard title="Interview Questions" icon={HelpCircle}>
        {edit ? (
          <Textarea
            value={editedData.interview_questions?.map((question) => question.text).join('\n')}
            onChange={(e) =>
              handleInputChange(
                'interview_questions',
                e.target.value.split('\n').map((text) => ({ text, type: 'audio' })),
              )
            }
            className="min-h-[120px]"
            placeholder="One question per line"
          />
        ) : (
          <ol className="space-y-2.5">
            {displayData.interview_questions?.map((question: { text: string }, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7941D] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{question?.text}</span>
              </li>
            ))}
          </ol>
        )}
      </SectionCard>

      {edit && (
        <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white/95 pt-4 backdrop-blur-sm sm:flex-row sm:justify-end sm:gap-3">
          <Button
            variant="outline"
            onClick={handleEdit}
            disabled={isPending}
            className={cn(actionButtonBase, 'w-full sm:w-auto')}
          >
            Cancel
          </Button>
          <Button
            onClick={SaveEditedData}
            disabled={isPending}
            className={cn(primaryActionButtonClass, 'w-full sm:w-auto')}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
