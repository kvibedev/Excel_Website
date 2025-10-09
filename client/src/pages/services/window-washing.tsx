import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function WindowWashing() {
  const benefits = [
    "Improve the appearance of the building",
    "Extend the life of windows",
    "Improve indoor air quality",
    "Make your business look more professional",
  ];

  return (
    <div>
      <Hero
        title="Window Washing"
        subtitle="Professional window washing services to keep your commercial building looking its best"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Window washing is a necessary service for keeping a commercial building looking its best. Our services not only improve the appearance of the building but also help extend the life of window panes by removing dirt, debris, and other corrosive materials. Excel Facility Services Group's window washing service can help improve indoor air quality by reducing the dust and allergens that circulate inside the building.
            </p>
            
            <p className="text-lg mb-8">
              Window washing makes your workplace look cleaner and inviting; it can help remove any build-up of dirt, pollen, and other allergens that can accumulate on windows over time. It can also help prolong your windows' life by preventing damage from the elements and help increase natural light levels in a room, making it more cheerful and inviting.
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

            <p className="text-lg mb-6">
              At Excel Facility Services Group, our commitment to excellence extends beyond traditional cleaning. Our professional window washing services ensure that your commercial building shines, creating an inviting atmosphere for both employees and customers. We understand that clean windows are essential in projecting a positive image of your business.
            </p>

            <p className="text-lg">
              By increasing natural light and enhancing visibility, our window washing services contribute to a more vibrant and productive work environment. Whether you manage an office building, retail space, or industrial facility, we can tailor our window cleaning solutions to meet your specific needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Window Washing Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team has years of experience in providing top-notch window cleaning services that will leave your business looking great. Contact us today to create a custom maintenance plan!
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
