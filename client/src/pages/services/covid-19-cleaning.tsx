import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Covid19Cleaning() {
  const benefits = [
    "Keep your office clean and safe from bacteria and viruses, including COVID-19",
    "Get a complete package of cleaning services designed to kill germs and viruses",
    "Use the latest equipment and techniques to disinfect your office from top to bottom",
    "Feel reassured that your workplace is being cleaned by certified professionals using the latest technology",
  ];

  return (
    <div>
      <Hero
        title="COVID-19 Cleaning"
        subtitle="Comprehensive COVID-19 cleaning services to keep your premises safe and clean"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              To help keep employees and customers safe, Excel Facility Services Group has adapted its commercial cleaning services to meet the new reality of the business world with its COVID-19 Cleaning Service.
            </p>
            
            <p className="text-lg mb-8">
              COVID-19 Cleaning is the perfect solution for corporate offices that want to keep their premises safe and clean. EFSG offers a complete package of cleaning services designed to kill bacteria and viruses, including the COVID-19 virus. Our team of experienced and certified professionals uses the latest equipment and techniques to disinfect your workplace from top to bottom.
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
              EFSG can help create a safe and healthy workplace for everyone by taking these extra steps. Contact us today to learn more about our COVID-19 cleaning services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional COVID-19 Cleaning Services?</h2>
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
