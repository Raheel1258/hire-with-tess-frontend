'use client';

import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { browser: 'Software Engineer', visitors: 275, fill: '#1E4B8E' },
  { browser: 'Marketing', visitors: 200, fill: '#4C78FF' },
  { browser: 'Sales', visitors: 187, fill: '#FFBB38' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: '#1E4B8E',
  },
  safari: {
    label: 'Safari',
    color: '#4C78FF',
  },
  firefox: {
    label: 'Firefox',
    color: '#FFBB38',
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>Popular Job Categories</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-h-[200px] w-sm">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[500px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs items-st">
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li className="marker:text-[#1E4B8E] font-medium leading-none">
            Software Engineer
          </li>
          <li className="marker:text-[#4C78FF] font-medium leading-none">Marketing</li>
          <li className="marker:text-[#FFBB38] font-medium leading-none">Sales</li>
        </ul>
      </CardFooter>
    </Card>
  );
}
