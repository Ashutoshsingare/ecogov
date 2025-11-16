"use client";

import { useState, useEffect } from "react";
import Certificate from "@/components/training/Certificate";
import { rewards, trainingModules } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
                userName="John Doe" 
                courseName="Waste Management Fundamentals" 
                completionDate={new Date().toLocaleDateString()} 
                isUnlocked={allModulesCompleted} 
            />
        </AnimatedWrapper>
      </section>

      <section id="rewards">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold mb-8 text-center">Rewards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <Card key={index} className={cn("text-center", reward.unlocked ? "border-primary/50 bg-primary/10" : "bg-muted")}>
                <CardHeader>
                  <div className={cn(
                    "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                    reward.unlocked ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  )}>
                    <reward.icon className="w-8 h-8" />
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reward.description}</p>
                  <p className="mt-4 font-bold text-primary">{reward.points} Points</p>
                  <Button className="mt-4" disabled={!reward.unlocked}>
                    {reward.unlocked ? "Claim Reward" : "Locked"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedWrapper>
      </section>
    </>
  );
}
