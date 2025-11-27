import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Play,
  Star,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function HomeOriginal() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const valueProps = [
    {
      icon: Star,
      title: "CUSTOMER SATISFACTION GUARANTEE",
    },
    {
      icon: Users,
      title: "MANAGEMENT AND EMPLOYEE TRAINING",
    },
    {
      icon: Building2,
      title: "INNOVATIVE TECHNOLOGY AND UNDERSTANDING OF BUILDING NEEDS",
    },
  ];

  const industries = [
    { title: "OFFICE BUILDING", image: officeImage, href: "/industries/office-building" },
    { title: "RETAILER", image: retailImage, href: "/industries/retailer" },
    { title: "DISTRIBUTION CENTERS", image: distributionImage, href: "/industries/distribution-centers" },
    { title: "RESTAURANTS", image: restaurantImage, href: "/industries/restaurants" },
    { title: "MEDICAL GROUPS", image: medicalImage, href: "/industries/medical-groups" },
    { title: "BANKS", image: banksImage, href: "/industries/banks" },
    { title: "SCHOOLS", image: schoolsImage, href: "/industries/schools" },
    { title: "AUTO DEALERSHIPS", image: autoImage, href: "/industries/auto-dealerships" },
  ];

  const services = [
    {
      title: "JANITORIAL",
      description: "Janitorial services are essential for businesses of all sizes. It not only keeps the workplace looking clean and professional, but they also help to ensure a safe and healthy environment for customers and employees.",
      href: "/services/janitorial",
    },
    {
      title: "DAY PORTERS",
      description: "A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. Day porters typically work during regular business hours, ensuring that the building is clean and presentable for employees and visitors.",
      href: "/services/day-porters",
    },
    {
      title: "LEVELUP CLEAN ®",
      description: "A healthier space for businesses and people to thrive! LEVEL UP CLEAN ® helps clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers sanitized spaces with certified disinfection.",
      href: "/services/levelup-clean",
    },
    {
      title: "DISINFECTION",
      description: "In commercial cleaning, disinfection is a process of applying an antimicrobial agent on all surfaces to destroy or inhibit the growth of potentially harmful microorganisms.",
      href: "/services/disinfection",
    },
  ];

  return (
    <div>
      {/* Section 1: Hero with "CREATING HEALTHIER WORKPLACES" */}
      <section className="relative min-h-[600px] md:min-h-[700px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-[#063970]/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-32 md:pt-24 md:pb-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center cursor-pointer hover-elevate" data-testid="button-play-video">
                <Play className="h-10 w-10 text-[#97CC06] fill-[#97CC06]" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="heading-hero">
              CREATING <span className="font-black">HEALTHIER</span> WORKPLACES
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We help clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers healthy workplaces with certified disinfection.
            </p>
            
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 text-lg px-8 font-semibold"
                data-testid="button-our-services"
              >
                OUR SERVICES
              </Button>
            </Link>
          </div>
        </div>

        {/* Value Propositions Cards */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {valueProps.map((prop, index) => (
                  <div 
                    key={index} 
                    className="p-6 md:p-8 text-center"
                    data-testid={`card-value-prop-${index}`}
                  >
                    <div className="flex justify-center mb-4">
                      <prop.icon className="h-12 w-12 text-[#063970]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-bold text-[#063970] uppercase tracking-wide">
                      {prop.title}
                    </h3>
                  </div>
                ))}
                <div className="p-6 md:p-8 bg-[#063970] text-center flex flex-col justify-center">
                  <p className="text-white text-sm font-medium mb-2 uppercase">
                    A Healthier Space for Businesses and People to Thrive!
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[#97CC06] font-bold text-xl">LEVELUP</span>
                    <span className="text-white font-bold text-xl">CLEAN</span>
                    <span className="text-[#97CC06] text-xs">®</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "WE ARE COMMITTED TO CLEANING EXCELLENCE!" */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-[#0A5EB9] text-lg md:text-xl italic mb-2" data-testid="text-tagline">
              WE ARE COMMITTED TO CLEANING EXCELLENCE!
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#063970] mb-8" data-testid="heading-cleaning-excellence">
              EFSG provides an array of cleaning services that allow workplaces to run smoothly and efficiently.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0A5EB9] mb-4" data-testid="heading-company-title">
                Excel Facility Services Group | Commercial Cleaning Service
              </h3>
              <p className="text-muted-foreground mb-6">
                With more than <strong>20 years of experience</strong> in over 20 states, Excel Facility Services Group has become one of the most reliable commercial cleaning companies in the United States.
              </p>
              <Link href="/about">
                <Button 
                  className="bg-[#063970] hover:bg-[#063970]/90 text-white"
                  data-testid="button-about-us"
                >
                  ABOUT US
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Professional cleaning service" 
                className="rounded-lg w-full h-auto shadow-lg"
                data-testid="img-cleaning-worker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: People Matter Quote + Industries Banner */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-0" data-testid="text-people-matter">
            People matter. That is why we strive to deliver the best commercial cleaning services. Our goal is to use our services to boost your customers' confidence, knowing that their well-being is your priority.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase" data-testid="heading-industries-banner">
              EFSG Helps Different Industries and All Types of Facilities Across the Country!
            </h2>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 font-semibold whitespace-nowrap"
                data-testid="button-request-estimate"
              >
                REQUEST AN ESTIMATE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Industries Carousel */}
      <section className="py-16 md:py-24 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="relative">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              data-testid="button-carousel-prev"
              aria-label="Previous industries"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <div className="overflow-hidden mx-8" ref={emblaRef}>
              <div className="flex gap-6">
                {industries.map((industry, index) => (
                  <div 
                    key={index} 
                    className="flex-none w-full sm:w-1/2 lg:w-1/4"
                  >
                    <Link href={industry.href}>
                      <Card 
                        className="overflow-hidden border-0 cursor-pointer group bg-gradient-to-b from-white/10 to-[#063970]/50 backdrop-blur-sm"
                        data-testid={`card-industry-${index}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg m-3">
                          <img
                            src={industry.image}
                            alt={industry.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            data-testid={`img-industry-${index}`}
                          />
                        </div>
                        <CardContent className="p-4 pt-2 text-center bg-gradient-to-b from-[#0A5EB9] to-[#063970]">
                          <h3 className="text-lg font-bold text-white mb-3 uppercase">
                            {industry.title}
                          </h3>
                          <Button 
                            size="sm"
                            className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-[#063970] font-semibold border-0"
                            data-testid={`button-read-more-${index}`}
                          >
                            READ MORE
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              data-testid="button-carousel-next"
              aria-label="Next industries"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground italic max-w-2xl" data-testid="heading-services">
              From offices to classrooms, we have the commercial cleaning experience you need.
            </h2>
            <Link href="/services">
              <Button 
                variant="outline"
                size="lg"
                className="border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white font-semibold"
                data-testid="button-view-all-services"
              >
                VIEW ALL SERVICES
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card 
                  className="overflow-hidden border-0 cursor-pointer group h-full"
                  data-testid={`card-service-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-[#97CC06]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#97CC06]/80 to-[#063970]/60" />
                  </div>
                  <CardContent className="p-6 bg-[#0A5EB9] text-white min-h-[200px]">
                    <h3 className="text-lg font-bold mb-3 uppercase">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
