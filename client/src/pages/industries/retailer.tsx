import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";

export default function Retailer() {
  const benefits = [
    "Improve your store's appearance and organization",
    "Improve customer satisfaction",
    "Increase foot traffic",
  ];

  return (
    <div>
      <Hero
        title="Retail Stores"
        subtitle="A well-managed facility can help to create a positive customer experience, which is essential for success in the retail industry"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Maintaining a tidy, well-organized retail store is essential for attracting customers and maintaining a good reputation. However, keeping a store in top condition can be challenging, especially for busy businesses. Excel Facility Services Group can help to keep your store clean and organized, freeing up your staff to focus on more important tasks.
            </p>
            
            <p className="text-lg mb-6">
              Our services range from janitorial services to COVID-19 cleaning. We can handle everything from big to small retail, from a single store to an entire shopping mall. Our continued growth in this market is a testimony to our ability to provide superior service to companies with multi-site portfolios and special floor care needs. We have the best janitorial services regardless of size or demand.
            </p>

            <p className="text-lg mb-8">
              Our attention to detail and relentless work ethic makes us a huge asset to you and your store. Keep shoppers coming back for more. Though shoppers don't see what goes on behind the scenes, they expect shining floors, spotless restrooms, well-kept fitting rooms, comfortable temperatures, safe parking, and more.
            </p>

            <div className="bg-primary/10 rounded-lg p-8 mb-8 border-l-4 border-primary">
              <p className="text-lg italic">
                In today's competitive retail landscape, it's more important than ever for stores to create a positive shopping experience for customers. That means paying attention to the little details, like making sure the store is clean and well-organized. Unfortunately, a new survey suggests that many retailers are falling short in this regard. According to the survey, 64% of shoppers have walked out of a store due to poor physical appearance and disorganization.
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
              At Excel Facility Services, we recognize that cleanliness and organization are vital to your retail store's success. A well-kept environment not only draws customers in but also fosters loyalty and encourages repeat visits. Our dedicated team offers comprehensive cleaning solutions tailored to your specific needs, ensuring that every aspect of your store is immaculate.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">If you want to be the best retail company in your area, we are here to help!</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We keep stores looking their best so customers can enjoy a painless experience and buy from your store without hesitation or regret.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
