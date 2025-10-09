import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import IndustryCard from "@/components/IndustryCard";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Sparkles,
  Users,
  Shield,
  Droplets,
  Wind,
  Layers,
  SprayCan,
  Brush,
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
  const featuredServices = [
    {
      icon: Sparkles,
      title: "Janitorial Services",
      description:
        "Professional janitorial services that keep your workplace clean, safe, and presentable for employees and customers.",
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description:
        "Professional day porters maintain cleanliness and order during business hours, ensuring a pristine environment.",
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description:
        "A healthier space for businesses and people to thrive! Certified disinfection through our three-step approach.",
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description:
        "Applying antimicrobial agents to destroy or inhibit the growth of potentially harmful microorganisms.",
      href: "/services/disinfection",
    },
    {
      icon: Wind,
      title: "Air Duct & HVAC",
      description:
        "Regular maintenance of air duct and HVAC systems ensures smooth air quality throughout the workplace.",
      href: "/services/air-duct-hvac",
    },
    {
      icon: Layers,
      title: "Floor Care",
      description:
        "Maintain clean and polished floors to uphold a great and lasting impression for your business.",
      href: "/services/floor-care",
    },
    {
      icon: SprayCan,
      title: "Power Washing",
      description:
        "High-pressure water cleaning to remove dirt, grime, and surface deposits from various surfaces.",
      href: "/services/power-washing",
    },
    {
      icon: Brush,
      title: "Window Washing",
      description:
        "Professional window washing improves building appearance and extends window life by removing debris.",
      href: "/services/window-washing",
    },
  ];

  const industries = [
    { title: "Office Buildings", imageSrc: officeImage, href: "/industries/office-building" },
    { title: "Retailers", imageSrc: retailImage, href: "/industries/retailer" },
    { title: "Distribution Centers", imageSrc: distributionImage, href: "/industries/distribution-centers" },
    { title: "Restaurants", imageSrc: restaurantImage, href: "/industries/restaurants" },
    { title: "Medical Groups", imageSrc: medicalImage, href: "/industries/medical-groups" },
    { title: "Banks", imageSrc: banksImage, href: "/industries/banks" },
    { title: "Schools", imageSrc: schoolsImage, href: "/industries/schools" },
    { title: "Auto Dealerships", imageSrc: autoImage, href: "/industries/auto-dealerships" },
  ];

  return (
    <div>
      <Hero
        title="Professional Commercial Cleaning Services"
        subtitle="Creating healthier workplaces with 20+ years of experience"
        imageSrc={heroImage}
        primaryCta={{ text: "Get Estimate", href: "/contact" }}
        secondaryCta={{ text: "View Services", href: "/services" }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                At Excel, we understand that people matter.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Excel Facility Services Group has provided high-quality janitorial services since
                2001. As an established company, we take pride in the partnerships our customers
                have formed with us over time.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Through these partnerships, Excel Facility Services Group ensures their satisfaction
                and trust as they deliver excellent services at all times through customized plans.
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-about-us">
                  About Us
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

      <StatsBar />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              EFSG Helps Different Industries and All Types of Facilities Across the Country!
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From offices to classrooms, we have the commercial cleaning experience you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} {...industry} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/industries">
              <Button size="lg" variant="outline" data-testid="button-view-all-industries">
                View All Industries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We specialize in expert cleaning and disinfection services that help businesses run
              smoothly and efficiently.
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
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create a Healthier Workplace?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            If you are looking for a commercial cleaning company you can trust to get the job done
            right, look no further than Excel Facility Services Group.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" data-testid="button-cta-estimate">
              Request an Estimate Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
