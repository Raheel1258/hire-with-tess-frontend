export const AdminEndpoint = {
  //Super Admin Auth
  SUPERADMIN_LOGIN: `/api/v1/superadmin/login`,

  //Super Admin User
  SUPERADMIN_GET_EMPLOYEES: `/api/v1/superadmin/Users`,
  SUPERADMIN_GET_EMPLOYEES_BY_ID: (user_id: string) =>
    `/api/v1/superadmin/users/${user_id}`,
  SUPERADMIN_DELETE_USER: (user_id: string) => `/api/v1/superadmin/users/${user_id}`,

  //Super Admin Job
  SUPERADMIN_GET_ALLJOB: `/api/v1/superadmin/jobs`,
  SUPERADMIN_GET_ALLANALYSIS: `/api/v1/superadmin/analyses`,
  SUPERADMIN_GET_SUBSCRIPTION_STATS: `/api/v1/superadmin/subscription-stats`,

  //Super Admin Subscription
  SUPERADMIN_GET_EMPLOYERSUBSCRIPTION: `/api/v1/superadmin/subscriptions`,
  SUPERADMIN_GET_SUBSCRIPTION_FILTER: `/api/v1/superadmin/subscriptions/filter`,
  SUPERADMIN_GET_DASHBOARD_STATS: `/api/v1/superadmin/Super-Admin-dashboard-stats`,

  //Super Admin Notification
  SUPERADMIN_GET_NOTIFICATION: `/api/v1/superadmin/notifications`,
  SUPERADMIN_GET_NOTIFICATION_SETTING: `/api/v1/superadmin/notification-settings`,

  //Super Admin Profile
  SUPERADMIN_UPDATE_NOTIFICATION: (notification_type: string) =>
    `/api/v1/superadmin/notification-settings/${notification_type}`,
  SUPERADMIN_GET_PROFILE: `/api/v1/superadmin/profile`,
  SUPERADMIN_UPDATE_PROFILE: `/api/v1/superadmin/profile`,
};
