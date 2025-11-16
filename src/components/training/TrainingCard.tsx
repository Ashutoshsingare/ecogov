import Image from "next/image";
import Link from "next/link";
import { Lock, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TrainingModule } from "@/lib/types";

type TrainingCardProps = {
  module: TrainingModule;
};

export default function TrainingCard({ module }: TrainingCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={module.imageUrl}
          alt={module.title}
          width={400}
          height={250}
          className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={module.imageHint}
        />
        {module.isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="w-12 h-12 text-white" />
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
        <Button asChild disabled={module.isLocked} variant={module.isLocked ? "secondary" : "default"}>
          <Link href={`/training/${module.id}`}>{module.isLocked ? "Locked" : "Start Learning"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
