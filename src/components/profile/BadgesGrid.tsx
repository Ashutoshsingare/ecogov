import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { userBadges } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BadgesGrid() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>My Badges</CardTitle>
            <CardDescription>Your collection of achievements on EcoGov.</CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {userBadges.map((badge) => (
                    <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={cn(
                                "flex h-20 w-20 items-center justify-center rounded-full transition-all",
                                badge.unlocked
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground"
                                )}
                            >
                                <badge.icon className="h-10 w-10" />
                            </div>
                            <p className="text-xs text-center text-muted-foreground truncate w-20">{badge.name}</p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">{badge.name}</p>
                        <p>{badge.description}</p>
                    </TooltipContent>
                    </Tooltip>
                ))}
                </div>
            </TooltipProvider>
      </CardContent>
    </Card>
  );
}
