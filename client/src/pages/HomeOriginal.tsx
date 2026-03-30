import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Star,
  Users,
  Building2,
  Lightbulb,
  Sparkles,
  Shield,
  Droplets,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  TrendingUp,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";
import heroImage2 from "@assets/Hero_building_image1_1774628077282.webp";
import heroImage3 from "@assets/Hero_building_image2_1774628077283.webp";
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
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

const certLogos = [
  { name: "SHCCNJ", logo: shccnjLogo },
  { name: "SBE", logo: sbeLogo },
  { name: "Port Authority NY/NJ", logo: portAuthorityLogo },
  { name: "NMSDC", logo: nmsdcLogo },
  { name: "MBE", logo: mbeLogo },
  { name: "ISSA", logo: issaLogo },
  { name: "IFMA", logo: ifmaLogo },
  { name: "Green Seal", logo: greenSealLogo },
  { name: "Connex", logo: connexLogo },
  { name: "Inc. 5000", logo: inc5000Logo },
  { name: "Avetta", logo: avettaLogo },
  { name: "Somerset", logo: somersetLogo },
];

export default function HomeOriginal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const valueProps = [
    {
      icon: Star,
      title: "Customer Satisfaction Guarantee",
      description: "Our commitment to excellence ensures your complete satisfaction with every service we provide.",
    },
    {
      icon: Users,
      title: "Management and Employee Training",
      description: "Continuous professional development programs that elevate our team's expertise and service quality.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Technology",
      description: "Understanding of building needs through cutting-edge technology and data-driven solutions.",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "A healthier space for businesses and people to thrive with certified disinfection protocols.",
    },
  ];

  const industries = [
    { title: "Office Building", image: officeImage, href: "/industries/office-building" },
    { title: "Retailer", image: retailImage, href: "/industries/retailer" },
    { title: "Distribution Centers", image: distributionImage, href: "/industries/distribution-centers" },
    { title: "Restaurants", image: restaurantImage, href: "/industries/restaurants" },
    { title: "Medical Groups", image: medicalImage, href: "/industries/medical-groups" },
    { title: "Banks", image: banksImage, href: "/industries/banks" },
    { title: "Schools", image: schoolsImage, href: "/industries/schools" },
    { title: "Auto Dealerships", image: autoImage, href: "/industries/auto-dealerships" },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Janitorial",
      description: "Janitorial services are essential for businesses of all sizes. It not only keeps the workplace looking clean and professional, but they also help to ensure a safe and healthy environment for customers and employees.",
      image: officeImage,
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description: "A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. Day porters typically work during regular business hours, ensuring that the building is clean and presentable.",
      image: retailImage,
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "A healthier space for businesses and people to thrive! LEVEL UP CLEAN® helps clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach.",
      image: medicalImage,
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description: "In commercial cleaning, disinfection is a process of applying an antimicrobial agent on all surfaces to destroy or inhibit the growth of potentially harmful microorganisms.",
      image: distributionImage,
      href: "/services/disinfection",
    },
  ];

  const companyStats = [
    { label: "Years of Excellence", value: "20+" },
    { label: "States Nationwide", value: "28" },
    { label: "Sq Ft Serviced Daily", value: "25M+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  const stats = [
    {
      value: "28",
      label: "States Nationwide",
      icon: Globe,
    },
    {
      value: "25M",
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

  return (
    <div>
      <SEO
        title="Commercial Cleaning Services"
        description="Excel Facility Services Group provides professional commercial cleaning services with 20+ years of experience across 20+ states. Janitorial, disinfection, floor care, and facility maintenance solutions."
        path="/"
      />
      {/* Hero Section - Template 3 style with original content */}
      <Hero
        title="Creating Healthier Workplaces"
        subtitle="Facility Services Built for Multi-Site Performance. Excel Facility Services Group helps organizations maintain cleaner, safer, and more consistent environments through accountable service delivery, regional responsiveness, and standards built for operational performance."
        imageSrc={heroImage}
        images={[heroImage, heroImage2, heroImage3]}
        primaryCta={{ text: "OUR SERVICES", href: "/services" }}
        secondaryCta={{ text: "CONTACT US", href: "/contact" }}
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

      {/* Certification Logo Carousel */}
      <section className="py-12 bg-white border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 mb-6 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground" data-testid="text-certifications-label">
            Trusted &amp; Certified
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left-slow" style={{ width: "max-content" }}>
            {[...certLogos, ...certLogos].map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-8 shrink-0"
                data-testid={`img-cert-logo-${i}`}
              >
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="max-h-16 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions - 4-Step Workflow Style */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-process">
              WHY CHOOSE EFSG
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="heading-process">
              Our Commitment to Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Four pillars that define our approach to delivering exceptional commercial cleaning services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="relative" data-testid={`card-value-prop-${index}`}>
                <Card className="h-full hover-elevate transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#063970]">
                        <prop.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-[#97CC06]/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3">{prop.title}</CardTitle>
                    <CardDescription className="text-base">
                      {prop.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
                {index < valueProps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-[#97CC06]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Section - Template 3 two-column style with original content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">
                WE ARE COMMITTED TO CLEANING EXCELLENCE!
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-cleaning-excellence">
                EFSG provides an array of cleaning services that allow workplaces to run smoothly and efficiently.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                With more than <strong>20 years of experience</strong> in over 20 states, Excel Facility Services 
                Group has become one of the most reliable commercial cleaning companies in the United States.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                People matter. That is why we strive to deliver the best commercial cleaning services. 
                Our goal is to use our services to boost your customers' confidence, knowing that their 
                well-being is your priority.
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-about-us">
                  ABOUT US
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt="Excel Facility Services Team"
                className="rounded-md w-full h-auto"
                data-testid="img-cleaning-worker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Banner + Carousel - Template 3 style with 8 industries */}
      <section className="py-12 md:py-16 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <Badge variant="outline" className="mb-4 border-white/30 text-white" data-testid="badge-industries">
                INDUSTRIES WE SERVE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="heading-industries-banner">
                EFSG Helps Different Industries and All Types of Facilities Across the Country!
              </h2>
            </div>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 font-semibold whitespace-nowrap"
                data-testid="button-request-estimate"
              >
                REQUEST AN ESTIMATE
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Industries Carousel */}
          <div className="relative">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              data-testid="button-carousel-prev"
              aria-label="Previous industries"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <div className="overflow-hidden mx-8 md:mx-12" ref={emblaRef}>
              <div className="flex gap-4 md:gap-6">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className="flex-none w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]"
                  >
                    <Link href={industry.href}>
                      <Card
                        className="overflow-hidden hover-elevate transition-all cursor-pointer group border-0"
                        data-testid={`card-industry-${index}`}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={industry.image}
                            alt={industry.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            data-testid={`img-industry-${index}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#063970]/90 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                              {industry.title}
                            </h3>
                            <div className="flex items-center text-white/90 text-sm">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              data-testid="button-carousel-next"
              aria-label="Next industries"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - Template 3 style with original 4 services */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-services">
              OUR SERVICES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 italic" data-testid="heading-services">
              From offices to classrooms, we have the commercial cleaning experience you need.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive cleaning solutions designed for every type of commercial facility
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

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white font-semibold"
                data-testid="button-view-all-services"
              >
                VIEW ALL SERVICES
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Template 3 style */}
      <section className="py-20 md:py-28 bg-[#063970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#97CC06] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A5EB9] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="heading-cta">
              Ready to Create a Healthier Workplace?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10">
              Join leading businesses across 28 states who trust Excel Facility Services Group 
              for professional commercial cleaning excellence.
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
