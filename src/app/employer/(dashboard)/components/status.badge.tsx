import { Badge } from '@/components/ui/badge';

type StatusType = 'reject' | 'pending' | 'shortlisted' | 'Completed' | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const getStatusStyles = (status: StatusType) => {
    switch (status) {
      case 'reject':
        return 'capitalize bg-red-100 text-red-800';
      case 'pending':
        return 'capitalize bg-yellow-100 text-[#f7941D]';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'capitalize bg-green-100 text-green-800';
      default:
        return 'capitalize bg-green-100 text-green-800';
    }
  };

  return (
    <Badge 
      className={`capitalize ${getStatusStyles(status)} ${className}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;