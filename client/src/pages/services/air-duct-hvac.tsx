import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function AirDuctHVAC() {
  const benefits = [
    "Keep your employees and visitors healthy and productive",
    "Extend equipment life and reduce energy costs",
    "Remove contaminants and odors from the air",
    "Employees will be grateful for the comfortable environment of their workplace",
  ];

  return (
    <div>
      <Hero
        title="Air Duct & HVAC"
        subtitle="Professional air duct and HVAC cleaning services to create a healthier and more comfortable environment"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Professional Air Duct and HVAC cleaning and maintenance services can create a healthier and more comfortable environment for your business. To keep the air in your commercial building healthy and clean, it is important to regularly clean and maintains your air ducts and HVAC system. Dust, dirt, and other contaminants can build up in your air ducts over time, potentially causing respiratory problems for your employees or customers.
            </p>
            
            <p className="text-lg mb-8">
              Regularly cleaning your air ducts can help improve indoor air quality and prevent the spread of illnesses. In addition, regular HVAC maintenance can help extend your equipment's life and reduce energy costs.
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
              Investing in professional air duct and HVAC cleaning and maintenance services can create a healthier and more comfortable environment for your business, improve indoor air quality, extend the life of your equipment, and save you money on energy costs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Air Duct & HVAC Services?</h2>
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
