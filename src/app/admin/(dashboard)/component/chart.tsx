'use client';

import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getAuthRole } from "@/Utils/Providers/auth";
import useSuperAdminAnalytics from "@/Routes/Admin/hook/GET/analytics/GetAnalytics.hook";

const chartConfig = {
  job_count: {
    label: "Jobs Posted",
    color: "#1E4B8E"
  }
};

export function ChartComponent() {
  const authRole = getAuthRole();
  const {data: analysisdata} = useSuperAdminAnalytics({
    enabled: authRole === "superadmin",
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-[300px] bg-white rounded-xl"
    >
      <h1 className="text-[14px] font-[open sans] font-semibold ml-2 mb-4 p-2">
        Job Posting Trend Over Time
      </h1>
      <BarChart
        accessibilityLayer
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
        barGap={1}
        data={analysisdata?.monthly_breakdown}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={20}
          ticks={[0, 10, 20, 30, 40, 50,60,70,80,90,100]}
        />

        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="job_count" fill="#1E4B8E" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
