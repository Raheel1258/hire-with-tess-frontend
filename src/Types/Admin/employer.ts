export interface EmployerStats {
  total_jobs: number;
  subscription_status: string;
  subscription_end_date: string;
}

export interface Employer {
  id: string;
  name: string;
  email: string;
  date_joined: string;
  stats: EmployerStats;
  organization_name: string;
}

export interface EmployersResponse {
  items: Employer[];
  total: number;
  pages: number;
  current_page: number;
}

export interface SuperAdminEmployer {
  id: string;
  name: string;
  email: string;
  organization_name: string;
  stats: {
    total_jobs: number;
    subscription_status: string;
  };
  date_joined: string;
}