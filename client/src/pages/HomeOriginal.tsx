import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Sparkles,
  Users,
  Shield,
  Droplets,
  ClipboardList,
  Calendar,
  Settings,
  CheckCircle2,
  ArrowRight,
  Building2,
  Globe,
  TrendingUp,
  Star,
} from "lucide-react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";

export default function HomeOriginal() {
  const stats = [
    {
      value: "28",
      label: "States Nationwide",
      icon: Globe,
    },
    {
      value: "400M",
      label: "Sq Ft Serviced Daily",
      icon: Building2,
    },
    {
      value: "20+",
      label: "Years of Excellence",
      icon: TrendingUp,
    },
    {
      value: "100%",
      label: "Satisfaction Guaranteed",
      icon: Star,
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description: "We analyze your facility requirements, assess current challenges, and identify opportunities for operational improvement.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Planning",
      description: "Our team develops a customized service plan with detailed protocols, schedules, and performance metrics tailored to your needs.",
      icon: Calendar,
    },
    {
      number: "03",
      title: "Implementation",
      description: "Trained professionals deploy our proven systems with seamless onboarding and minimal disruption to your operations.",
      icon: Settings,
    },
    {
      number: "04",
      title: "Quality Assurance",
      description: "Continuous monitoring, regular inspections, and real-time reporting ensure consistent excellence and accountability.",
      icon: CheckCircle2,
    },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Janitorial",
      description: "Comprehensive janitorial services maintaining professional, clean workplaces for businesses of all sizes. Our enterprise-scale operations ensure consistency across all your facilities.",
      image: officeImage,
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description: "On-site professionals ensuring your facility remains clean, organized, and welcoming throughout regular business hours with immediate response capabilities.",
      image: retailImage,
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "Certified disinfection delivering sanitized spaces you can trust through our proven three-step approach. Backed by science and verified results.",
      image: medicalImage,
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description: "Professional disinfection services applying antimicrobial agents to protect against harmful microorganisms with hospital-grade effectiveness.",
      image: distributionImage,
      href: "/services/disinfection",
    },
  ];

  const industries = [
    {
      title: "Office Buildings",
      image: officeImage,
      href: "/industries/office-building",
    },
    {
      title: "Retailers",
      image: retailImage,
      href: "/industries/retailer",
    },
    {
      title: "Distribution Centers",
      image: distributionImage,
      href: "/industries/distribution-centers",
    },
    {
      title: "Restaurants",
      image: restaurantImage,
      href: "/industries/restaurants",
    },
    {
      title: "Medical Groups",
      image: medicalImage,
      href: "/industries/medical-groups",
    },
    {
      title: "Banks",
      image: banksImage,
      href: "/industries/banks",
    },
  ];

  const companyStats = [
    { label: "Multi-State Operations", value: "28 States" },
    { label: "Daily Coverage", value: "400M+ Sq Ft" },
    { label: "Industry Experience", value: "20+ Years" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Industrial-Strength Facility Management"
        subtitle="Excel Facility Services Group delivers enterprise-scale commercial cleaning solutions with unmatched operational excellence across 28 states nationwide."
        imageSrc={heroImage}
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "VIEW SERVICES", href: "/services" }}
      />

      {/* Stats Banner */}
      <section className="py-16 md:py-20 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-[#97CC06]" />
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process Flow */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-process">
              OUR PROCESS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-process">
              Facility Management Workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our proven four-step approach ensures seamless implementation and exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`card-process-${index}`}>
                <Card className="h-full hover-elevate transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#063970]">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-[#97CC06]/20">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">{step.title}</CardTitle>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-[#97CC06]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-services">
              CORE SERVICES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-services">
              Enterprise Facility Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive services designed for large-scale commercial operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="overflow-hidden hover-elevate transition-all cursor-pointer h-full" data-testid={`card-service-${index}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-service-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06] mb-3">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                    <CardDescription className="text-base mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center text-[#0A5EB9] font-semibold">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-industries">
              INDUSTRIES WE SERVE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-industries">
              Specialized Industry Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Customized cleaning solutions tailored to your industry's unique requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Link key={index} href={industry.href}>
                <Card className="overflow-hidden hover-elevate transition-all cursor-pointer group" data-testid={`card-industry-${index}`}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      data-testid={`img-industry-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063970]/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {industry.title}
                      </h3>
                      <div className="flex items-center text-white/90">
                        Explore Solutions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Company with Stats Overlay */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">
                ABOUT EXCEL FACILITY SERVICES GROUP
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-about">
                Two Decades of Operational Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2001, Excel Facility Services Group has evolved from a regional provider 
                to a multi-state enterprise managing over 400 million square feet daily across 28 states. 
                Our commitment to operational excellence and enterprise-scale efficiency has made us the 
                preferred partner for businesses seeking reliable, professional facility management solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We deliver the resources and infrastructure of a national provider combined with the 
                regional accountability and personalized attention that large corporations cannot match. 
                Our technology-enabled approach provides real-time transparency and data-driven insights 
                that transform facilities from cost centers into strategic assets.
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-learn-more">
                  LEARN MORE
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt="Excel Facility Services Team"
                className="rounded-md w-full h-auto"
                data-testid="img-about"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063970]/95 to-transparent rounded-md flex items-end">
                <div className="p-8 w-full">
                  <div className="grid grid-cols-2 gap-6">
                    {companyStats.map((stat, index) => (
                      <div key={index} className="text-center" data-testid={`stat-about-${index}`}>
                        <div className="text-3xl md:text-4xl font-bold text-[#97CC06] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/90 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[#063970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#97CC06] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A5EB9] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="heading-cta">
              Ready to Transform Your Facilities?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10">
              Join leading businesses across 28 states who trust Excel Facility Services Group 
              for enterprise-scale facility management excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 text-lg px-8"
                  data-testid="button-cta-primary"
                >
                  REQUEST PROPOSAL
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8"
                  data-testid="button-cta-secondary"
                >
                  EXPLORE SERVICES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
