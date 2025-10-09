import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Target, Users, Award } from "lucide-react";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";

export default function About() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Customer Satisfaction Guarantee",
      description: "We are committed to exceeding expectations with every service we provide.",
    },
    {
      icon: Users,
      title: "Management & Employee Training",
      description: "Our team receives ongoing training to deliver the highest quality service.",
    },
    {
      icon: Target,
      title: "Innovative Technology",
      description: "We use cutting-edge technology and understanding of building needs.",
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "20+ years of trusted service across multiple states and industries.",
    },
  ];

  return (
    <div>
      <Hero
        title="At Excel, we understand that people matter."
        subtitle="Dedicated to providing commercial cleaning services that help businesses run smoothly and efficiently."
        imageSrc={aboutImage}
        height="medium"
        primaryCta={{ text: "Contact Us", href: "/contact" }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Excel Facility Services Group has provided high-quality janitorial services since
              2001. As an established company, we take pride in the partnerships our customers have
              formed with us over time. Through these partnerships, Excel Facility Services Group
              ensures their satisfaction and trust as they deliver excellent services at all times
              through customized plans.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We help clients navigate change and provide assurance by demonstrating trustworthy
              cleaning through a three-step approach that delivers healthy workplaces with certified
              disinfection.
            </p>
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center" data-testid={`card-value-${value.title.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-primary/10 mx-auto">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Creating Healthier Workplaces</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Excel Facility Services Group's origin story comes from humble beginnings, yet quickly
              grew into a nationwide commercial cleaning company. This achievement has been possible
              due to the steadfast goals we continuously have in mind.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              If you are looking for a commercial cleaning company you can trust to get the job done
              right, look no further than Excel Facility Services Group and request an estimate
              today!
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-request-estimate">
                Request An Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
