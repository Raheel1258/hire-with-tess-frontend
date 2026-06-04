import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecordingControlsProps {
  onRecordAgain: () => void;
  onSaveAndContinue: () => void;
  recordAgainLabel?: string;
  isSubmitting?: boolean;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  onRecordAgain,
  onSaveAndContinue,
  recordAgainLabel = 'Record Again',
  isSubmitting = false,
}) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={onRecordAgain}
        disabled={isSubmitting}
        className="px-6 border-[#F7941D] text-[#F7941D]"
      >
        {recordAgainLabel}
      </Button>
      <Button onClick={onSaveAndContinue} disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </span>
        ) : (
          'Save and Continue'
        )}
      </Button>
    </div>
  );
};

export default RecordingControls;
