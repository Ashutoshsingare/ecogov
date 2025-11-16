import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import Certificate from "@/components/training/Certificate";
import RewardsClient from "@/components/rewards/RewardsClient";

export default function RewardsPage() {

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
        <AnimatedWrapper>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Rewards & Certification</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Your achievements and rewards for contributing to a greener tomorrow.
                </p>
            </div>
      </AnimatedWrapper>

      <RewardsClient />
      
    </div>
  );
}
