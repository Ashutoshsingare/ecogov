import Image from "next/image";
import Link from "next/link";
import { Lock, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TrainingModule } from "@/lib/types";
import { cn } from "@/lib/utils";

type TrainingCardProps = {
  module: TrainingModule;
  onStart: (moduleId: string) => void;
  isCompleted: boolean;
};

export default function TrainingCard({ module, onStart, isCompleted }: TrainingCardProps) {
  return (
    <Card className={cn(
        "overflow-hidden h-full flex flex-col group transition-all duration-300",
        isCompleted && "border-green-500",
        !module.isLocked && "hover:shadow-xl hover:-translate-y-1"
    )}>
      <div className="relative">
        <Image
          src={module.imageUrl}
          alt={module.title}
          width={400}
          height={250}
          className={cn(
              "w-full object-cover aspect-[4/3] transition-transform duration-300",
              !module.isLocked && "group-hover:scale-105"
            )}
          data-ai-hint={module.imageHint}
        />
        {module.isLocked && !isCompleted && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-12 h-12 text-white" />
          </div>
        )}
        {isCompleted && (
             <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-white" />
            </div>
        )}
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{module.title}</h3>
        <p className="text-muted-foreground text-sm">{module.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Badge variant="secondary" className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {module.duration}
        </Badge>
        <Button 
            onClick={() => onStart(module.id)} 
            disabled={module.isLocked || isCompleted} 
            variant={module.isLocked ? "secondary" : "default"}
            className={cn(isCompleted && "bg-green-600 hover:bg-green-700")}
        >
          {isCompleted ? "Completed" : module.isLocked ? "Locked" : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
}
