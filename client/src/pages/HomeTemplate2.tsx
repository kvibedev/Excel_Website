import Hero from "@/components/Hero";
import IndustryCard from "@/components/IndustryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  MessageSquare,
  CalendarCheck,
  Users,
  Award,
  Sparkles,
  Shield,
  Droplets,
  Footprints,
  Sparkle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";

export default function HomeTemplate2() {
  const processSteps = [
    {
      icon: MessageSquare,
      title: "Send Message",
      description: "Contact us to discuss your facility needs and service requirements.",
    },
    {
      icon: CalendarCheck,
      title: "Schedule Cleaning",
      description: "We create a customized plan and schedule that works for your business.",
    },
    {
      icon: Users,
      title: "Professional Service",
      description: "Our trained team delivers consistent, high-quality results.",
    },
    {
      icon: Award,
      title: "Guaranteed Results",
      description: "Satisfaction guaranteed with ongoing quality monitoring.",
    },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Janitorial Services",
      description: "Comprehensive janitorial solutions maintaining professional, clean workplaces for businesses across all industries.",
      image: heroImage,
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porter Services",
      description: "On-site professionals ensuring your facility remains clean, organized, and welcoming throughout business hours.",
      image: aboutImage,
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "Certified disinfection program delivering sanitized spaces through our proven three-step cleaning approach.",
      image: heroImage,
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection Services",
      description: "Professional antimicrobial applications protecting your facility against harmful microorganisms.",
      image: aboutImage,
      href: "/services/disinfection",
    },
    {
      icon: Footprints,
      title: "Floor Care",
      description: "Expert maintenance and restoration for all commercial flooring types, preserving your investment.",
      image: heroImage,
      href: "/services/floor-care",
    },
    {
      icon: Sparkle,
      title: "Window Washing",
      description: "Professional window cleaning delivering spotless, streak-free results for buildings of any height.",
      image: aboutImage,
      href: "/services/window-washing",
    },
  ];

  const industries = [
    { title: "Office Building", imageSrc: officeImage, href: "/industries/office-building" },
    { title: "Medical Groups", imageSrc: medicalImage, href: "/industries/medical-groups" },
    { title: "Banks", imageSrc: banksImage, href: "/industries/banks" },
    { title: "Schools", imageSrc: schoolsImage, href: "/industries/schools" },
    { title: "Retailer", imageSrc: retailImage, href: "/industries/retailer" },
    { title: "Distribution Centers", imageSrc: distributionImage, href: "/industries/distribution-centers" },
  ];

  const credentials = [
    {
      name: "Inc. 5000",
      description: "Recognized Growth Leader",
      detail: "Multiple years of recognition for rapid growth and business excellence",
    },
    {
      name: "MBE Certified",
      description: "Minority Business Enterprise",
      detail: "Certified diverse supplier supporting corporate diversity initiatives",
    },
    {
      name: "Green Seal GS-42",
      description: "Environmental Excellence",
      detail: "Committed to sustainable cleaning practices and environmental stewardship",
    },
  ];

  return (
    <div>
      {/* Bold Hero Section */}
      <Hero
        title="Making Your Business Shine Since 2001"
        subtitle="We Provide Professional Cleaning Services - 28 States Nationwide, 400M Sq Ft Daily"
        imageSrc={heroImage}
        primaryCta={{ text: "ALL SERVICES", href: "/services" }}
        secondaryCta={{ text: "GET IN TOUCH", href: "/contact" }}
        height="full"
      />

      {/* Stats Banner */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-years">
              <div className="text-4xl md:text-5xl font-bold text-[#97CC06] mb-2">20+</div>
              <div className="text-sm md:text-base opacity-90">Years of Excellence</div>
            </div>
            <div data-testid="stat-states">
              <div className="text-4xl md:text-5xl font-bold text-[#97CC06] mb-2">28</div>
              <div className="text-sm md:text-base opacity-90">States Nationwide</div>
            </div>
            <div data-testid="stat-sqft">
              <div className="text-4xl md:text-5xl font-bold text-[#97CC06] mb-2">400M</div>
              <div className="text-sm md:text-base opacity-90">Sq Ft Managed Daily</div>
            </div>
            <div data-testid="stat-guarantee">
              <div className="text-4xl md:text-5xl font-bold text-[#97CC06] mb-2">100%</div>
              <div className="text-sm md:text-base opacity-90">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-process">Simple Process, Outstanding Results</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Getting started with professional facility services is easy with our streamlined approach
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`process-step-${index}`}>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#97CC06]/10 border-4 border-[#97CC06]" data-testid={`icon-step-${index}`}>
                      <step.icon className="h-10 w-10 text-[#97CC06]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid={`heading-step-${index}`}>{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%]">
                    <ArrowRight className="h-6 w-6 text-[#97CC06] mx-auto" />
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-professional-services">Our Professional Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive facility management solutions tailored to your industry and business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href} data-testid={`link-service-${service.href.split('/').pop()}`}>
                <Card className="overflow-hidden hover-elevate transition-shadow h-full cursor-pointer group" data-testid={`card-service-${index}`}>
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl" data-testid={`heading-service-${index}`}>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#0A5EB9] font-medium flex items-center gap-2" data-testid={`text-learn-more-${index}`}>
                      Learn More <ArrowRight className="h-4 w-4" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button size="lg" data-testid="button-all-services">
                VIEW ALL SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized cleaning solutions for diverse commercial and industrial facilities across America
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} {...industry} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/industries">
              <Button size="lg" variant="outline" data-testid="button-all-industries">
                EXPLORE ALL INDUSTRIES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#97CC06] text-white" data-testid="badge-founded">FOUNDED IN 2001</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about-company">
                About Our Company
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                For over 20 years, Excel Facility Services Group has delivered exceptional commercial 
                cleaning and facility management services across 28 states. What began as a regional 
                provider has evolved into a trusted enterprise-scale partner, managing 400 million 
                square feet daily for businesses across diverse industries.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our success is built on a foundation of operational excellence, innovative technology, 
                and unwavering commitment to customer satisfaction. We combine the resources and 
                capabilities of a national provider with the personalized service and accountability 
                that only a regional leader can deliver.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4" data-testid="heading-credentials">Our Credentials</h3>
                <div className="space-y-4">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-start gap-3" data-testid={`credential-${index}`}>
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#97CC06]/10">
                          <Award className="h-5 w-5 text-[#97CC06]" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{credential.name} - {credential.description}</p>
                        <p className="text-sm text-muted-foreground">{credential.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/about">
                <Button size="lg" data-testid="button-about-company">
                  LEARN MORE ABOUT US
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Excel Facility Services Team"
                className="rounded-md w-full h-auto"
                data-testid="img-about-team"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-md shadow-lg max-w-xs" data-testid="badge-years-overlay">
                <p className="text-4xl font-bold text-[#97CC06] mb-2" data-testid="text-years-overlay">20+</p>
                <p className="text-sm">Years of cleaning excellence and trusted partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="heading-cta-final">
              Looking for Professional Facility Services?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join leading businesses across 28 states who trust Excel Facility Services Group 
              to deliver exceptional cleaning and facility management solutions. Experience the 
              EFSG difference with our proven track record of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-cta-proposal">
                  REQUEST PROPOSAL
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  data-testid="button-cta-services"
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
