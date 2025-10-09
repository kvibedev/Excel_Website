import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function AutoDealerships() {
  const benefits = [
    "Your dealership will look more organized and professional",
    "Customers will feel like they're valued and important",
    "We keep your environment clean and presentable",
    "We create a safe and healthy workplace for your team",
  ];

  return (
    <div>
      <Hero
        title="Auto Dealership"
        subtitle="A dirty or cluttered dealership will give customers a bad impression and may cause them to go elsewhere"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              A healthy and clean auto dealership plays a role in how customers view your business and the brands you sell. Everything should look shiny and new, from the cars to the service department. Some high-profile areas are front entrances, glass doors, displays, and the showroom floor. The sales area should be clean, bright, and inviting.
            </p>
            
            <p className="text-lg mb-8 font-semibold text-center">
              First impressions are important to customers.
            </p>

            <p className="text-lg mb-8">
              Our professional cleaning service can ultimately help support your sales. We thoroughly disinfect, remove dust, remove the trash, and do overall cleaning. A well-maintained dealership will give off the appearance of a successful business which helps instill confidence in potential buyers.
            </p>

            <p className="text-lg mb-8 text-center font-semibold">
              EFSG service can work out a cleaning schedule that best fits your needs. Our priority is keeping your dealership safe and maintaining a positive image for your customers and employees.
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

            <p className="text-lg">
              To maintain the appeal of your auto dealership, our tailored cleaning services are designed to meet your specific needs. We understand that a clean environment is essential not only for customer satisfaction but also for employee morale. Our experienced team uses advanced cleaning techniques and eco-friendly products to ensure every corner of your dealership sparkles. From detailing the showroom to sanitizing service areas, we prioritize delivering exceptional results that enhance your dealership's reputation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Auto Dealership Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG is committed to exceeding your expectations with cleaning services that help project professionalism and maintain a healthy space.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
