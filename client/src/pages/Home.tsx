import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import IndustryCard from "@/components/IndustryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        title="Excel Facility Services Group | Commercial Cleaning Service"
        subtitle="With more than 20 years of experience in over 20 states, Excel Facility Services Group has become one of the most reliable commercial cleaning companies in the United States."
        imageSrc={heroImage}
        primaryCta={{ text: "ABOUT US", href: "/about" }}
      />

      {/* Trust Indicators Banner */}
      <section className="py-12 bg-muted/50">
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
      <section className="py-12 bg-background">
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
              <p className="text-lg text-muted-foreground mb-8">
                People matter. That is why we strive to deliver the best commercial cleaning services. 
                Our goal is to use our services to boost your customers' confidence, knowing that their 
                well-being is your priority.
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

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-muted/30">
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
      <section className="py-16 md:py-24">
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
    </div>
  );
}
