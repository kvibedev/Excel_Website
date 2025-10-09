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
      title: "Enterprise-Grade Service",
      description: "Comprehensive cleaning solutions designed for large-scale facilities with guaranteed satisfaction and compliance.",
    },
    {
      icon: Users,
      title: "Certified Professional Teams",
      description: "Rigorously trained staff with ongoing certification programs ensuring the highest standards in facility management.",
    },
    {
      icon: Target,
      title: "Advanced Technology",
      description: "Cutting-edge cleaning systems and data-driven facility management for optimal performance and efficiency.",
    },
    {
      icon: Award,
      title: "20+ Years of Excellence",
      description: "Proven track record serving enterprise clients across 28 states with 400M square feet managed daily.",
    },
  ];

  return (
    <div>
      <Hero
        title="At Excel, We Understand That People Matter"
        subtitle="Enterprise-scale commercial cleaning services delivering excellence across 28 states with 400M square feet serviced daily."
        imageSrc={aboutImage}
        height="medium"
        primaryCta={{ text: "Request Proposal", href: "/contact" }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Since our founding in 2001, Excel Facility Services Group has grown from humble beginnings 
              to become a nationwide leader in commercial cleaning services. Today, we proudly serve 
              enterprise clients across 28 states, managing 400 million square feet of facility space daily. 
              Our success stems from the long-term partnerships we've built with our clients, earning their 
              trust through consistently exceptional service and customized cleaning solutions tailored to 
              each organization's unique needs.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We help enterprise clients navigate operational challenges with confidence through our 
              proven three-step approach that delivers healthy, compliant workplaces with certified 
              disinfection protocols. Our commitment to innovation and reliability has made us the 
              preferred partner for organizations that demand excellence in facility services.
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
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-[#97CC06]/10 mx-auto">
                  <value.icon className="h-8 w-8 text-[#97CC06]" />
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
              Excel Facility Services Group's journey from humble beginnings in 2001 to a nationwide 
              enterprise leader demonstrates our unwavering commitment to excellence. Our expansion 
              to 28 states and the daily management of 400 million square feet reflects the trust 
              that major organizations place in our capabilities.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              When your organization demands a commercial cleaning partner with proven enterprise-scale 
              capabilities, certified processes, and a track record of excellence, Excel Facility Services 
              Group delivers. Our customized solutions and dedicated account management ensure your 
              facilities operate at peak performance.
            </p>
            <Link href="/contact">
              <Button size="lg" data-testid="button-request-proposal">
                REQUEST PROPOSAL
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
