'use client';
import { BriefcaseBusiness, Eye, Search, Users } from 'lucide-react';
import CardComponent from '@/app/employer/(dashboard)/components/card';
import { Badge } from '@/components/ui/badge';
import TableComponent from '@/app/employer/(dashboard)/components/table';
import Searchbar from '@/app/employer/(dashboard)/components/searchbar';
import useSubscriptionStats from '@/Routes/Employer/hooks/GET/subscription/GetSubscriptionStats.hook';
import useSubscriptions from '@/Routes/Employer/hooks/GET/subscription/GetSubscriptions.hook';
import { useState } from 'react';

export default function Subscriptions() {
  const [searchValue, setSearchValue] = useState('');

  const TITLE = [
    'Action',
    'Employer Name',
    'Subscription Type',
    'Package',
    'Status',
    'Start Date',
    'Expiry Date',
  ];

  const { data: statsData } = useSubscriptionStats();
  const { data: subscriptionsData } = useSubscriptions();

  const DATA =
    subscriptionsData?.items.map((subscription) => [
      <Eye key={subscription.employer_name} className="w-5 h-5 text-gray-600" />,
      subscription.employer_name,
      subscription.package_name,
      subscription.package_price,
      <Badge
        key={subscription.status}
        className={`${
          subscription.status === 'active'
            ? 'bg-green-100 text-green-800'
            : subscription.status === 'cancelled'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {subscription.status}
      </Badge>,
      new Date(subscription.period_start).toLocaleDateString(),
      new Date(subscription.period_end).toLocaleDateString(),
    ]) || [];

  const totalSubscriptions =
    (statsData?.total_active_subscriptions || 0) +
    (statsData?.total_cancelled_subscriptions || 0) +
    (statsData?.total_expired_subscriptions || 0);

  return (
    <div>
      <h1 className="text-[24px] font-[open sans] font-semibold ml-2 mb-4">
        Subscriptions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Active Subscriptions"
          subheading={String(statsData?.total_active_subscriptions || 0)}
          icon={<Users className="text-[#f7941D]" />}
        />
        <CardComponent
          heading="Total Subscriptions"
          subheading={String(totalSubscriptions)}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
        <CardComponent
          heading="Cancelled Subscriptions"
          subheading={String(statsData?.total_cancelled_subscriptions || 0)}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
        <CardComponent
          heading="Total Revenue"
          subheading={statsData?.total_revenue || '$0'}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
      </div>
      <div className="mt-10">
        <h1 className="font-[roboto] text-[24px] font-bold leading-[30px] mb-4">
          Employer Subscription Overview
        </h1>
        <Searchbar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={subscriptionsData?.current_page || 1}
          paginationend={subscriptionsData?.total || 0}
        />
      </div>
    </div>
  );
}
