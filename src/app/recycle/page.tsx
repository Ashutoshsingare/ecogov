import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import RecycleForm from "@/components/recycling/RecycleForm";

export default function RecyclePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Schedule a Pickup</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have segregated waste ready for recycling? Let us know where to pick it up.
          </p>
        </div>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.2}>
        <RecycleForm />
      </AnimatedWrapper>
    </div>
  );
}
