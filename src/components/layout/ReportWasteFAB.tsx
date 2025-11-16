import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ReportWasteFAB() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          >
            <Link href="/report-waste" aria-label="Report Waste">
              <Plus className="h-6 w-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Report Waste</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
