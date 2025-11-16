import TrainingCard from "@/components/training/TrainingCard";
import Quiz from "@/components/training/Quiz";
import Certificate from "@/components/training/Certificate";
import { trainingModules, rewards } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TrainingPage() {
  const allModulesCompleted = !trainingModules.some(m => m.isLocked);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">EcoGov Training Hub</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Empower yourself with the knowledge to make a difference. Start your learning journey today.
          </p>
        </div>
      </AnimatedWrapper>

      <section id="modules" className="mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trainingModules.map((module, index) => (
            <AnimatedWrapper key={module.id} delay={index * 0.1}>
              <TrainingCard module={module} />
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
    </div>
  );
}
