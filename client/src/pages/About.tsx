import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award,
  Shield,
  Sparkles,
  CheckCircle2,
  Target,
  Clock,
  MapPin,
  SquareStack
} from "lucide-react";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";

export default function About() {
  const valuePropositions = [
    {
      icon: MapPin,
      title: "Scale & Reach",
      description: "Operating across 20+ states with the capacity to serve facilities of any size, from single locations to nationwide portfolios."
    },
    {
      icon: Users,
      title: "Professional Teams",
      description: "Rigorously trained and certified cleaning professionals committed to delivering excellence in every facility we serve."
    },
    {
      icon: TrendingUp,
      title: "Technology & Innovation",
      description: "Leveraging advanced cleaning systems and data-driven facility management for optimal performance and efficiency."
    },
    {
      icon: Award,
      title: "Excellence & Trust",
      description: "Over 20 years of proven excellence, earning the trust of enterprise clients through consistent, superior service delivery."
    }
  ];

  const whyChooseUs = [
    {
      icon: Building2,
      title: "Nationwide Coverage",
      description: "Operating across 20+ states, we provide consistent, reliable service wherever your facilities are located."
    },
    {
      icon: SquareStack,
      title: "30M+ Sq Ft Daily",
      description: "Managing massive facility portfolios with precision and care, delivering excellence at enterprise scale."
    },
    {
      icon: Clock,
      title: "20+ Years Experience",
      description: "Two decades of commercial cleaning excellence, building long-term partnerships with enterprise clients."
    },
    {
      icon: Shield,
      title: "Certified Standards",
      description: "MBE Certified, Inc. 5000, and Green Seal GS-42 certified—meeting the highest industry standards."
    },
    {
      icon: CheckCircle2,
      title: "100% Satisfaction",
      description: "Our commitment to quality and customer satisfaction has earned us lasting partnerships with major organizations."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-about-title">
              At Excel, We Understand That People Matter
            </h1>
            <p className="text-xl text-white/90 mb-8" data-testid="text-about-subtitle">
              We are dedicated to providing commercial cleaning services that help businesses run smoothly and efficiently.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="default"
                  className="bg-[#97CC06] text-[#063970] border-[#97CC06]"
                  data-testid="button-contact-us"
                >
                  CONTACT US
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                  data-testid="button-view-services"
                >
                  VIEW SERVICES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#97CC06]/10 text-[#97CC06] hover:bg-[#97CC06]/20 border-[#97CC06]/20" data-testid="badge-since-2001">
                Since 2001
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-company-story-title">
                Our Story: From Humble Beginnings to Nationwide Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-4" data-testid="text-company-story-p1">
                Excel Facility Services Group has provided high-quality janitorial services since 2001. As an established company, we take pride in the partnerships our customers have formed with us over time. Through these partnerships, Excel Facility Services Group ensures their satisfaction and trust as they deliver excellent services at all times through customized plans.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-company-story-p2">
                We help clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy workplaces with certified disinfection.
              </p>
              <Link href="/services">
                <Button 
                  variant="default" 
                  className="bg-[#0A5EB9]"
                  data-testid="button-view-services-story"
                >
                  VIEW SERVICES
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={aboutImage} 
                  alt="Excel Facility Services Group Team" 
                  className="w-full h-auto"
                  data-testid="img-about-team"
                />
                <div className="absolute top-6 right-6">
                  <Badge className="bg-[#97CC06] text-[#063970] text-lg px-4 py-2" data-testid="badge-satisfaction">
                    100% Satisfaction Guaranteed
                  </Badge>
                </div>
              </div>
            </div>
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
              <div className="text-xl">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-value-props-title">
              Why Choose Excel Facility Services Group
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-value-props-subtitle">
              Excel Facility Services Group's origin story comes from humble beginnings, yet quickly grew into a nationwide commercial cleaning company. This achievement has been possible due to the steadfast goals we continuously have in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 hover-elevate active-elevate-2 border-t-4 border-t-[#97CC06]"
                data-testid={`card-value-${value.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A5EB9]/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-[#0A5EB9]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach / Creating Healthier Workplaces */}
      <section className="py-16 md:py-24 bg-[#f0f2f5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-lg order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Creating Healthier Workplaces" 
                className="w-full h-auto"
                data-testid="img-healthier-workplaces"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-[#97CC06] text-[#063970]" data-testid="badge-our-mission">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-healthier-title">
                Creating Healthier Workplaces
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-healthier-p1">
                If you are looking for a commercial cleaning company you can trust to get the job done right, look no further than Excel Facility Services Group. Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses across the nation.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-healthier-p2">
                We help clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy workplaces with certified disinfection. Our customized solutions ensure your facility operates at peak performance while maintaining the highest standards of cleanliness and safety.
              </p>
              <Link href="/contact">
                <Button 
                  variant="default" 
                  className="bg-[#97CC06] text-[#063970]"
                  data-testid="button-request-estimate"
                >
                  REQUEST AN ESTIMATE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - 5 Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-why-choose-title">
            Why Choose EFSG Over National Competitors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card 
                key={index}
                className="p-6 hover-elevate active-elevate-2 border-t-4 border-t-[#97CC06]"
                data-testid={`card-why-${item.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#97CC06]/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#97CC06]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
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
            Join the hundreds of enterprise clients who trust EFSG for their commercial cleaning needs. Let's create a healthier workplace together.
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
