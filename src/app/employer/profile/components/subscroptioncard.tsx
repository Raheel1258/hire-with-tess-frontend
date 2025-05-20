import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

import { LucideIcon } from 'lucide-react';

interface BulletPoint {
  icon: LucideIcon;
  iconbg: string;
  text: string;
  textColor?: string;
}

interface CardProps {
  title: string;
  amount: string;
  cardcolor: string;
  plantitle: string;
  points: BulletPoint[];
  titleColor?: string;
  amountColor?: string;
  pointTextColor?: string;
}

export default function SubscriptionCard({
  title,
  amount,
  cardcolor,
  points,
  plantitle,
  titleColor = '#000',
  amountColor = '#000',
  pointTextColor = '#000',
}: CardProps) {
  return (
    <>
      <Card
        className="rounded-2xl p-6 shadow-2xl w-76 flex transition-transform duration-300 hover:scale-105 hover:shadow-3xl"
        style={{ backgroundColor: cardcolor }}
      >
        <div className="mb-4 flex flex-col items-center ">
          <h2
            className="text-LG font-[open Sans] font-bold mb-2"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          <div
            className="text-sm font-[roboto] font-bold mb-4"
            style={{ color: amountColor }}
          >
            {amount}
          </div>
          <Button className="rounded-2xl cursor-pointer mt-2 text-[#2A2A2A]">
            {plantitle}
          </Button>
        </div>
        <hr className="border-gray-300" />
        <ul className="space-y-4">
          {points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`flex items-center justify-center rounded-full w-6 h-6 mr-3 flex-shrink-0 self-start`}
                style={{ backgroundColor: point.iconbg }}
              >
                <point.icon className="w-4 h-4 text-white" />
              </span>
              <span
                className="text-base"
                style={{ color: point.textColor || pointTextColor }}
              >
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
