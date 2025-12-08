import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import TrainingClient from "@/components/training/TrainingClient";

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

      <TrainingClient />

    </div>
  );
}
