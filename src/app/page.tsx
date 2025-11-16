import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { landingStats, landingFeatures, testimonials } from "@/lib/data";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import AnimatedStat from "@/components/shared/AnimatedStat";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedWrapper>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
                Building a Cleaner, Greener India. Together.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                EcoGov is the national platform empowering citizens and municipalities to revolutionize waste management.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/training">Start Training</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/report-waste">Report Waste</Link>
                </Button>
              </div>
            </AnimatedWrapper>
            <AnimatedWrapper delay={0.2}>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </AnimatedWrapper>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {landingStats.map((stat, index) => (
                <AnimatedWrapper key={stat.label} delay={index * 0.1}>
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-10 h-10 text-primary mb-2" />
                    <div className="text-4xl font-bold text-foreground">
                      <AnimatedStat value={stat.value} />+
                    </div>
                    <p className="text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-16 sm:py-24">
          <AnimatedWrapper className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">A Platform for Change</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Everything you need to contribute to a cleaner environment, all in one place.
            </p>
          </AnimatedWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingFeatures.map((feature, index) => (
              <AnimatedWrapper key={feature.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full ${feature.bgColor} mb-4`}>
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="community" className="bg-card">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <AnimatedWrapper className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Voices of Our Community</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                See how EcoGov is making a difference in people's lives.
              </p>
            </AnimatedWrapper>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                          <blockquote className="text-muted-foreground mb-6">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-foreground">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section id="join" className="container mx-auto px-4 py-24 text-center">
          <AnimatedWrapper>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Make an Impact?</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Join thousands of citizens and become a part of the solution. Your journey to a greener tomorrow starts now.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">Join EcoGov Today</Link>
              </Button>
            </div>
          </AnimatedWrapper>
        </section>
      </main>
    </div>
  );
}
