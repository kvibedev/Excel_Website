import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  ThumbsUp, 
  Building2,
  Sparkles,
  SprayCan,
  Trash2,
  Wind,
  Shield,
  Leaf,
  Headphones,
  Settings,
  Target
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Janitorial() {
  const keyBenefits = [
    {
      icon: Sparkles,
      title: "Clean & Professional",
      description: "Keep your workplace looking clean and professional at all times.",
    },
    {
      icon: Shield,
      title: "Safe & Healthy",
      description: "Ensure a safe and healthy environment for employees.",
    },
    {
      icon: Users,
      title: "Professional Care",
      description: "Relax – let the professionals take care of janitorial services.",
    },
    {
      icon: Target,
      title: "Meet Your Needs",
      description: "Variety of services offered to meet your specific needs.",
    },
    {
      icon: Building2,
      title: "Cost-Effective",
      description: "Cost-effective solutions for businesses of all sizes.",
    },
  ];

  const cleaningTasks = [
    { icon: SprayCan, title: "Dusting", description: "Thorough dusting of all surfaces, fixtures, and hard-to-reach areas." },
    { icon: Sparkles, title: "Mopping & Sweeping", description: "Professional floor care to keep your spaces spotless." },
    { icon: Wind, title: "Vacuuming", description: "Deep vacuuming of carpets, rugs, and upholstered furniture." },
    { icon: Shield, title: "Disinfecting", description: "Bathrooms and kitchens disinfected to the highest standards." },
    { icon: Trash2, title: "Trash Disposal", description: "Regular trash removal and recycling management." },
    { icon: Leaf, title: "Floor Polishing", description: "Professional floor polishing for a lasting shine." },
  ];

  const howWeWorkSteps = [
    {
      step: "01",
      title: "Assessment",
      description: "We assess your specific needs and offer personalized cleaning solutions tailored to your facility.",
    },
    {
      step: "02",
      title: "Custom Plan",
      description: "Our team works closely with you to develop a customized cleaning plan that fits your schedule.",
    },
    {
      step: "03",
      title: "Execute",
      description: "Dedicated janitors execute all cleaning tasks with precision and efficiency.",
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Advanced technology streamlines inspections to ensure smooth operations and complete satisfaction.",
    },
  ];

  const industriesRow1 = [
    { title: "Office Building", href: "/industries/office-building" },
    { title: "Retail Stores", href: "/industries/retailer" },
    { title: "Distribution Centers", href: "/industries/distribution-centers" },
    { title: "Restaurants", href: "/industries/restaurants" },
  ];

  const industriesRow2 = [
    { title: "Medical Groups", href: "/industries/medical-groups" },
    { title: "Banks", href: "/industries/banks" },
    { title: "Schools", href: "/industries/schools" },
    { title: "Auto Dealerships", href: "/industries/auto-dealerships" },
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
      {/* Hero Section */}
      <Hero
        title="Commercial Janitorial Services"
        subtitle="We specialize in comprehensive commercial janitorial services tailored to meet the needs of businesses of all sizes."
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
                ABOUT OUR SERVICE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">
                A Clean Space is Essential to Your Success
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                When it comes to maintaining a spotless and professional commercial space, janitorial services are crucial. Regardless of the type of business you run – an <Link href="/industries/office-building" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-office">office building</Link>, <Link href="/industries/retailer" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-retail">retail store</Link>, <Link href="/industries/distribution-centers" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-distribution">distribution center</Link>, or any other establishment – the importance of keeping your workplace tidy must be considered.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                At <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-efsg">EFSG</Link>, we pride ourselves on our team of experienced professionals who possess the skills and expertise required to handle all your janitorial and cleaning requirements with the utmost precision and efficiency.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                We understand that a clean and well-maintained commercial space is important to the success of your business. With our expertise, you can confidently focus on running your business while we handle all your janitorial duties.
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
                src={heroImage}
                alt="Professional Janitorial Services"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#97CC06] text-white p-6 rounded-md shadow-lg hidden md:block">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm font-medium">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section - 5 Icon Cards */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-benefits">
              KEY BENEFITS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-benefits">
              Why Professional Janitorial Services Matter
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              First impressions matter and a clean, well-maintained building will help your business project a professional image.
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-process">
              OUR PROCESS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-process">
              How We Deliver Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team works closely with you to guarantee your utmost satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {howWeWorkSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`step-${index}`}>
                <div className="text-6xl md:text-7xl font-bold text-[#063970]/10 absolute -top-4 -left-2">
                  {step.step}
                </div>
                <div className="pt-8 pl-4">
                  <h3 className="text-xl font-bold mb-3 text-[#063970]">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
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
              WHAT WE DO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tasks">
              Comprehensive Cleaning Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our dedicated janitors are well-versed in many cleaning tasks to keep your facility spotless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cleaningTasks.map((task, index) => (
              <Card key={index} className="h-full hover-elevate transition-all group" data-testid={`card-task-${index}`}>
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
                src={heroImage}
                alt="Tailored Janitorial Solutions"
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
                What sets Excel Facility Services Group apart from others in the industry is our commitment to utilizing <strong>cutting-edge technology</strong> to enhance our services. With our advanced technology, we have streamlined inspection processes, allowing us to maintain control and ensure smooth operations.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
                We understand the importance of prompt responses and timely answers to your needs and questions. Our dedicated team works tirelessly behind the scenes to ensure that your janitorial services are <strong>consistent and delivered on time</strong>.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
                We offer flexible scheduling options to accommodate your operational hours, ensuring that our cleaning services align with your business needs. Our trained staff uses state-of-the-art equipment and <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-eco">eco-friendly products</Link> to deliver effective cleaning solutions without disrupting your daily operations.
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
      <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-industries">
              INDUSTRIES WE SERVE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">
              Find Your Industry
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              EFSG is the perfect partner for your business. We provide tailored solutions that meet your specific needs.
            </p>
          </div>
        </div>

        {/* Row 1 - Scrolling Left */}
        <div className="relative mb-4">
          <div className="flex animate-scroll-left">
            {[...industriesRow1, ...industriesRow1, ...industriesRow1, ...industriesRow1].map((industry, index) => (
              <Link key={index} href={industry.href} data-testid={`link-industry-row1-${index}`} className="flex-shrink-0 px-2">
                <Card className="w-64 hover-elevate transition-all cursor-pointer group border-2 hover:border-[#0A5EB9]">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-3 text-[#063970] group-hover:text-[#0A5EB9] transition-colors" />
                    <h3 className="font-semibold text-sm md:text-base group-hover:text-[#0A5EB9] transition-colors whitespace-nowrap">{industry.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Left (offset timing) */}
        <div className="relative">
          <div className="flex animate-scroll-left-slow">
            {[...industriesRow2, ...industriesRow2, ...industriesRow2, ...industriesRow2].map((industry, index) => (
              <Link key={index} href={industry.href} data-testid={`link-industry-row2-${index}`} className="flex-shrink-0 px-2">
                <Card className="w-64 hover-elevate transition-all cursor-pointer group border-2 hover:border-[#0A5EB9]">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-3 text-[#063970] group-hover:text-[#0A5EB9] transition-colors" />
                    <h3 className="font-semibold text-sm md:text-base group-hover:text-[#0A5EB9] transition-colors whitespace-nowrap">{industry.title}</h3>
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

      {/* Final CTA Section */}
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
              Excel Facility Services Group is a commercial janitorial services company that can take care of all your cleaning needs so that you can focus on your business.
            </p>
            <p className="text-lg text-white/80 mb-10">
              Partner with EFSG to create a pristine and professional environment that reflects your brand's image.
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
