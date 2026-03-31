import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  ThumbsUp, 
  Building2,
  SprayCan,
  Shield,
  Headphones,
  Settings,
  Store,
  Warehouse,
  UtensilsCrossed,
  Stethoscope,
  Landmark,
  GraduationCap,
  Car,
  Zap,
  HeartPulse,
  ClipboardCheck,
  FileCheck,
  PackageCheck
} from "lucide-react";
import heroImage from "@assets/LevelUp_Clean_BG_1774970115114.webp";
import sectionImage from "@assets/LevelUp_Clean_1_1774970015050.webp";
import tailoredImage from "@assets/LevelUp_Clean_2_1774970030450.webp";
import officeBuildingImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function LevelUpClean() {
  const keyBenefits = [
    {
      icon: Shield,
      title: "Three-Step Certified Disinfection",
      description: "Our proven three-step approach delivers certified disinfection for maximum protection.",
    },
    {
      icon: HeartPulse,
      title: "Healthier Workplaces",
      description: "Creates healthier workplaces for businesses and their employees.",
    },
    {
      icon: Users,
      title: "Trained Excel Associates",
      description: "Expert team members with specialized training and expertise.",
    },
    {
      icon: FileCheck,
      title: "Government Aligned",
      description: "Aligned with CDC, WHO, and OSHA recommendations.",
    },
    {
      icon: PackageCheck,
      title: "Competitive Supply Resources",
      description: "Cost-effective supply resource management for your facility.",
    },
  ];

  const cleaningTasks = [
    { icon: SprayCan, title: "Contamination Cleaning", description: "Deep cleaning to remove contaminants and ensure a safe environment." },
    { icon: Users, title: "Day Porter Services", description: "Ongoing cleanliness throughout the day to maintain pristine conditions." },
    { icon: Shield, title: "Disinfecting Services", description: "Added to routine cleaning protocols for enhanced protection." },
    { icon: Zap, title: "Electrostatic Technology", description: "Advanced cleaning technology used for thorough cleaning intervals." },
    { icon: ClipboardCheck, title: "Trained Associates", description: "Certified Excel team members with specialized expertise." },
    { icon: FileCheck, title: "Government Aligned", description: "Following CDC, WHO, and OSHA guidelines for safety compliance." },
  ];

  const howWeWorkSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "We evaluate the facility, traffic patterns, hygiene priorities, and service needs to define the right LevelUp Clean® scope.",
    },
    {
      step: "02",
      title: "Program Design",
      description: "Our team develops a service approach aligned with the building's operational realities, shared spaces, and client expectations.",
    },
    {
      step: "03",
      title: "Execution and Oversight",
      description: "Trained Excel service teams deliver the program with responsive support, quality checks, and ongoing oversight to help maintain cleaner, safer, and more consistent environments.",
    },
  ];

  const industries = [
    { title: "Office Building", href: "/industries/office-building", icon: Building2, image: officeBuildingImage },
    { title: "Retail Stores", href: "/industries/retailer", icon: Store, image: retailImage },
    { title: "Distribution Centers", href: "/industries/distribution-centers", icon: Warehouse, image: distributionImage },
    { title: "Restaurants", href: "/industries/restaurants", icon: UtensilsCrossed, image: restaurantImage },
    { title: "Medical Groups", href: "/industries/medical-groups", icon: Stethoscope, image: medicalImage },
    { title: "Banks", href: "/industries/banks", icon: Landmark, image: banksImage },
    { title: "Schools", href: "/industries/schools", icon: GraduationCap, image: schoolsImage },
    { title: "Auto Dealerships", href: "/industries/auto-dealerships", icon: Car, image: autoImage },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Certified Disinfection",
      description: "Proven three-step approach with verified results.",
    },
    {
      icon: Clock,
      title: "Prompt Response Time",
      description: "Timely answers to your needs and questions.",
    },
    {
      icon: ThumbsUp,
      title: "Transparency & Professionalism",
      description: "Open communication and reliable follow-up.",
    },
    {
      icon: Settings,
      title: "Advanced Technology",
      description: "Electrostatic and cutting-edge cleaning solutions.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Our team works tirelessly behind the scenes for you.",
    },
  ];

  return (
    <div>
      <SEO
        title="LevelUp Clean®"
        description="LevelUp Clean® by Excel Facility Services Group — advanced cleaning and disinfection with verified results and transparency."
        path="/services/levelup-clean"
      />
      {/* Hero Section */}
      <Hero
        title="LevelUp Clean®"
        subtitle="Excel's structured service approach helps organizations maintain cleaner, safer, and more consistent environments through accountable execution, responsive support, and stronger quality control across client sites."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "VIEW ALL SERVICES", href: "/services" }}
      />
      {/* About Section - Split Layout */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">
                ABOUT LEVELUP CLEAN®
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">A Structured Approach to Healthier Workplaces</h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">LevelUp Clean® is Excel Facility Services Group’s service methodology for delivering commercial cleaning and facility services with greater consistency, accountability, and operational oversight. Built on more than 20 years of experience and multi-state capability, this approach helps clients maintain cleaner, safer, and more dependable environments across their facilities.</p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                From janitorial services and day porter support to disinfection and specialty facility solutions, LevelUp Clean® is designed to strengthen day-to-day execution through communication, quality control, and responsive service management. The result is a cleaner, healthier workplace experience for employees, tenants, visitors, and customers.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">Excel Facility Services Group is fully insured and bonded, giving clients added confidence that their facilities are supported by a professional team committed to reliable service delivery and long-term accountability.</p>
              <Link href="/contact" data-testid="link-get-started">
                <Button size="lg" data-testid="button-get-started">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={sectionImage}
                alt="LevelUp Clean Professional Services"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#97CC06] text-white p-6 rounded-md shadow-lg hidden md:block">
                <div className="text-4xl font-bold">3-Step</div>
                <div className="text-sm font-medium">Certified Disinfection</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Key Benefits Section - 5 Icon Cards */}
      <section className="py-16 md:py-24 bg-[#f0f2f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-benefits">
              KEY BENEFITS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-benefits">
              Why Choose LevelUp Clean®
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach ensures your facility receives the highest level of certified disinfection and ongoing protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="h-full hover-elevate transition-all text-center border-t-4 border-t-[#97CC06]" data-testid={`card-benefit-${index}`}>
                <CardHeader>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#063970]/10 mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-[#063970]" />
                  </div>
                  <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* How We Work Section - 4 Step Process */}
      <section className="py-16 md:py-24 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/30 text-white" data-testid="badge-process">
              OUR PROCESS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="heading-process">
              The LevelUp Clean® Three-Step Approach
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Excel follows a structured service process designed to support consistency, accountability, and healthier workplace outcomes across client facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howWeWorkSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`step-${index}`}>
                <div className="text-6xl md:text-7xl font-bold text-white/10 absolute -top-4 -left-2">
                  {step.step}
                </div>
                <div className="pt-8 pl-4">
                  <h3 className="text-xl font-bold mb-3 text-[#97CC06]">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
                {index < howWeWorkSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-[#97CC06]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Cleaning Tasks Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-tasks">
              COMPREHENSIVE APPROACH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tasks">
              The LevelUp Clean® Comprehensive Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">LevelUp Clean® combines structured service delivery, trained teams, and targeted support to help facilities maintain stronger consistency, cleaner environments, and healthier daily operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cleaningTasks.map((task, index) => (
              <Card key={index} className="h-full hover-elevate transition-all group" style={{ boxShadow: '0 4px 20px rgba(6, 57, 112, 0.12)' }} data-testid={`card-task-${index}`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#97CC06]/10 group-hover:bg-[#97CC06]/20 transition-colors">
                      <task.icon className="h-7 w-7 text-[#97CC06]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{task.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{task.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Tailored Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1 relative">
              <img
                src={tailoredImage}
                alt="LevelUp Clean Tailored Solutions"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-tailored"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
                PEOPLE MATTER
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-tailored">
                At EFSG, We Understand That People Matter
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
                For this reason, we dedicate ourselves to providing janitorial solutions that help businesses run smoothly and efficiently. Our LevelUp Clean® program is designed with your employees' health and safety as the top priority.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
                Contact us today to learn more about how we can help you create a thriving workplace for your business. Our team is ready to develop a customized disinfection plan that meets your specific needs.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
                With our <strong>three-step certified disinfection approach</strong>, advanced <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-electrostatic">electrostatic technology</Link>, and trained associates, you can trust that your facility will be thoroughly protected and maintained to the highest standards.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" data-testid="link-contact-us">
                  <Button size="lg" data-testid="button-contact">
                    Contact Us Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Industries We Serve - Auto-scrolling Slider */}
      <section className="py-16 md:py-24 overflow-hidden relative bg-[#97CC06]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0A5EB9] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0A5EB9] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#063970] text-[#063970]" data-testid="badge-industries">
              INDUSTRIES WE SERVE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#063970]" data-testid="heading-industries">
              Find Your Industry
            </h2>
            <p className="text-lg text-[#063970]/80 max-w-3xl mx-auto">
              EFSG is the perfect partner for your business. We provide tailored LevelUp Clean® solutions that meet your specific needs.
            </p>
          </div>
        </div>

        {/* Single Row - Auto-scrolling */}
        <div className="relative z-10">
          <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
            {[...industries, ...industries, ...industries, ...industries].map((industry, index) => (
              <Link key={index} href={industry.href} data-testid={`link-industry-${index}`} className="flex-shrink-0 px-2">
                <Card className="w-64 hover-elevate transition-all cursor-pointer group border-2 border-transparent hover:border-[#97CC06] overflow-hidden bg-white shadow-lg">
                  <div className="h-1 bg-[#063970] w-full" />
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={industry.image} 
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-sm md:text-base text-[#063970] group-hover:text-[#0A5EB9] transition-colors whitespace-nowrap">{industry.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-why-choose">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-choose">
              We Go Above and Beyond
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At Excel Facility Services Group, we go above and beyond to provide you with certified disinfection and a superior level of service that distinguishes us from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="h-full hover-elevate transition-all border-2 border-[#97CC06] bg-background text-center" data-testid={`card-why-${index}`}>
                <CardHeader className="pb-2">
                  <div className="flex h-16 w-16 items-center justify-center mx-auto mb-4">
                    <item.icon className="h-10 w-10 text-[#97CC06]" />
                  </div>
                  <CardTitle className="text-base font-semibold text-[#063970]">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-[#063970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#97CC06] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A5EB9] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="heading-cta">
              Creating Healthier Workplaces
            </h2>
            <p className="text-xl text-white/90 mb-6">
              If you are looking for a commercial cleaning company you can trust to deliver certified disinfection, look no further than Excel Facility Services Group and our LevelUp Clean® program.
            </p>
            <p className="text-lg text-white/80 mb-10">
              Partner with EFSG to create a healthy, safe environment that protects your employees and demonstrates your commitment to workplace wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" data-testid="link-request-estimate">
                <Button
                  size="lg"
                  className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 text-lg px-8"
                  data-testid="button-request-proposal"
                >
                  REQUEST AN ESTIMATE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services" data-testid="link-explore-services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8"
                  data-testid="button-explore-services"
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
