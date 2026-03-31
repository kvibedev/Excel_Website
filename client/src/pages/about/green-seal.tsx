import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Shield, Sparkles } from "lucide-react";
export default function GreenSeal() {

  return (
    <div>
      <SEO
        title="Green Seal Certification"
        description="Excel Facility Services Group is Green Seal GS-42 certified, delivering environmentally responsible commercial cleaning solutions."
        path="/about/green-seal"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/90 via-[#0A5EB9]/80 to-[#063970]/90" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Excel Facility Services Group is Green Seal Certified
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Protecting our environment and embracing sustainable cleaning practices is just one of the many ways we offer quality services to our clients.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-description">
              <strong>Excel Facility Services Group</strong> believes in protecting our planet and natural resources, and we are doing our part to ensure that we educate ourselves and our clients on green technologies and cleaning practices that benefit us all.
            </p>
          </div>
        </div>
      </section>

      {/* GS-42 Standard Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-[#97CC06]/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-[#97CC06]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-gs42-quote">
              "The GS-42 Green Seal standard establishes requirements for cleaning service providers to ensure an environmentally safe cleaning solution for customers."
            </h2>
          </div>
        </div>
      </section>

      {/* Healthier Workplaces Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#97CC06]/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#97CC06]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8" data-testid="text-healthier-title">
            Creating Healthier Workplaces!
          </h2>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-8" data-testid="text-cta-message">
            <Link href="/contact" className="underline hover:no-underline">
              Contact us today
            </Link>
          </p>
          <p className="text-lg" data-testid="text-cta-subtitle">
            to discuss how to make your facility Green with us!
          </p>
        </div>
      </section>
    </div>
  );
}
