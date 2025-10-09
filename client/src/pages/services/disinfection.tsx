import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Disinfection() {
  const benefits = [
    "Protect your employees from harmful bacteria and viruses",
    "Prevent the growth of mold and mildew",
    "Feel confident you are doing everything possible to create a safe and healthy environment for your employees",
    "Rest easy knowing that your building is free of harmful contaminants",
  ];

  return (
    <div>
      <Hero
        title="Disinfection"
        subtitle="Professional disinfection services to reduce the risk of cross-contamination and provide a clean and safe environment"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              In a workplace, disinfection is the process that helps to reduce the risk of cross-contamination and provides a clean and safe environment for employees, customers, and visitors. Many people don't realize how important disinfection is for a commercial building. It is not just about making the place look clean: it is about protecting the people who work there and ensuring they can do their job in a safe and healthy environment.
            </p>
            
            <p className="text-lg mb-8">
              A properly disinfected commercial building is free of harmful bacteria and viruses that could make people sick. In addition, disinfection can help to prolong the life of your building by preventing the growth of mold and mildew. Invest in a quality disinfection program if you own or manage a commercial building. It will pay off in the long run by protecting your employees and keeping your building in good condition.
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
              At Excel Facility Services Group, we prioritize the health and safety of your workplace through our specialized disinfection services. Our expert team understands that regular cleaning is not enough to combat harmful pathogens, which is why we employ advanced disinfection methods tailored to your facility's unique needs.
            </p>

            <p className="text-lg">
              We focus on high-touch areas such as doorknobs, light switches, and communal spaces, utilizing CDC-approved disinfectants to effectively eliminate viruses and bacteria. Our dedication to ensuring a germ-free environment fosters employee confidence and enhances productivity. Let Excel Facility Services Group be your trusted partner in creating a safe, healthy, and welcoming environment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Disinfection Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We disinfect surfaces to provide a clean and safe environment for your business.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
