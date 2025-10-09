import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";

export default function Restaurants() {
  const benefits = [
    "Your restaurant will be clean and sanitary",
    "You'll be in compliance with all health and safety regulations",
    "Customers will feel safe and comfortable dining in your establishment",
    "They'll appreciate the effort you put into keeping your business clean",
  ];

  const services = [
    "A cleaner and safer restaurant, from the kitchen to dining area",
    "Dedicated and experienced staff",
    "24-hour operations support and measured inspections",
  ];

  return (
    <div>
      <Hero
        title="Restaurants"
        subtitle="Any restaurant owner knows that a clean and well-maintained dining area is essential for attracting and keeping customers"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              The outbreak of COVID-19 has led to a sharp increase in the importance of commercial cleaning, particularly in the restaurant industry. In addition to the usual concerns about cleanliness and hygiene, restaurants now face the added challenge of preventing the spread of illness. As a result, it is more important than ever to ensure that all surfaces are regularly cleaned and disinfected.
            </p>
            
            <p className="text-lg mb-6">
              Any restaurant owner knows that a clean and well-maintained dining area is essential for attracting and keeping customers. But with the dynamic nature of the restaurant business, it can be challenging to find the time and resources to regularly give your establishment the deep clean it needs. That's where our commercial cleaning services can be a valuable asset.
            </p>

            <p className="text-lg mb-8">
              Commercial cleaning services can help ensure that your restaurant is safe for employees and customers. In addition to regular cleaning, we provide deep-cleaning services that target areas where viruses are most likely to accumulate.
            </p>

            <div className="bg-muted rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Our restaurant cleaning services will provide you with:</h2>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#97CC06] rounded-full mt-2"></div>
                    <span className="text-lg">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/10 rounded-lg p-8 mb-8 border-l-4 border-primary">
              <p className="text-lg font-semibold">
                A survey found that 66% of people are not willing to revisit a restaurant with bad food hygiene. This makes cleanliness even more important to consumers than customer service. Almost all consumers agree that cleanliness is one of the most important things when they visit a restaurant — and our services can help keep your restaurant on their radar!
              </p>
            </div>

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
              At Excel Facility Services, we understand the unique cleaning challenges that restaurants face. A spotless establishment not only enhances the dining experience but also encourages customer retention. Our dedicated team provides a comprehensive range of cleaning services tailored explicitly for the restaurant industry.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Restaurant Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG is committed to exceeding your expectations with reliable cleaning services that keep patrons returning for more.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
