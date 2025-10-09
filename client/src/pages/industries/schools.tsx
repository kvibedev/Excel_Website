import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";

export default function Schools() {
  return (
    <div>
      <Hero
        title="Schools"
        subtitle="Excel Facility Services Group provides service while raising health & safety standards across school facilities"
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              Excel Facility Services Group (EFSG) serves the nation's educational communities, providing cleaning and maintenance services for public school systems, private schools, universities, and colleges. Our commitment has always been to high standards that meet or exceed your expectations in every way possible. Our quality control programs are designed specifically around raising health & safety standards on our end, so you never have worries about unsafe practices going unnoticed. All of our employees who work within these educational facilities undergo strict training.
            </p>
            
            <p className="text-lg mb-8">
              Our experienced team ensures that schools are clean, healthy, and safe. We offer various services to help your school succeed, including janitorial services, disinfection, and COVID-19 cleaning. We understand that academic institutions are held to a higher standard than commercial businesses, and we take great pride in always adhering to these standards, with no exceptions.
            </p>

            <p className="text-lg mb-8 text-center font-semibold">
              If you're looking for a school cleaning partner who will always go the extra mile to ensure your students and staff are in a safe and clean environment, look no further than Excel Facility Services Group. Contact us today to get started!
            </p>

            <p className="text-lg mb-6">
              At Excel Facility Services Group, we believe that a clean school is essential for fostering a productive learning environment. Our comprehensive cleaning and maintenance solutions are tailored to meet the unique needs of educational institutions, ensuring both students and staff experience a safe and healthy space.
            </p>

            <p className="text-lg">
              We are committed to using the latest cleaning technologies and methods to effectively disinfect and sanitize classrooms, cafeterias, and common areas. Our team offers regular janitorial services, as well as targeted deep cleaning protocols to effectively combat germs and maintain hygiene standards. By choosing us as your cleaning partner, you are investing in the well-being of your students and staff.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Professional School Facility Cleaning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            EFSG is committed to exceeding your expectations with specialized cleaning services for educational institutions.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-request-proposal">REQUEST PROPOSAL</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
