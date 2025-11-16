import ShopClient from "@/components/shop/ShopClient";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <AnimatedWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">EcoGov e-Shop</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Purchase essentials to support your green journey. Quality products for a sustainable lifestyle.
          </p>
        </div>
      </AnimatedWrapper>
      
      <ShopClient />
    </div>
  );
}
