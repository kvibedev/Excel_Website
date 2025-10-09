import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";

export default function MedicalGroups() {
  const benefits = [
    "Improve patient safety",
    "Comply with regulations",
    "Increase satisfaction",
    "Feel confident that you're providing the safest environment possible for your employees, patients, and visitors",
  ];

  return (
    <div>
      <Hero
        title="Medical Groups"
        subtitle="It is crucial for medical groups to have a clean and healthy environment for their patients, staff, and visitors"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              A clean environment helps prevent the spread of illness and infection and makes a good impression on anyone who enters the facility — visitors, patients, and staff alike. At Excel Facility Services Group, we understand how important creating a positive and welcoming environment for your patients is. That's why we offer a full range of janitorial services designed to keep your hospital or medical office looking its best. From general cleaning and trash removal to deep cleaning and carpet shampooing, our team will work tirelessly to exceed your expectations.
            </p>
            
            <p className="text-lg mb-8">
              The healthcare industry has seen many changes in recent years, and Excel Facility Services Group has been at the forefront of innovation, providing a full range of services to meet the needs of our clients. From hospitals and clinics to long-term care facilities and outpatient services, we have the expertise and experience to ensure that your facilities are well-maintained and safe for patients, staff, and visitors. Our commitment to quality is evident in everything we do, and we take great pride in being a trusted partner for healthcare organizations across the country. In the wake of COVID-19, we have redoubled our efforts to ensure that our client's facilities are clean and safe for everyone who enters them.
            </p>

            <p className="text-lg mb-8 text-center font-semibold">
              Our specialized team is trained to follow infection control protocols. This helps to ensure that all areas of the facility are adequately cleaned and disinfected. As a result, medical groups can feel confident that their environment is safe and clean when they partner with a commercial cleaning company.
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
              We help medical groups to navigate change, and provide them with assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy spaces with certified disinfection. In healthcare, maintaining a pristine environment is non-negotiable. Our dedicated cleaning services focus on enhancing the safety and comfort of your medical group's facilities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional Medical Facility Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG is committed to exceeding your expectations with specialized cleaning services for healthcare facilities.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
