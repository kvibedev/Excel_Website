import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Leaf, Shield, CheckCircle2, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function GreenSeal() {
  const benefits = [
    {
      icon: Leaf,
      title: "Environmental Protection",
      description: "Protecting our planet and natural resources through sustainable cleaning practices that benefit everyone."
    },
    {
      icon: Shield,
      title: "Safe & Certified",
      description: "GS-42 Green Seal standard ensures environmentally safe cleaning solutions for all our customers."
    },
    {
      icon: Sparkles,
      title: "Healthier Workplaces",
      description: "Creating cleaner, safer environments that promote the health and well-being of building occupants."
    },
    {
      icon: CheckCircle2,
      title: "Industry Leadership",
      description: "Leading the way in green technologies and cleaning practices that set new industry standards."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Green Seal Certification"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/90 via-[#0A5EB9]/80 to-[#063970]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-[#97CC06] text-[#063970]" data-testid="badge-green-seal">
            Environmentally Certified
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Green Seal Certified
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Protecting our environment and embracing sustainable cleaning practices
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-intro-title">
              Excel Facility Services Group is Green Seal Certified
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-description">
              Excel Facility Services Group believes in protecting our planet and natural resources, and we are doing our part to ensure that we educate ourselves and our clients on green technologies and cleaning practices that benefit us all.
            </p>
          </div>
        </div>
      </section>

      {/* GS-42 Standard Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 border-t-4 border-t-[#97CC06]">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-[#97CC06]/10 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-[#97CC06]" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <Badge className="mb-4 bg-[#97CC06] text-[#063970]" data-testid="badge-gs42">
                    GS-42 Standard
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-gs42-title">
                    The GS-42 Green Seal Standard
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid="text-gs42-description">
                    The GS-42 Green Seal standard establishes requirements for cleaning service providers to ensure an environmentally safe cleaning solution for customers.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-benefits-title">
              Why Green Seal Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-benefits-subtitle">
              Our commitment to sustainable practices delivers real benefits for your facility and the environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="p-8 hover-elevate active-elevate-2"
                data-testid={`benefit-${benefit.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-14 h-14 rounded-lg bg-[#97CC06]/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#97CC06]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Healthier Workplaces Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#97CC06]/10 to-[#97CC06]/5">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#97CC06]/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#97CC06]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-healthier-title">
            Creating Healthier Workplaces!
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-healthier-description">
            Our Green Seal certification demonstrates our commitment to providing cleaning services that protect both people and the planet.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Make Your Facility Green With Us!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Contact us today to discuss how we can help your facility achieve environmental excellence through our Green Seal certified cleaning services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#97CC06] text-[#063970]"
                data-testid="button-cta-contact"
              >
                CONTACT US TODAY
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-cta-services"
              >
                EXPLORE SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
