import FacilityMap from "@/components/facilities/FacilityMap";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

export default function FacilitiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Facility Locator</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find recycling centers, waste-to-energy plants, and other facilities near you.
          </p>
        </div>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.2}>
        <FacilityMap />
      </AnimatedWrapper>
    </div>
  );
}
