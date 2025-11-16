"use client"

import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { wasteGenerationData } from "@/lib/data"

const chartConfig = {
  total: {
    label: "Waste (Tonnes)",
    color: "hsl(var(--primary))",
  },
}

export default function WasteGenerationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Generation Trend</CardTitle>
        <CardDescription>Total waste collected over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={wasteGenerationData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
