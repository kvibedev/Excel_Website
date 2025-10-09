import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function CarpetExtraction() {
  const benefits = [
    "Remove dirt, dust, and allergens from carpets",
    "Prolong the life of your carpets",
    "Keep your employees healthy and safe by removing allergens from the carpet",
    "Protect your investment in expensive commercial carpeting",
  ];

  return (
    <div>
      <Hero
        title="Carpet Extraction"
        subtitle="Professional carpet extraction services with special equipment and techniques to ensure safe and effective cleaning"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Commercial carpet extraction requires special equipment and techniques to ensure that the carpet is cleaned safely and effectively. Carpet extraction can be challenging to manage and maintain within a commercial building. The right equipment and expertise are crucial for safe, effective work that meets all health regulations while minimizing disruption to your business continuity plan. It also prevents any negative impact on daily operations and customer care.
            </p>
            
            <p className="text-lg mb-8">
              Carpet extraction requires special equipment and techniques to ensure that the carpet is cleaned safely and effectively. This method is often used in commercial carpet cleaning because it removes carpet dirt, dust, and other allergens. It is also relatively gentle on carpet fibers, making it ideal for sensitive carpets. EFSG extraction carpet service can help prolong your carpet's life by removing dirt and debris damage over time.
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
              To keep your carpeting clean and fresh, call the professionals! EFSG has extraction equipment that will remove dirt from any area of your commercial building.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Carpet Extraction Services?</h2>
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
