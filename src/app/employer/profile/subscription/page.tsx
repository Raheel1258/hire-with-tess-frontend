import { Check } from 'lucide-react';
import SubscriptionCard from '../components/subscroptioncard';
import RedirectToDashboard from '../components/breadcrumb';

export default function UserProfileSubscription() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <RedirectToDashboard
          DashboardTitle="Dashboard"
          ProfileTitle="Profile"
          PageTitle="Subscriptions"
          DashboardUrl="/employer/home"
          ProfileUrl="/employer/profile"
        />
        <h1 className="text-2xl font-semibold text-slate-800">Subscription</h1>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-700 mt-8 mb-4">Upgrade Your Plan</h2>
        <div className="flex flex-wrap gap-4">
          <SubscriptionCard
            title="Basic Package"
            amount="$99/Month"
            cardcolor="#EAEAEA"
            plantitle="Purchase Basic Plan"
            points={[
              { text: 'Up to 5 Active Job Posts', icon: Check, iconbg: '#F7941D' },
              { text: 'Up to 250 Applicants per month', icon: Check, iconbg: '#F7941D' },
              {
                text: 'Standard AI Interview analysis and employer dashboard access',
                icon: Check,
                iconbg: '#F7941D',
              },
            ]}
          />
          <SubscriptionCard
            title="Premium Package"
            amount="$299/Month"
            cardcolor="#1E4B8E"
            titleColor="#FFFFFF"
            amountColor="#FFFFFF"
            pointTextColor="#FFFFFF"
            plantitle="Purchase Premium Plan"
            points={[
              { text: 'Unlimited Active Job Posts', icon: Check, iconbg: '#F7941D' },
              { text: 'Up to 1,000 Applicants per month', icon: Check, iconbg: '#F7941D' },
              {
                text: 'Include all Standard features plus advanced analytics and custom AI Interview configuration',
                icon: Check,
                iconbg: '#F7941D',
              },
            ]}
          />
          <SubscriptionCard
            title="Standard Package"
            amount="$199/Month"
            cardcolor="#EAEAEA"
            plantitle="Purchase Standard Plan"
            points={[
              { text: 'Up to 15 Active Job Posts', icon: Check, iconbg: '#F7941D' },
              { text: 'Up to 500 Applicants per month', icon: Check, iconbg: '#F7941D' },
              {
                text: 'Include all Basic features plus priority customer support',
                icon: Check,
                iconbg: '#F7941D',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
