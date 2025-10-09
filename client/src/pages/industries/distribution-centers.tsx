import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";

export default function DistributionCenters() {
  const services = [
    "Janitorial Services",
    "Covid-19 Cleaning",
    "Disinfecting",
    "Concrete polishing",
    "And more!",
  ];

  return (
    <div>
      <Hero
        title="Distribution Centers"
        subtitle="With our three-step approach that delivers healthy distribution centers, you can be assured that your facility will always operate safely and efficiently"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8">
              A distribution center is a critical link in the supply chain, and keeping it clean is essential to maintaining efficient operations. Dust, dirt, and other particulates can build up on surfaces and equipment, leading to increased wear and tear.
            </p>

            <p className="text-lg mb-8">
              When we work with a distribution center, our team takes cleanliness and safety seriously, especially since the COVID-19 pandemic. We understand that the constant flow of foot traffic in and out of the facility can quickly become a hotbed for viruses. That's why Excel Facility Services Group ensures clean air quality by keeping germ-free surfaces, including high-touch areas like loading docks or storerooms where shipping pallets transfer over to storage spaces. We also disinfect these parts with chemicals so no grime remains on them.
            </p>

            <div className="bg-muted rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Our Services Include:</h2>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                    <span className="text-lg">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg mb-6">
              Excel Facility Services Group's distribution center cleaning service creates a safe and healthy environment for your employees, customers, and partners by taking these extra steps.
            </p>

            <p className="text-lg">
              At Excel Facility Services Group, we recognize that cleanliness is vital for the seamless operation of your distribution center. A clean facility not only promotes employee health but also ensures optimal performance in every function. Our specialized team is trained to address the unique challenges of maintaining cleanliness in high-traffic environments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Distribution Center Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            By partnering with us, you can reduce the risk of illness in the workplace and create a welcoming space for employees and visitors alike.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
