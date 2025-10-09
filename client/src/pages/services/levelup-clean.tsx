import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function LevelUpClean() {
  const features = [
    "Contamination Cleaning",
    "Day Porter Services",
    "Disinfecting Services Added To Routine Cleaning",
    "Electrostatic Technology Used For Cleaning Intervals",
    "Trained Excel Associates",
    "Competitive Supply Resource",
    "The program is Aligned With All Government Agencies",
    "Recommendations Such As The CDC, WHO, and OSHA",
  ];

  return (
    <div>
      <Hero
        title="LevelUp Clean®"
        subtitle="A healthier space for businesses and people to thrive! We help clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy workplaces with certified disinfection."
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8">
              At Excel Facility Services Group, we pride ourselves on the high quality of our janitorial services and the long-standing relationships we form with our customers. We understand that the key to providing excellent service is through communication and collaboration: working closely with our customers to ensure their needs are being met and are happy with the results. EFSG is proud to be a fully insured and bonded company, so you can trust that your facility is in good hands.
            </p>

            <div className="bg-primary/5 rounded-lg p-8 mb-8 border-2 border-primary/20">
              <h2 className="text-3xl font-bold mb-6 text-center">The LevelUp Clean® Comprehensive Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#97CC06] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl font-semibold text-center mb-6">
              At EFSG, we understand that people matter
            </p>
            
            <p className="text-lg text-center mb-8">
              For this reason, we dedicate ourselves to providing janitorial solutions that help businesses run smoothly and efficiently.
            </p>

            <p className="text-lg text-center">
              Contact us today to learn more about how we can help you create a thriving workplace for your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Creating Healthier Workplaces</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you are looking for a commercial cleaning company you can trust to get the job done right, look no further than Excel Facility Services Group and request an estimate today!
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
