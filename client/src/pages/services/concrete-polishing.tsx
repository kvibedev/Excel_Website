import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function ConcretePolishing() {
  const benefits = [
    "Your concrete will be smoother, more durable, and easier to clean",
    "Polished concrete is more slip-resistant than unsealed concrete",
    "Transform your drab concrete into a beautiful showpiece",
    "Give your business an edge over the competition with high-traffic areas that are safe and easy to navigate",
  ];

  return (
    <div>
      <Hero
        title="Concrete Polishing"
        subtitle="Cost-effective, durable, and beautiful polished concrete floors for your business"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Polished concrete floors are a great option for businesses because they are cost-effective, easy to clean, and resistant to allergens. Concrete polishing is a process that uses specialized equipment to grind and smooth surfaces. The process can be used on both new and existing concrete, producing various benefits. Concrete polishing can improve the appearance of concrete, increase its durability, and make it easier to clean. In addition, polished concrete is more slip-resistant than unsealed concrete, making it an ideal choice for high-traffic areas.
            </p>
            
            <p className="text-lg mb-8">
              Our polishing process begins with applying coarse diamond abrasives to the surface of the concrete. These abrasives remove imperfections and create a smooth base for the next step in the process. Fine diamond abrasives are then used to refine the surface of the concrete until it meets the desired level of shine. Finally, a sealer protects the polished surface from stains and wear. As a result, concrete polishing is an increasingly popular choice for commercial buildings that our team is happy to offer.
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
              At Excel Facility Services Group, we specialize in concrete polishing services that elevate the aesthetics and functionality of your commercial space. Polished concrete floors not only provide a sleek and modern look but also enhance the overall durability and resistance of your flooring. Our team employs advanced techniques and state-of-the-art equipment to achieve a high-gloss finish that transforms dull concrete into a beautiful and professional surface.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Concrete Polishing Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Polished concrete is highly durable and resistant to staining, making it an ideal choice for high-traffic areas. The smooth surface is also easy to clean and maintain, saving you time and money in the long run.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
