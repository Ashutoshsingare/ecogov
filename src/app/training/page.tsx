import TrainingCard from "@/components/training/TrainingCard";
import Quiz from "@/components/training/Quiz";
import CertificationBadge from "@/components/training/CertificationBadge";
import { trainingModules } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

export default function TrainingPage() {
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

      <section id="certification">
        <AnimatedWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Your Certification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CertificationBadge title="Waste Management Fundamentals" isUnlocked={true} />
                <CertificationBadge title="Advanced Recycling Techniques" isUnlocked={false} />
            </div>
        </AnimatedWrapper>
      </section>
    </div>
  );
}
