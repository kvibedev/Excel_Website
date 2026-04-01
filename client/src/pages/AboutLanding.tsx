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
export default function AboutLanding() {
  const aboutSections = [
    {
      icon: MapPin,
      title: "Coverage Areas",
      description: "Regional scale with the ability to support multi-site operations across 28 states.",
      link: "/about/coverage-areas",
      badge: "20+ States"
    },
    {
      icon: Award,
      title: "Recognitions & Certifications",
      description: "Industry credentials and recognized standards that reinforce trust, compliance, and service credibility.",
      link: "/about/recognitions-certifications",
      badge: "Industry Leader"
    },
    {
      icon: Leaf,
      title: "Green Seal Certified",
      description: "Environmentally responsible cleaning practices that support healthier workplaces and more sustainable operations.",
      link: "/about/green-seal",
      badge: "GS-42 Certified"
    },
    {
      icon: Users,
      title: "Our Team",
      description: "The people behind the service — from leadership and oversight to field execution and quality control.",
      link: "/about/our-team",
      badge: "Expert Team"
    }
  ];

  const companyValues = [
    {
      icon: Building2,
      title: "Scale & Reach",
      description: "Operational support across 28 states with the capacity to serve facilities of varying size, complexity, and footprint."
    },
    {
      icon: Shield,
      title: "Excellence & Trust",
      description: "More than 20 years of proven execution, built on dependable service delivery and long-term client relationships."
    },
    {
      icon: TrendingUp,
      title: "Technology & Innovation",
      description: "Modern systems, smarter workflows, and structured quality control that support stronger day-to-day performance."
    },
    {
      icon: CheckCircle2,
      title: "Accountability & Consistency",
      description: "A disciplined service model focused on communication, follow-through, and reliable execution across every site."
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#97CC06] text-[#063970] text-base px-4 py-2" data-testid="badge-established">Established 2001</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-about-landing-title">
              Creating Healthier Workplaces Through Accountable Service
            </h1>
            <p className="text-xl text-white/90 mb-4" data-testid="text-about-landing-subtitle">
              Excel Facility Services Group helps organizations maintain cleaner, safer, and more consistent facilities through disciplined service delivery, regional responsiveness, and a long-term commitment to operational excellence.
            </p>
            <p className="text-sm text-white/70" data-testid="text-about-landing-proof">
              28-state coverage &bull; 25M square feet serviced daily &bull; enterprise-focused facility support
            </p>
          </div>
        </div>
      </section>
      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-overview-title">
              About Excel
            </h2>
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-overview-p1">
              Excel Facility Services Group has built its reputation through dependable execution, responsive communication, and a service model designed to support long-term client trust.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-overview-p2">
              With more than 20 years of operational experience and multi-state capability, Excel serves organizations that need more than a commodity cleaning vendor. We support facilities that require consistency, accountability, and a partner that can adapt to the realities of each site.
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
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">28</div>
              <div className="text-xl">States Covered</div>
            </div>
            <div data-testid="stat-sqft">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">25M</div>
              <div className="text-xl">Square Feet Serviced Daily</div>
            </div>
            <div data-testid="stat-years">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#97CC06]">20+</div>
              <div className="text-xl">Years of Operational Experience</div>
            </div>
          </div>
        </div>
      </section>
      {/* About Sections Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-learn-more-title">
              Explore What Makes Excel Different
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-learn-more-subtitle">
              Learn more about the capabilities, standards, and credentials that support Excel Facility Services Group's service model.
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
            Looking for a Facility Services Partner You Can Actually Rely On?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-final-cta-subtitle">
            Excel Facility Services Group helps organizations improve consistency, cleanliness, and confidence across their facilities through accountable, operations-aware service delivery.
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
