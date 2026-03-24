import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Award, Shield, CheckCircle2, Laptop } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import shccnjLogo from "@assets/shccnj_1774369098854.webp";
import sbeLogo from "@assets/sbe_1774369212032.webp";
import portAuthorityLogo from "@assets/portauthority_1774369212031.webp";
import nmsdcLogo from "@assets/nmsdc_1774369212031.webp";
import mbeLogo from "@assets/mbe_1774369297755.webp";
import issaLogo from "@assets/issa_1774369297755.webp";
import ifmaLogo from "@assets/ifma_1774369297755.webp";
import greenSealLogo from "@assets/geensealbadge_1774369297754.webp";
import connexLogo from "@assets/connex_1774369371353.webp";
import inc5000Logo from "@assets/Inc.-5000-logo_1774369371353.jpg";
import avettaLogo from "@assets/avetta_1774369371352.webp";
import somersetLogo from "@assets/somerset_1774369371353.webp";
import cleantelligentLogo from "@assets/cleantelligent_1774369430851.webp";
import corrigoLogo from "@assets/corrigo_1774369430852.webp";
import fmPilotLogo from "@assets/fmpilot_1774369430852.webp";

export default function RecognitionsCertifications() {
  const certifications = [
    { name: "SHCCNJ", description: "State of NJ Hispanic Chamber of Commerce", logo: shccnjLogo },
    { name: "SBE", description: "Small Business Enterprise", logo: sbeLogo },
    { name: "Port Authority NY/NJ", description: "Port Authority Certified", logo: portAuthorityLogo },
    { name: "NMSDC", description: "National Minority Supplier Development Council", logo: nmsdcLogo },
    { name: "MBE", description: "Minority Business Enterprise", logo: mbeLogo },
    { name: "ISSA", description: "International Sanitary Supply Association", logo: issaLogo },
    { name: "IFMA", description: "International Facility Management Association", logo: ifmaLogo },
    { name: "Green Seal GS-42", description: "Environmental Certification", logo: greenSealLogo },
    { name: "Connex", description: "Business Network Member", logo: connexLogo },
    { name: "Inc. 5000", description: "Fastest Growing Companies", logo: inc5000Logo },
    { name: "Avetta", description: "Supply Chain Risk Management", logo: avettaLogo },
    { name: "Somerset", description: "County Business Partnership", logo: somersetLogo }
  ];

  const softwareTools = [
    { name: "Cleantelligent", description: "Quality Assurance Platform", logo: cleantelligentLogo },
    { name: "Corrigo", description: "Facilities Management Software", logo: corrigoLogo },
    { name: "ServiceChannel", description: "Facilities Management Platform" },
    { name: "FMPilot", description: "Facility Management System", logo: fmPilotLogo }
  ];

  return (
    <div>
      <SEO
        title="Recognitions & Certifications"
        description="View Excel Facility Services Group certifications, memberships, and industry recognitions including Green Seal GS-42 and MBE certification."
        path="/about/recognitions-certifications"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Recognitions and Certifications"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/90 via-[#0A5EB9]/80 to-[#063970]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-[#97CC06] text-[#063970]" data-testid="badge-recognitions">
            Industry Excellence
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Recognitions and Certifications
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Excel Facility Services Group is A Registered And Reputable Company In The Industry
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-intro-p1">
              We Are Part Of Industry-Oriented Organizations And Have Achieved Certificates To Back Up Our Expertise.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-p2">
              Our commitment to excellence is unparalleled and will continue to be for the years to come. No matter how big or small the tasks, EFSG is determined to serve you well.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" data-testid="text-commitment">
              At EFSG, we are proud to have received certifications and recognitions that reflect our commitment to making a difference in our industry. At the same time, we are a member of different associations, where we can stay up-to-date on industry trends and ensure that we are providing the best possible service to our clients.
            </h2>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#97CC06]/10 flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-[#97CC06]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-certifications-title">
              Our Certifications & Memberships
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-certifications-subtitle">
              Recognized by leading industry organizations for our commitment to excellence and quality service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <Card 
                key={index}
                className="p-6 hover-elevate active-elevate-2 text-center border-t-4 border-t-[#97CC06]"
                data-testid={`cert-${cert.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#97CC06]/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#97CC06]" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Software Technology Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#97CC06]/10 flex items-center justify-center mx-auto mb-6">
              <Laptop className="w-10 h-10 text-[#97CC06]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-software-title">
              Software Technology We Use
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-software-subtitle">
              Using the latest software and technology, we are able to provide our clients with a better service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {softwareTools.map((tool, index) => (
              <Card 
                key={index}
                className="p-6 hover-elevate active-elevate-2 text-center"
                data-testid={`software-${tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#063970]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#063970]" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Partner With a Certified Industry Leader
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Our certifications and technology partnerships ensure you receive the highest quality commercial cleaning services available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#97CC06] text-[#063970]"
                data-testid="button-cta-contact"
              >
                REQUEST PROPOSAL
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-cta-about"
              >
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
