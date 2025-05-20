import { CardDescription, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface CardProps {
  heading: string;
  subheading: string;
  icon: ReactNode;
}

export default function CardComponent({ heading, subheading, icon }: CardProps) {
  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col gap-4 w-full max-w-full h-auto border
                 sm:flex-row sm:items-center sm:justify-between sm:gap-6 overflow-hidden"
    >
      <div className="flex flex-col gap-y-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
            {icon}
          </div>
          <CardTitle className="text-xs font-light truncate">{heading}</CardTitle>
        </div>
        <CardDescription className="text-base pl-3 text-black font-[open Sans] font-semibold truncate mt-2">
          {subheading}
        </CardDescription>
      </div>
    </div>
  );
}
