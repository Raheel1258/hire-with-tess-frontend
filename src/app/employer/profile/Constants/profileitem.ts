import { LayoutDashboard, Shield, UserCircle } from 'lucide-react';
import type { SidebarNavItem } from '@/components/sidebar/types';

export const sidebarProfileItem: SidebarNavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    route: '/employer/home',
  },
  {
    icon: UserCircle,
    label: 'Account Details',
    route: '/employer/profile/account-details',
  },
  {
    icon: Shield,
    label: 'Permissions',
    route: '/employer/profile/permissions',
  },
];

export const sidebarProfileItemSuperAdmin: SidebarNavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    route: '/admin/home',
  },
  {
    icon: UserCircle,
    label: 'Account Details',
    route: '/admin/profile/account-details',
  },
];
