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
  Shield,
  Leaf,
  Headphones,
  Settings,
  Target,
  Store,
  Warehouse,
  UtensilsCrossed,
  Stethoscope,
  Landmark,
  GraduationCap,
  Car,
  DoorOpen,
  Coffee,
  Bath,
  BadgeCheck,
  Bug,
  CalendarClock
} from "lucide-react";
import heroImage from "@assets/Covid_19_BG_image_1774968019559.webp";
import sectionImage from "@assets/routine-disinfection-of-building-corridor-2026-03-13-05-51-54-_1774860690076.jpg";
import tailoredImage from "@assets/man-wearing-protective-suit-disinfecting-school-cl-2026-03-20-_1774860864222.jpg";
import officeBuildingImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function Disinfection() {
  const keyBenefits = [
    {
      icon: Shield,
      title: "Protect Employees",
      description: "Protect your employees from harmful bacteria and viruses.",
    },
    {
      icon: Leaf,
      title: "Prevent Mold Growth",
      description: "Prevent the growth of mold and mildew in your facility.",
    },
    {
      icon: Users,
      title: "Safe Environment",
      description: "Create a safe and healthy environment for employees.",
    },
    {
      icon: Target,
      title: "Contaminant Free",
      description: "Building free of harmful contaminants.",
    },
    {
      icon: Building2,
      title: "Prolong Building Life",
      description: "Prolong the life of your building materials.",
    },
  ];

  const disinfectionTasks = [
    { icon: DoorOpen, title: "High-Touch Surfaces", description: "Doorknobs, light switches, handles, and frequently touched areas." },
    { icon: Coffee, title: "Communal Spaces", description: "Break rooms, lobbies, common areas thoroughly disinfected." },
    { icon: Bath, title: "Restroom Disinfection", description: "Complete bathroom sanitization for hygiene and safety." },
    { icon: BadgeCheck, title: "CDC-Approved Products", description: "Using certified disinfectants that meet health standards." },
    { icon: Bug, title: "Pathogen Elimination", description: "Targeting viruses and bacteria for complete elimination." },
    { icon: CalendarClock, title: "Scheduled Protocols", description: "Regular disinfection routines tailored to your needs." },
  ];

  const howWeWorkSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "We assess your facility's specific disinfection needs and high-risk areas.",
    },
    {
      step: "02",
      title: "Custom Plan",
      description: "Our team develops a customized disinfection protocol tailored to your facility.",
    },
    {
      step: "03",
      title: "Execute",
      description: "Trained professionals execute all disinfection tasks with CDC-approved products.",
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Advanced verification processes ensure complete pathogen elimination.",
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
        title="Disinfection Services"
        description="Professional disinfection services from Excel Facility Services Group. Certified protocols to keep your facility safe and healthy."
        path="/services/disinfection"
      />
      <Hero
        title="Commercial Disinfection Services"
        subtitle="In a workplace, disinfection is the process that helps to reduce the risk of cross-contamination and provides a clean and safe environment for employees, customers, and visitors."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "VIEW ALL SERVICES", href: "/services" }}
      />
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">ABOUT DISINFECTION SERVICES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">A Practical, Modern Approach to Disinfection</h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">Disinfection is now a standard part of facility care in many commercial environments. Whether the goal is routine hygiene support, high-touch surface attention, or added reassurance in shared spaces, disinfection helps reinforce cleaner, safer, and more confidence-inspiring workplaces.</p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                A properly disinfected commercial building is free of harmful bacteria and viruses that could make people sick. In addition, disinfection can help to prolong the life of your building by preventing the growth of mold and mildew.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                Invest in a quality disinfection program if you own or manage a commercial building. It will pay off in the long run by protecting your employees and keeping your building in good condition.
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
                alt="Professional Disinfection Services"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#97CC06] text-white p-6 rounded-md shadow-lg hidden md:block">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm font-medium">Pathogen Elimination</div>
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
              Why Professional Disinfection Services Matter
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional disinfection protects your employees and creates a healthier workplace environment.
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
              Comprehensive Disinfection Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team uses CDC-approved products and methods to keep your facility pathogen-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {disinfectionTasks.map((task, index) => (
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
                alt="Tailored Disinfection Solutions"
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
                At Excel Facility Services Group, we prioritize the health and safety of your workplace through our specialized disinfection services. Our expert team understands that regular cleaning is not enough to combat harmful pathogens, which is why we employ <strong>advanced disinfection methods</strong> tailored to your facility's unique needs.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
                We focus on high-touch areas such as doorknobs, light switches, and communal spaces, utilizing <strong>CDC-approved disinfectants</strong> to effectively eliminate viruses and bacteria.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
                Our dedication to ensuring a germ-free environment fosters employee confidence and enhances productivity. Let Excel Facility Services Group be your trusted partner in creating a <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-safe">safe, healthy, and welcoming environment</Link>.
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
              EFSG is the perfect partner for your business. We provide tailored disinfection solutions that meet your specific needs.
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
              Ready to Transform Your Facility?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Excel Facility Services Group provides comprehensive disinfection services to protect your employees and keep your building safe and healthy.
            </p>
            <p className="text-lg text-white/80 mb-10">
              Partner with EFSG to create a pristine and pathogen-free environment that reflects your commitment to health and safety.
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
