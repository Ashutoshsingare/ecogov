"use client";

import type { Facility } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Recycle, Zap, Factory } from "lucide-react";

type FacilityListProps = {
  facilities: Facility[];
  onFacilitySelect: (facility: Facility) => void;
  selectedFacilityId?: string;
};

const getIcon = (type: Facility['type']) => {
  const commonClass = "w-5 h-5 mr-3";
  switch (type) {
    case "Recycling":
      return <Recycle className={cn(commonClass, "text-blue-500")} />;
    case "WTE":
      return <Zap className={cn(commonClass, "text-amber-500")} />;
    case "Biomethanation":
      return <Factory className={cn(commonClass, "text-green-500")} />;
    default:
      return null;
  }
};

export default function FacilityList({ facilities, onFacilitySelect, selectedFacilityId }: FacilityListProps) {
  return (
    <div className="h-full">
        <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">All Facilities ({facilities.length})</h3>
        </div>
        <ScrollArea className="h-full">
            <div className="p-2 space-y-2">
                {facilities.map((facility) => (
                    <button
                        key={facility.id}
                        onClick={() => onFacilitySelect(facility)}
                        className={cn(
                            "w-full text-left p-3 rounded-lg transition-colors",
                            selectedFacilityId === facility.id
                            ? "bg-accent"
                            : "hover:bg-muted/50"
                        )}
                    >
                        <div className="flex items-center">
                            {getIcon(facility.type)}
                            <div>
                                <p className="font-semibold text-sm">{facility.name}</p>
                                <p className="text-xs text-muted-foreground">{facility.type} Plant</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </ScrollArea>
    </div>
  );
}
