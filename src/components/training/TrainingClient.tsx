"use client";

import { useState } from "react";
import { trainingModules as initialModules, rewards, quizQuestions } from "@/lib/data";
import TrainingCard from "@/components/training/TrainingCard";
import Quiz from "@/components/training/Quiz";
import Certificate from "@/components/training/Certificate";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TrainingModule } from "@/lib/types";

export default function TrainingClient() {
  const [modules, setModules] = useState<TrainingModule[]>(initialModules);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => new Set(prev).add(moduleId));
    setModules(prevModules => {
      const currentModuleIndex = prevModules.findIndex(m => m.id === moduleId);
      if (currentModuleIndex !== -1 && currentModuleIndex + 1 < prevModules.length) {
        const newModules = [...prevModules];
        newModules[currentModuleIndex + 1] = { ...newModules[currentModuleIndex + 1], isLocked: false };
        return newModules;
      }
      return prevModules;
    });
  };

  // This is a placeholder for a proper "start module" action
  const handleStartModule = (moduleId: string) => {
    console.log("Starting module", moduleId);
    // In a real app, you'd navigate to a module-specific page.
    // For this simulation, we'll just complete it after a delay.
    setTimeout(() => {
        handleModuleComplete(moduleId);
    }, 2000);
  }

  const allModulesCompleted = modules.every(m => completedModules.has(m.id));

  return (
    <>
      <section id="modules" className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <AnimatedWrapper key={module.id} delay={index * 0.1}>
              <TrainingCard 
                module={module} 
                onStart={() => handleStartModule(module.id)} 
                isCompleted={completedModules.has(module.id)}
              />
            </AnimatedWrapper>
          ))}
        </div>
      </section>

      <section id="quiz" className="mb-24">
        <AnimatedWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Test Your Knowledge</h2>
            <Quiz />
        </AnimatedWrapper>
      </section>
      
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
