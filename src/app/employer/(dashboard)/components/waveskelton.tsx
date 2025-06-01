import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const WaveformSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-[40px] w-full" />
        </div>
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
};

export default WaveformSkeleton;