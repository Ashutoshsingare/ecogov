"use client";

import { useState, useEffect } from "react";
import Certificate from "@/components/training/Certificate";
import { rewards, trainingModules } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

// This is a mock hook to simulate fetching completed modules.
// In a real app, this would come from a context or a server call.
const useCompletedModules = () => {
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

    // Simulate module completion for demonstration
    useEffect(() => {
        const interval = setInterval(() => {
            setCompletedModules(prev => {
                const completedArray = Array.from(prev);
                if (completedArray.length < trainingModules.length) {
                    const nextModuleId = trainingModules[completedArray.length].id;
                    return new Set(prev).add(nextModuleId);
                }
                clearInterval(interval);
                return prev;
            });
        }, 3000); // Complete a module every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return completedModules;
}

export default function RewardsClient() {
  const completedModules = useCompletedModules();
  const allModulesCompleted = completedModules.size === trainingModules.length;

  return (
    <>
      <section id="certification" className="mb-24">
        <AnimatedWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Your Certification</h2>
            <Certificate 
                userName="Your Name" 
                courseName="Waste Management Fundamentals" 
                completionDate={new Date().toLocaleDateString()} 
                isUnlocked={allModulesCompleted} 
            />
        </AnimatedWrapper>
      </section>

      <section id="rewards">
        <AnimatedWrapper>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Rewards & Recognition</h2>
            <p className="text-muted-foreground mt-2">Redeem your hard-earned points for exciting rewards.</p>
          </div>
          <Alert className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">How to Earn Points</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                You earn points for various activities like filing waste reports, completing training modules, and participating in community events. Keep contributing to earn more!
              </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <Card key={index} className={cn("text-center flex flex-col", reward.unlocked ? "border-primary/50 bg-primary/10" : "bg-muted")}>
                <CardHeader>
                  <div className={cn(
                    "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                    reward.unlocked ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  )}>
                    <reward.icon className="w-8 h-8" />
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{reward.description}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                    <p className="mb-4 font-bold text-primary">{reward.points} Points</p>
                    <Button className="w-full" disabled={!reward.unlocked}>
                        {reward.unlocked ? "Redeem" : "Locked"}
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </AnimatedWrapper>
      </section>
    </>
  );
}
