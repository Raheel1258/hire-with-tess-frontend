export interface Subscription {
  employer_name: string;
  package_name: string;
  package_price: string;
  status: string;
  period_start: string;
  period_end: string;
}

export interface SubscriptionsResponse {
  items: Subscription[];
  total: number;
  pages: number;
  current_page: number;
}

export interface SubscriptionStats {
  total_active_subscriptions: number;
  total_cancelled_subscriptions: number;
  total_expired_subscriptions: number;
  total_revenue: string;
  current_month_revenue: string;
}
