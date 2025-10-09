import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";

export default function OfficeBuilding() {
  const benefits = [
    "Save money and time with a customized program",
    "Get reliable, local service that you can trust",
    "Streamline your operations for sustainable maintenance",
    "Benefit from unparalleled expertise in commercial cleaning services and facility management",
  ];

  return (
    <div>
      <Hero
        title="Office Building"
        subtitle="Reliable facility services to keep your office clean, comfortable, and safe"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              An office is one of the first places potential customers and partners will see when they visit your company. First impressions matter and a clean, well-maintained building will help your business project a professional image. Excel Facility Services Group offers a wide range of commercial cleaning services to keep your office looking its best. From regularly scheduled janitorial services to one-time deep cleans, we can develop a customized cleaning plan that meets your specific needs. Our experienced professionals only use the latest equipment and techniques to get the job done correctly.
            </p>
            
            <p className="text-lg mb-8">
              Excel Facility Services Group can help you get organized and create a space that reflects professionalism and attention to detail. We understand that privacy is very important in an office setting, so we are willing to work with our customers on scheduling times for cleaning their offices when no one else will be there.
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
              Excel Facility's Commercial Cleaning Service is certified by the Green Seal Standard for Commercial and Institutional Cleaning Services. This certification guarantees that your office has been cleaned to the highest standards in the industry. When you partner with EFSG, you can be confident that your office will always make a positive impression.
            </p>

            <p className="text-lg">
              At Excel Facility Services Group, we believe that a clean office goes beyond aesthetics; it's essential for employee productivity and overall well-being. Our dedicated team is committed to creating an environment that promotes focus and collaboration. We understand that every office space is unique, which is why we take the time to assess your specific needs and offer personalized cleaning solutions that work for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your office is an important part of your business, so why not make it look great?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG provides reliable facility services to keep your office clean, comfortable, and safe.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
