import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface AIScoreBadgeProps {
  aiScore: number | null;
  status: string;
  isAnalyzing: boolean;
  onAnalyze?: () => void;
  className?: string;
}

const AIScoreBadge = ({ 
  aiScore, 
  status, 
  isAnalyzing, 
  onAnalyze,
  className = '' 
}: AIScoreBadgeProps) => {

  if (aiScore !== null) {
    return (
      <Badge className={`bg-[#f7941D] text-white ${className}`}>
        {aiScore}
      </Badge>
    );
  }

  if (isAnalyzing) {
    return (
      <Button size="sm" className="text-xs flex items-center gap-2" disabled>
        <Loader className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (status === 'pending') {
    return <p className="text-sm text-gray-500">Pending</p>;
  }

  return (
    <Button
      size="sm"
      className={`text-xs ${className}`}
      onClick={onAnalyze}
    >
      Analyze
    </Button>
  );
};

export default AIScoreBadge;