"use client";

import StatCard from "@/components/dashboard/StatCard";
import WasteGenerationChart from "@/components/dashboard/WasteGenerationChart";
import WasteSegregationChart from "@/components/dashboard/WasteSegregationChart";
import ViolationsTable from "@/components/dashboard/ViolationsTable";
import VehicleMap from "@/components/dashboard/VehicleMap";
import { dashboardStats } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

export default function DashboardClient() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, i) => (
            <AnimatedWrapper key={stat.label} delay={i * 0.1}>
              <StatCard item={stat} />
            </AnimatedWrapper>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <AnimatedWrapper className="col-span-1 lg:col-span-4" delay={0.1}>
            <WasteGenerationChart />
          </AnimatedWrapper>
          <AnimatedWrapper className="col-span-1 lg:col-span-3" delay={0.2}>
            <WasteSegregationChart />
          </AnimatedWrapper>
        </div>
        <div className="grid gap-4 grid-cols-1">
          <AnimatedWrapper delay={0.3}>
            <ViolationsTable />
          </AnimatedWrapper>
        </div>
         <div className="grid gap-4 grid-cols-1">
          <AnimatedWrapper delay={0.4}>
            <VehicleMap />
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
