'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 120 },
  { month: 'February', mobile: 150 },
  { month: 'March', desktop: 130 },
  { month: 'April', mobile: 73 },
  { month: 'May', desktop: 140 },
  { month: 'June', mobile: 150 },
  { month: 'July', desktop: 200 },
  { month: 'August', mobile: 140 },
  { month: 'September', desktop: 130 },
  { month: 'October', mobile: 180 },
  { month: 'November', desktop: 150 },
  { month: 'December', mobile: 130 },
];

const chartConfig = {
  desktop: {
    label: 'Subscription',
    color: '#1E4B8E',
  },
  mobile: {
    label: 'Subscription',
    color: '#F7941D',
  },
} satisfies ChartConfig;

export function ChartComponent() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-xl bg-white rounded-xl"
    >
      <h1 className="text-[14px] font-[open sans] font-semibold ml-2 mb-4 p-2">
        Job Posting Trend Over Time
      </h1>
      <BarChart
        accessibilityLayer
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
        barGap={1}
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={20}
          ticks={[0, 50, 100, 150, 200, 250]}
        />

        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="#1E4B8E" radius={4} />
        <Bar dataKey="mobile" fill="#F7941D" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
