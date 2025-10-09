import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Janitorial() {
  const benefits = [
    "Keep your workplace looking clean and professional",
    "Ensure a safe and healthy environment for employees",
    "Relax – let the professionals take care of janitorial services",
    "Variety of services offered to meet your specific needs",
    "Cost-effective solutions for businesses of all sizes",
  ];

  return (
    <div>
      <Hero
        title="Commercial Janitorial Services"
        subtitle="Specialized commercial janitorial services tailored to meet the needs of businesses of all sizes"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              When it comes to maintaining a spotless and professional commercial space, janitorial services are crucial. Regardless of the type of business you run – an office building, retail store, distribution center, or any other establishment – the importance of keeping your workplace tidy must be considered. Excel Facility Services Group (EFSG) specializes in providing comprehensive commercial janitorial services tailored to meet the needs of businesses of all sizes.
            </p>
            
            <p className="text-lg mb-6">
              We understand that a clean and well-maintained commercial space is important to the success of your business. At EFSG, we pride ourselves on our team of experienced professionals who possess the skills and expertise required to handle all your janitorial and cleaning requirements with the utmost precision and efficiency. Our dedicated janitors are well-versed in many cleaning tasks, including dusting, mopping, sweeping, vacuuming, disinfecting bathrooms and kitchens, disposing trash, and polishing floors.
            </p>

            <p className="text-lg mb-8">
              What truly sets EFSG apart is our unwavering commitment to delivering reliable and consistent janitorial and cleaning services. We fully understand the significance of creating a safe and healthy environment for your employees. Hence, we prioritize thorough cleaning and disinfection practices to ensure optimal hygiene. With our expertise, you can confidently focus on running your business while we handle all your janitorial duties.
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
              At Excel Facility Services Group, we recognize that first impressions matter, and a clean commercial space is vital for ensuring client satisfaction and employee productivity. Our commercial janitorial services are designed to provide businesses with a consistent and high-quality cleaning experience, allowing you to focus on what you do best.
            </p>

            <p className="text-lg">
              We offer flexible scheduling options to accommodate your operational hours, ensuring that our cleaning services align with your business needs. Our trained staff uses state-of-the-art equipment and eco-friendly products to deliver effective cleaning solutions without disrupting your daily operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Janitorial Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Excel Facility Services Group is a commercial janitorial services company that can take care of all your cleaning needs so that you can focus on your business.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
