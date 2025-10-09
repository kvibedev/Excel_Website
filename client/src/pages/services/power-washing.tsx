import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function PowerWashing() {
  const benefits = [
    "Removes dirt, grime, salt, and other debris quickly and easily",
    "Brightens and protects your building's exterior",
    "Prevents premature aging and degradation of materials",
    "Removes mold and mildew",
  ];

  return (
    <div>
      <Hero
        title="Power Washing"
        subtitle="Quick and efficient power washing to keep the outside of your business clean and looking great"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Looking to get the outside of your business clean? Look no further than power washing! This quick and efficient method will have your building looking good as new in no time. Power washing is the quickest, most efficient way to clean the outside of your commercial building. It is ideal for removing dirt, grime, salt, and other debris that can build up on your structure over time.
            </p>
            
            <p className="text-lg mb-8">
              Power washing also helps to brighten and protect your building's exterior; to prevent premature aging and degradation of building materials by removing the build-up of dirt and debris. Power washing is essential to maintaining a clean, healthy, and safe commercial building.
            </p>

            <div className="bg-muted rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#97CC06] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg text-center font-semibold">
              To ensure a clean, healthy, and safe commercial building, be sure to incorporate regular power washing into your maintenance routine.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Power Washing Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Excel Facility Services Group delivers reliable and consistent commercial cleaning services to businesses of all sizes. We have the experience and expertise to get the job done right, every time.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
