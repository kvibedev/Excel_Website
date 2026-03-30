import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Award, 
  Clock, 
  ThumbsUp, 
  Building2,
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
  Sun,
  Droplets,
  Briefcase,
  Square,
  Building,
  CheckCircle,
  Frame,
  Sparkles,
  DoorOpen
} from "lucide-react";
import heroImage from "@assets/high-rise-window-washers-seoul-korea-2026-03-24-07-16-35-utc_1774631783713.jpg";
import sectionImage from "@assets/window_washing_1_1774862922074.webp";
import tailoredImage from "@assets/glass-cleaning-with-special-chemicals-cleaning-se-2026-03-25-0_1774632037682.jpg";
import officeBuildingImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function WindowWashing() {
  const keyBenefits = [
    {
      icon: Building2,
      title: "Improve Appearance",
      description: "Improve the appearance of the building with crystal-clear windows.",
    },
    {
      icon: Shield,
      title: "Extend Window Life",
      description: "Extend the life of windows by removing corrosive materials.",
    },
    {
      icon: Droplets,
      title: "Better Air Quality",
      description: "Improve indoor air quality by reducing dust and allergens.",
    },
    {
      icon: Briefcase,
      title: "Professional Image",
      description: "Make your business look more professional and inviting.",
    },
    {
      icon: Sun,
      title: "More Natural Light",
      description: "Increase natural light levels for a brighter workspace.",
    },
  ];

  const windowTasks = [
    { icon: Square, title: "Exterior Windows", description: "Complete outside window cleaning for a spotless exterior appearance." },
    { icon: Building, title: "Interior Windows", description: "Inside glass and frame cleaning for crystal-clear views." },
    { icon: Building2, title: "High-Rise Cleaning", description: "Safe cleaning of tall buildings with specialized equipment." },
    { icon: DoorOpen, title: "Glass Door Cleaning", description: "Entrance and exit glass doors cleaned to perfection." },
    { icon: Sparkles, title: "Streak-Free Finish", description: "Professional spotless results every time." },
    { icon: Frame, title: "Frame & Sill Cleaning", description: "Complete window maintenance including frames and sills." },
  ];

  const howWeWorkSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "We assess your windows and specific needs to develop a customized cleaning plan.",
    },
    {
      step: "02",
      title: "Custom Plan",
      description: "Our team works closely with you to develop a cleaning schedule that fits your operations.",
    },
    {
      step: "03",
      title: "Execute",
      description: "Professional window washers execute all cleaning tasks with precision and care.",
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Thorough inspection ensures streak-free, spotless results and complete satisfaction.",
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
      title: "Customer Satisfaction Guarantee",
      description: "We go above and beyond to provide superior service.",
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
      title: "Cutting-Edge Technology",
      description: "Advanced technology to enhance our services.",
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
        title="Window Washing"
        description="Commercial window washing services from Excel Facility Services Group. Keep your building looking professional and spotless."
        path="/services/window-washing"
      />
      <Hero
        title="Window Washing"
        subtitle="Window washing is a necessary service for keeping a commercial building looking its best."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "VIEW ALL SERVICES", href: "/services" }}
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">
                ABOUT OUR SERVICE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">
                Crystal Clear Windows for Your Business
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                Window washing is an important part of any commercial building maintenance plan. Our services not only improve the appearance of the building but also help extend the life of window panes by removing dirt, debris, and other corrosive materials. Excel Facility Services Group's window washing service can help improve indoor air quality by reducing the dust and allergens that circulate inside the building.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                Window washing makes your workplace look cleaner and inviting; it can help remove any build-up of dirt, pollen, and other allergens that can accumulate on windows over time.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                It can also help prolong your windows' life by preventing damage from the elements and help increase natural light levels in a room, making it more cheerful and inviting.
              </p>
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
                alt="Professional Window Washing Services"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#97CC06] text-white p-6 rounded-md shadow-lg hidden md:block">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm font-medium">Streak-Free Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-[#f0f2f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-benefits">
              KEY BENEFITS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-benefits">
              Why Professional Window Washing Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Clean windows create a positive first impression and contribute to a healthier, more productive work environment.
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
      <section className="py-16 md:py-24 bg-[#063970]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-white/30 text-white" data-testid="badge-process">
              OUR PROCESS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="heading-process">
              How We Deliver Excellence
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our dedicated team works closely with you to guarantee your utmost satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-tasks">
              WHAT WE DO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tasks">
              Comprehensive Window Washing Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our professional window washers are equipped to handle all your window cleaning needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {windowTasks.map((task, index) => (
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1 relative">
              <img
                src={tailoredImage}
                alt="Tailored Window Washing Solutions"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-tailored"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
                TAILORED SOLUTIONS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-tailored">
                What Truly Sets EFSG Apart
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
                At Excel Facility Services Group, our commitment to excellence extends beyond traditional cleaning. Our professional window washing services ensure that your commercial building shines, creating an inviting atmosphere for both employees and customers.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
                We understand that clean windows are essential in projecting a <strong>positive image</strong> of your business. Regular window washing not only improves aesthetics but also helps prevent deterioration caused by dirt and environmental factors.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
                Our trained professionals use <strong>specialized equipment and eco-friendly cleaning solutions</strong> to deliver streak-free results that enhance your building's appearance and protect your investment in quality windows.
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
              EFSG is the perfect partner for your business. We provide tailored solutions that meet your specific needs.
            </p>
          </div>
        </div>

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
              At Excel Facility Services Group, we go above and beyond to provide you with a superior level of service that distinguishes us from the competition.
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
      <section className="py-20 md:py-28 bg-[#063970] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#97CC06] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A5EB9] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" data-testid="heading-cta">
              Ready for Sparkling Clean Windows?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Excel Facility Services Group provides professional window washing services that will make your commercial building shine.
            </p>
            <p className="text-lg text-white/80 mb-10">
              Partner with EFSG to create a bright, inviting environment that reflects your brand's professionalism.
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
