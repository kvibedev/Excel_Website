import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";

export default function Banks() {
  const benefits = [
    "Keep your customers feeling confident about their money",
    "Help your bank stay competitive",
    "Allow your customers to have a positive experience when visiting your bank",
    "Make them feel like their money is in good hands",
  ];

  return (
    <div>
      <Hero
        title="Banks"
        subtitle="Your customers need to feel confident that their money is in good hands, and a clean, well-maintained facility helps transmit that trust"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              At Excel Facility Services, we understand that the COVID-19 pandemic brought unprecedented challenges to the banking industry. As a result, bank facilities must now navigate a complex landscape of still-evolving health and safety guidelines while continuing to provide a safe and welcoming environment for customers and employees.
            </p>
            
            <p className="text-lg mb-8">
              When visiting our local banks, we've all had the uncomfortable experience of walking into an establishment that smells unpleasant, looks like the carpets haven't been cleaned in years, and seems poorly lit. Of course, no bank can afford to exhibit any of those unwelcoming characteristics, especially with industry competition at an all-time high. Your customers need to feel confident that their money is in good hands, and a clean, well-maintained facility helps transmit that trust.
            </p>

            <p className="text-lg mb-8 text-center font-semibold">
              Our team of experts is here to help. We offer a three-step approach to cleaning and disinfecting bank facilities that are proven to eliminate viruses and bacteria effectively. Our process begins with thoroughly cleaning all surfaces, followed by certified disinfection with green-grade products.
            </p>

            <p className="text-lg mb-8 text-center font-semibold">
              We provide ongoing support to ensure that your facility remains clean and healthy. With our help, you can be confident that your bank is taking all the necessary steps to protect your employees and customers.
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
              At Excel Facility Services, we recognize that maintaining a pristine environment in your bank is crucial for building and retaining customer trust. A clean and inviting atmosphere not only reassures clients about the safety of their funds but also enhances their overall banking experience. Our specialized cleaning solutions are designed to address the unique challenges faced by financial institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Bank Facility Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG is committed to exceeding your expectations with reliable cleaning services tailored for financial institutions.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
