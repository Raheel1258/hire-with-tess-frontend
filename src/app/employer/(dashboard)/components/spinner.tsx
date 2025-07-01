import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent',
        'bg-gradient-to-tr from-[#f7941D] via-white to-[#1E4B8E]',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundImage: 'linear-gradient(to top right, #f7941D, white, #1E4B8E)',
      }}
    />
  );
};

export default Spinner; 