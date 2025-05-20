import React from 'react';
import { Button } from '@/components/ui/button';

interface RecordingControlsProps {
  onRecordAgain: () => void;
  onSaveAndContinue: () => void;
  recordAgainLabel?: string;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  onRecordAgain,
  onSaveAndContinue,
  recordAgainLabel = 'Record Again',
}) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={onRecordAgain}
        className="px-6 border-[#F7941D] text-[#F7941D]"
      >
        {recordAgainLabel}
      </Button>
      <Button onClick={onSaveAndContinue}>Save and Continue</Button>
    </div>
  );
};

export default RecordingControls;
