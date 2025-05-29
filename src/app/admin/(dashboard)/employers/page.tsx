'use client';
import { Badge } from '@/components/ui/badge';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import { useState } from 'react';
import { useGetEmployers } from '@/Routes/Admin/hook/GET/employer/Getemployer';

export default function EmployersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: employersData, isLoading } = useGetEmployers({ page: currentPage });

  const TITLE = [
    'Employer Name',
    'Email',
    'Organization',
    'Total Job Posting',
    'Subscription Status',
    'Date Joined',
  ];

  const DATA =
    employersData?.items.map((employer: any) => [
      employer.name,
      employer.email,
      employer.organization_name,
      employer.stats.total_jobs,
      <Badge
        key={employer.id}
        className={`${
          employer.stats.subscription_status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {employer.stats.subscription_status}
      </Badge>,
      new Date(employer.date_joined).toLocaleDateString(),
    ]) || [];

  return (
    <div>
      <h1 className="font-[roboto] text-[24px] font-semibold leading-[30px] mb-4">
        Employers test
      </h1>
      <TableComponent
        header={TITLE}
        subheader={DATA}
        paginationstart={employersData?.current_page ?? 1}
        paginationend={employersData?.pages ?? 0}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />
    </div>
  );
}
