import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function CommercialCleaning() {
  const industries = [
    "Offices",
    "School",
    "Restaurants",
    "Medical Groups",
    "Banks",
    "Retail Stores",
    "Theaters",
    "Transportation",
    "Auto Dealerships",
    "Government Facilities",
  ];

  const services = [
    "Janitorial",
    "Carpet Extraction",
    "Power Washing",
    "Floor Care",
    "Disinfecting",
    "Window Washing",
  ];

  return (
    <div>
      <Hero
        title="Leave the Commercial Cleaning to our Pro's"
        subtitle="Excel Facility Services is a Commercial Janitorial Service Company that can deliver exceptional services designed to ensure a clean, safe, and healthy environment for your staff and clients."
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8">
              Excel Facility Services is a Commercial Janitorial Service Company that can deliver exceptional services. We have programs that are designed to ensure a clean, safe, and healthy environment for your staff and clients. Our services include but are not limited to Daily Janitorial Services, Window Washing, Carpet Extraction, Power Washing and so much more.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-center">Get Your FREE Quote Today!</h2>
            <p className="text-lg mb-8">
              Once you partner up with Excel Facility Services, we will guarantee Customer Satisfaction as your vendor or as your facility management firm. As our potential client you can be sure that we will address your concerns in a timely manner, with complete accuracy, transparent communication, and in a professional manner. We do this by providing management training, employee training, innovative technology for both the client and employee, a complete understanding of the building's needs, and adjusted cleaning programs due to the new normal. Whatever your facility needs are, Excel Facility Services can ensure services are delivered accordingly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Find Your Industry</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {industries.map((industry, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                      <span>{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Find Your Need</h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-lg text-center font-semibold">
              We can provide you with services tailored to your needs for your industry.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your FREE Quote Today!</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today at (800) 593-2414 or email info@efsgnj.com
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
