import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  MapPin,
  Award,
  Leaf,
  Users,
  Building2,
  Shield,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function AboutLanding() {
  const aboutSections = [
    {
      icon: MapPin,
      title: "Coverage Areas",
      description: "Operating across 20+ states nationwide, we provide consistent, reliable commercial cleaning services wherever your facilities are located.",
      link: "/about/coverage-areas",
      badge: "20+ States"
    },
    {
      icon: Award,
      title: "Recognitions & Certifications",
      description: "MBE Certified, Inc. 5000, and industry-leading certifications demonstrate our commitment to excellence and professional standards.",
      link: "/about/recognitions-certifications",
      badge: "Industry Leader"
    },
    {
      icon: Leaf,
      title: "Green Seal Certified",
      description: "GS-42 certified cleaning services ensuring environmentally responsible practices that protect both people and the planet.",
      link: "/about/green-seal",
      badge: "GS-42 Certified"
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Meet the dedicated professionals who deliver excellence across our nationwide operations, from leadership to field operations.",
      link: "/about/our-team",
      badge: "Expert Team"
    }
  ];

  const companyValues = [
    {
      icon: Building2,
      title: "Scale & Reach",
      description: "Operating across 20+ states with capacity to serve facilities of any size, from single locations to nationwide portfolios."
    },
    {
      icon: Shield,
      title: "Excellence & Trust",
      description: "Over 20 years of proven excellence, earning the trust of enterprise clients through consistent, superior service delivery."
    },
    {
      icon: TrendingUp,
      title: "Technology & Innovation",
      description: "Leveraging advanced cleaning systems and data-driven facility management for optimal performance."
    },
    {
      icon: CheckCircle2,
      title: "100% Satisfaction",
      description: "Our commitment to quality and customer satisfaction has earned us lasting partnerships with major organizations."
    }
  ];

  return (
    <div>
      <SEO
        title="About Us"
        description="Learn about Excel Facility Services Group — 20+ years of commercial cleaning excellence across 20+ states. Our mission, values, and commitment to healthier workplaces."
        path="/about"
      />
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#97CC06] text-[#063970] text-base px-4 py-2" data-testid="badge-established">
              Established 2001
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-about-landing-title">
              About Excel Facility Services Group
            </h1>
            <p className="text-xl text-white/90 mb-8" data-testid="text-about-landing-subtitle">
              20+ years of commercial cleaning excellence across 20+ states, serving enterprise clients with 30M+ square feet managed daily.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-overview-title">
              Excel Facility Services Group
            </h2>
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-overview-p1">
              Excel Facility Services Group has provided high-quality janitorial services since 2001. As an established company, we take pride in the partnerships our customers have formed with us over time. Through these partnerships, Excel Facility Services Group ensures their satisfaction and trust as they deliver excellent services at all times through customized plans.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-overview-p2">
              We help clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy workplaces with certified disinfection.
            </p>
          </div>

          {/* Company Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {companyValues.map((value, index) => (
              <Card 
                key={index}
                className="p-6 hover-elevate active-elevate-2 border-t-4 border-t-[#0A5EB9]"
                data-testid={`card-value-${value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A5EB9]/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-[#0A5EB9]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#063970] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-states">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">20+</div>
              <div className="text-xl">States</div>
            </div>
            <div data-testid="stat-sqft">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">30M+</div>
              <div className="text-xl">Square Feet Serviced Daily</div>
            </div>
            <div data-testid="stat-years">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">20+</div>
              <div className="text-xl">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Sections Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-learn-more-title">
              Learn More About EFSG
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-learn-more-subtitle">
              Discover what makes Excel Facility Services Group the trusted choice for enterprise commercial cleaning nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutSections.map((section, index) => (
              <Card 
                key={index}
                className="p-8 hover-elevate active-elevate-2 border-t-4 border-t-[#97CC06]"
                data-testid={`card-about-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-[#0A5EB9]/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-7 h-7 text-[#0A5EB9]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{section.title}</h3>
                      <Badge className="bg-[#97CC06] text-[#063970]" data-testid={`badge-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        {section.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{section.description}</p>
                <Link href={section.link}>
                  <Button 
                    variant="default"
                    data-testid={`button-learn-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-final-cta-title">
            Ready to Partner With Excel Facility Services Group?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-final-cta-subtitle">
            Join the hundreds of enterprise clients who trust EFSG for their commercial cleaning needs across 20+ states.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="default"
                className="bg-[#97CC06] text-[#063970] border-[#97CC06]"
                data-testid="button-final-request-proposal"
              >
                REQUEST PROPOSAL
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-final-explore-services"
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
