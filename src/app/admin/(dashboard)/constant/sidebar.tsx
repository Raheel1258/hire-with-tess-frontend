import {
  BarChart3,
  Briefcase,
  Building2,
  CreditCard,
  LayoutDashboard,
  Users,
} from 'lucide-react';
import type { SidebarNavItem } from '@/components/sidebar/types';

export const adminSidebarLinks: SidebarNavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    route: '/admin/home',
  },
  {
    icon: Briefcase,
    label: 'Job Posting',
    route: '/admin/job-posting',
  },
  {
    icon: Building2,
    label: 'Employers',
    route: '/admin/employers',
  },
  {
    icon: Users,
    label: 'Candidates',
    route: '/admin/candidate',
  },
  {
    icon: CreditCard,
    label: 'Subscriptions',
    route: '/admin/subscriptions',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    route: '/admin/analytics',
  },
];
