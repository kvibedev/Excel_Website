import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function FloorCare() {
  const benefits = [
    "Your floors will look clean and polished",
    "You will make a great first impression on customers and employees",
    "Feel proud of your business's appearance",
    "Enjoy the peace of mind that comes with knowing your floors are always taken care of",
  ];

  return (
    <div>
      <Hero
        title="Floor Care"
        subtitle="Professional floor care services to maintain clean and polished floors that make a great impression"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              First impressions are crucial in nearly every industry, so it is essential to take the time to clean and polish your floors regularly. The condition of the floor tells you everything about how well a business is being run. First impressions are essential; if potential or existing customers see stained or dirty floors, they will likely go elsewhere for their purchase rather than with your company again because it could negatively affect customer loyalty.
            </p>
            
            <p className="text-lg mb-8">
              Our Floor care professionals have the expertise to thoroughly clean and protect your floors, keeping them looking their best and extending their lifespan. Not to mention, a healthy floor is safer; slips and falls are less likely on a smooth, clean surface. In short, investing in floor care is an investment in your business. So when it comes to choosing a floor care provider, be sure to select a reliable, experienced company that will get the job done right.
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
              A clean, healthy, and well-maintained floor is important to your business. Let EFSG take care of it for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Floor Care Services?</h2>
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
