import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function DayPorters() {
  const benefits = [
    "Keep your building clean and presentable at all times",
    "Help reduce the spread of germs and viruses in high-traffic areas",
    "Provide general maintenance and repair services",
    "Feel reassured that your building is being taken care of by professionals",
    "Know that your employees are being taken care of in a safe and healthy environment",
  ];

  return (
    <div>
      <Hero
        title="Day Porters"
        subtitle="Professional maintenance to keep your building clean, presentable, and inviting at all times"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. A day porter is responsible for ensuring your building looks professional, clean, presentable, and inviting at all times, but especially during routine cleaning and maintenance activities. In the wake of the COVID-19 pandemic, their role has become even more critical in ensuring commercial buildings' health and safety standards.
            </p>
            
            <p className="text-lg mb-8">
              For example, day porters are responsible for regularly sanitizing high-traffic areas such as lobbies, elevators, and restrooms. They also collect and recycle items, empty ashtrays and waste bins, and sweep and mop floors. In addition, day porters may also be responsible for setting up meeting rooms and event spaces while providing general maintenance and repair services. Day porters play a vital role in ensuring that commercial buildings are safe and welcoming environments for everyone.
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
              Day porters keep your building clean, safe, and looking great so you can focus on what matters the most.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Day Porter Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG delivers reliable and consistent commercial cleaning services to businesses of all sizes. We have the experience and expertise to get the job done right every time.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
