import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  DollarSign,
  Heart,
  Users,
  Sparkles,
  Shield,
  Droplets,
  Footprints,
  Sparkle,
  ClipboardList,
  Calendar,
  CheckCircle2,
  Award,
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";

export default function HomeTemplate1() {
  const featureCards = [
    {
      icon: DollarSign,
      title: "Save Time & Money",
      description: "With operations across 28 states nationwide, we deliver enterprise-scale efficiency that reduces costs while maintaining the highest quality standards for your facilities.",
    },
    {
      icon: Heart,
      title: "Healthy Environment",
      description: "Managing 400 million square feet daily, we create healthier workspaces through proven cleaning protocols and advanced disinfection technologies.",
    },
    {
      icon: Users,
      title: "Professional Experts",
      description: "Over 20 years of excellence in commercial facility management, delivering consistent results with trained professionals and proven systems.",
    },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Janitorial",
      description: "Comprehensive janitorial services maintaining professional, clean workplaces for businesses of all sizes.",
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description: "On-site professionals ensuring cleanliness and order throughout regular business hours.",
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "Certified disinfection delivering sanitized spaces you can trust through our proven three-step approach.",
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description: "Professional disinfection services applying antimicrobial agents to protect against harmful microorganisms.",
      href: "/services/disinfection",
    },
    {
      icon: Footprints,
      title: "Floor Care",
      description: "Expert floor maintenance preserving and enhancing all types of commercial flooring surfaces.",
      href: "/services/floor-care",
    },
    {
      icon: Sparkle,
      title: "Window Washing",
      description: "Professional window cleaning services for spotless, streak-free results on buildings of any height.",
      href: "/services/window-washing",
    },
  ];

  const howItWorks = [
    {
      number: "01",
      title: "Provide Us With Details",
      description: "Share information about your facility needs, square footage, and service requirements through our simple online form or consultation.",
    },
    {
      number: "02",
      title: "Pick Your Plan",
      description: "We'll create a customized service plan tailored to your specific facility requirements and business objectives.",
    },
    {
      number: "03",
      title: "Schedule Service",
      description: "Select service times that work best for your operations, with flexible scheduling to minimize business disruption.",
    },
    {
      number: "04",
      title: "Professional Delivery",
      description: "Our trained professionals deliver consistent, high-quality results with ongoing performance monitoring and support.",
    },
  ];

  const pricingTiers = [
    {
      name: "Small Business",
      description: "Perfect for growing businesses",
      features: [
        "Up to 10,000 sq ft coverage",
        "Flexible scheduling options",
        "Core janitorial services",
        "Monthly quality inspections",
        "Dedicated account manager",
        "Green cleaning products",
      ],
    },
    {
      name: "Enterprise",
      description: "Comprehensive facility management",
      features: [
        "Multi-location coordination",
        "24/7 service availability",
        "Full-service offerings",
        "Real-time reporting dashboard",
        "Executive account team",
        "Custom SLA agreements",
      ],
      featured: true,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Professional Commercial Cleaning Services"
        subtitle="Excel Facility Services Group - 28 States Nationwide, 400M Sq Ft Serviced Daily"
        imageSrc={heroImage}
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "OUR SERVICES", href: "/services" }}
      />

      {/* Feature Cards Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((feature, index) => (
              <Card key={index} className="text-center hover-elevate transition-shadow" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#97CC06]/10">
                      <feature.icon className="h-8 w-8 text-[#97CC06]" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We are Committed to Cleaning Excellence
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2001, Excel Facility Services Group has grown from a regional provider to a 
                multi-state enterprise serving commercial clients across 28 states. Our commitment to 
                operational excellence and customer satisfaction has made us a trusted partner for 
                businesses seeking reliable, professional facility management solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                With a focus on enterprise-scale operations and regional accountability, we deliver the 
                resources of a national provider with the personal attention and responsiveness that 
                large corporations cannot match.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="order-2 lg:order-1">
              <img
                src={aboutImage}
                alt="Excel Facility Services Team"
                className="rounded-md w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Your Partner in Facility Excellence
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                We understand that your facilities are more than just buildings—they're environments 
                where your business thrives and your people work. That's why we approach every client 
                relationship as a strategic partnership, delivering customized solutions that align with 
                your business objectives.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#97CC06] flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Inc. 5000 Recognized Growth Leader</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#97CC06] flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">MBE Certified - Minority Business Enterprise</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#97CC06] flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Green Seal GS-42 Environmental Excellence</p>
                </div>
              </div>
              <Link href="/about">
                <Button size="lg" data-testid="button-learn-more-about">
                  LEARN MORE ABOUT US
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive facility management solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="hover-elevate transition-shadow h-full cursor-pointer" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10">
                      <service.icon className="h-6 w-6 text-[#97CC06]" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#0A5EB9] font-medium">Learn More →</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button size="lg" variant="outline" data-testid="button-view-all-services">
                VIEW ALL SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Our streamlined process makes it easy to get started with professional facility services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="mb-4 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#97CC06] text-primary text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Service Level</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible solutions designed to meet the needs of businesses at every scale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`hover-elevate transition-shadow ${tier.featured ? 'border-[#97CC06] border-2' : ''}`}
                data-testid={`card-pricing-${index}`}
              >
                <CardHeader>
                  {tier.featured && (
                    <Badge className="w-fit mb-2 bg-[#97CC06] text-white">MOST POPULAR</Badge>
                  )}
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#97CC06] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="w-full"
                      variant={tier.featured ? "default" : "outline"}
                      data-testid={`button-pricing-${index}`}
                    >
                      REQUEST PROPOSAL
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the EFSG Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses across 28 states who trust Excel Facility Services Group 
            for their commercial cleaning and facility management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-cta-proposal">
                REQUEST PROPOSAL
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" data-testid="button-cta-services">
                EXPLORE SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
