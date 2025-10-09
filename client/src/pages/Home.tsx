import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import IndustryCard from "@/components/IndustryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Sparkles,
  Users,
  Shield,
  Droplets,
  Award,
  GraduationCap,
  Cpu,
  Heart,
  CheckCircle2,
  TrendingUp,
  Building2,
  Globe,
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";

export default function Home() {
  const trustIndicators = [
    {
      icon: Award,
      title: "Customer satisfaction guarantee",
      href: "/about",
    },
    {
      icon: GraduationCap,
      title: "Management and employee training",
      href: "/about",
    },
    {
      icon: Cpu,
      title: "Innovative technology and understanding of building needs",
      href: "/about",
    },
    {
      icon: Heart,
      title: "A healthier space for businesses and people to thrive!",
      href: "/services",
    },
  ];

  const enterpriseStats = [
    { value: "28", label: "States Nationwide", icon: Globe },
    { value: "400M", label: "Sq Ft Managed Daily", icon: Building2 },
    { value: "20+", label: "Years of Excellence", icon: Award },
    { value: "Inc. 5000", label: "Recognized Growth", icon: TrendingUp },
  ];

  const credentials = [
    { name: "Inc. 5000", description: "Recognized Growth Leader" },
    { name: "MBE Certified", description: "Minority Business Enterprise" },
    { name: "Green Seal GS-42", description: "Environmental Excellence" },
  ];

  const whyChooseUs = [
    {
      title: "Enterprise-Scale Infrastructure",
      description: "Multi-state operations with the resources to handle large-scale, multi-location contracts. Proven track record managing 400 million square feet daily across diverse industries.",
    },
    {
      title: "Regional Accountability",
      description: "Unlike national chains, you get direct access to decision-makers and personalized strategies that transform facilities from cost centers into strategic assets.",
    },
    {
      title: "Data-Driven Performance",
      description: "Technology-enabled reporting provides transparency and actionable intelligence to optimize facility performance and demonstrate ROI.",
    },
    {
      title: "Operational Excellence",
      description: "20+ years of refinement across 28 states has perfected our systems, delivering consistent results that nationals cannot match.",
    },
  ];

  const featuredServices = [
    {
      icon: Sparkles,
      title: "Janitorial",
      description:
        "Janitorial services are essential for businesses of all sizes. It not only keeps the workplace looking clean and professional, but they also help to ensure a safe and healthy environment for customers and employees.",
      href: "/services",
    },
    {
      icon: Users,
      title: "Day Porters",
      description:
        "A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. Day porters typically work during regular business hours, ensuring that the building is clean and presentable for employees and visitors.",
      href: "/services",
    },
    {
      icon: Shield,
      title: "LevelUp Clean ®",
      description:
        "A healthier space for businesses and people to thrive! LEVEL UP CLEAN ® helps clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers sanitized spaces with certified disinfection.",
      href: "/services",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description:
        "In commercial cleaning, disinfection is a process of applying an antimicrobial agent on all surfaces to destroy or inhibit the growth of potentially harmful microorganisms.",
      href: "/services",
    },
  ];

  const industries = [
    { title: "Medical Groups", imageSrc: medicalImage, href: "/industries" },
    { title: "Banks", imageSrc: banksImage, href: "/industries" },
    { title: "Schools", imageSrc: schoolsImage, href: "/industries" },
    { title: "Auto Dealerships", imageSrc: autoImage, href: "/industries" },
    { title: "Office Building", imageSrc: officeImage, href: "/industries" },
    { title: "Retailer", imageSrc: retailImage, href: "/industries" },
    { title: "Distribution Centers", imageSrc: distributionImage, href: "/industries" },
    { title: "Restaurants", imageSrc: restaurantImage, href: "/industries" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Enterprise Facility Management Across 28 States"
        subtitle="With more than 20 years of excellence managing 400 million square feet daily, Excel Facility Services Group delivers enterprise-scale commercial cleaning solutions with the agility and accountability that national providers cannot match."
        imageSrc={heroImage}
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "LEARN MORE", href: "/about" }}
      />

      {/* Enterprise Stats Bar */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {enterpriseStats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-[#97CC06]">{stat.value}</span>
                </div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Bar */}
      <section className="py-8 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center">
            <p className="text-sm font-semibold text-muted-foreground">TRUSTED & CERTIFIED:</p>
            {credentials.map((credential, index) => (
              <div key={index} className="text-center" data-testid={`credential-${index}`}>
                <Badge variant="outline" className="text-sm px-4 py-1">
                  <Award className="h-3 w-3 mr-1 text-[#97CC06]" />
                  {credential.name}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Banner */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <Link key={index} href={indicator.href}>
                <Card className="hover-elevate transition-all h-full cursor-pointer" data-testid={`card-trust-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10">
                        <indicator.icon className="h-6 w-6 text-[#97CC06]" />
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-tight">{indicator.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline and Intro */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl font-semibold italic mb-4">
            We are Committed to Cleaning Excellence!
          </p>
          <p className="text-lg md:text-xl font-semibold max-w-4xl mx-auto">
            EFSG provides an array of cleaning services that allow workplaces to run smoothly and efficiently.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Intelligent Regional Alternative
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                People matter. That is why we strive to deliver the best commercial cleaning services. 
                Our goal is to use our services to boost your customers' confidence, knowing that their 
                well-being is your priority.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Excel delivers enterprise-scale facility management with the agility, innovation, and accountability 
                that nationals cannot match. We transform facilities from cost centers into strategic assets through 
                operational excellence and data-driven insights.
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-about-us">
                  ABOUT US
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Excel Facility Services Team"
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EFSG Over Nationals */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose EFSG Over National Providers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Enterprise capabilities with regional responsiveness—delivering results that matter to your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="h-full" data-testid={`value-prop-${index}`}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-[#97CC06]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
              EFSG Helps Different Industries and All Types of Facilities Across the Country!
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} {...industry} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-request-estimate">
                Request an Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From offices to classrooms, we have the commercial cleaning experience you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" data-testid="button-view-all-services">
                VIEW ALL SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Enterprise-Grade Facility Management?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join leading enterprises across 28 states who trust EFSG to deliver operational excellence 
            and strategic value through our proven facility management solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-cta-estimate">
                Request Enterprise Proposal
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-learn-more">
                Learn More About EFSG
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
