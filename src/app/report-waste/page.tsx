import WasteReportForm from "@/components/reporting/WasteReportForm";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

export default function ReportWastePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Report a Waste Issue</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Help us keep our communities clean. Submit a photo and description of any waste management issue you see.
          </p>
        </div>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.2}>
        <WasteReportForm />
      </AnimatedWrapper>
    </div>
  );
}
