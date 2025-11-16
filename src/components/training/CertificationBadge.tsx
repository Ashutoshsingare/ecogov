import { BadgeCheck, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CertificationBadgeProps = {
  title: string;
  isUnlocked: boolean;
};

export default function CertificationBadge({ title, isUnlocked }: CertificationBadgeProps) {
  return (
    <Card className={cn(
      "w-full max-w-sm mx-auto text-center transition-all duration-300",
      isUnlocked ? "border-primary/50 bg-primary/10" : "bg-muted"
    )}>
      <CardContent className="p-6">
        <div className={cn(
          "mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-colors",
          isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
        )}>
          {isUnlocked ? (
            <BadgeCheck className="w-12 h-12" />
          ) : (
            <Lock className="w-12 h-12" />
          )}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{isUnlocked ? "Completed" : "Locked"}</p>
      </CardContent>
    </Card>
  );
}
