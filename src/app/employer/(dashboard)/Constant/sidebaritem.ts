import { Briefcase, LayoutDashboard, Users } from 'lucide-react';
import type { SidebarNavItem } from '@/components/sidebar/types';

export const employeeSidebarLinks: SidebarNavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    route: '/employer/home',
  },
  {
    icon: Briefcase,
    label: 'Job Posting',
    route: '/employer/job-posting',
  },
  {
    icon: Users,
    label: 'Candidates',
    route: '/employer/candidate',
  },
];
