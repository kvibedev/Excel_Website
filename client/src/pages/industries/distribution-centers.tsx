import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Warehouse,
  SprayCan,
  Sparkles,
  Wind,
  Leaf
} from "lucide-react";
import heroImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import sectionImage from "@assets/Distripution_1_1774869560668.webp";

export default function DistributionCenters() {
  const services = [
    {
      icon: Sparkles,
      title: "Janitorial Services",
      description: "Comprehensive cleaning to maintain efficient operations and reduce wear and tear on surfaces and equipment.",
    },
    {
      icon: SprayCan,
      title: "Disinfection Services",
      description: "We disinfect high-touch areas like loading docks and storerooms where shipping pallets transfer to storage spaces.",
    },
    {
      icon: Wind,
      title: "Air Quality Management",
      description: "We ensure clean air quality by keeping germ-free surfaces throughout your facility.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "Our advanced techniques and eco-friendly products ensure an environment that is clean and conducive to productivity.",
    },
  ];

  const benefits = [
    "Create a safe and healthy environment for employees",
    "Reduce the risk of illness in the workplace",
    "Maintain efficient operations with clean facilities",
    "Welcome space for employees and visitors alike",
  ];

  const valuePropositions = [
    {
      icon: Award,
      title: "Customer satisfaction guarantee",
    },
    {
      icon: Clock,
      title: "Prompt response time",
    },
    {
      icon: ThumbsUp,
      title: "Transparency and professionalism",
    },
    {
      icon: Users,
      title: "Management and employee training",
    },
    {
      icon: Building2,
      title: "Innovative technology and understanding of building needs",
    },
  ];

  return (
    <div>
      <SEO
        title="Distribution Center Cleaning"
        description="Professional cleaning for distribution centers from Excel Facility Services Group. Ensure safe, efficient operations."
        path="/industries/distribution-centers"
      />
      {/* Hero Section */}
      <Hero
        title="Distribution Centers"
        subtitle="With our three-step approach that delivers healthy distribution centers, you can be assured that your facility will always operate safely and efficiently."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "VIEW SERVICES", href: "/services" }}
      />

      {/* About Section - Split Layout */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="relative">
              <img
                src={sectionImage}
                alt="Professional Distribution Center Cleaning"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#97CC06] text-white p-6 rounded-md shadow-lg hidden md:block">
                <div className="text-4xl font-bold">20+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-about">
                ABOUT OUR SERVICE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">
                Keeping Your Supply Chain Running Smoothly
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                <strong>A distribution center is a critical link in the supply chain</strong>, and keeping it clean is essential to maintaining efficient operations. Dust, dirt, and other particulates can build up on surfaces and equipment, leading to increased wear and tear.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                When we work with a distribution center, <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-team">our team</Link> takes cleanliness and safety seriously, especially since the <Link href="/services/covid-19-cleaning" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-covid">COVID-19 pandemic</Link>. We understand that the constant flow of foot traffic in and out of the facility can quickly become a hotbed for viruses.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                That's why <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about">Excel Facility Services Group</Link> ensures clean air quality by keeping germ-free surfaces, including high-touch areas like loading docks or storerooms. We also <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfection">disinfect</Link> these areas with proper chemicals so no grime remains.
              </p>
              <Link href="/about" data-testid="link-learn-more">
                <Button data-testid="button-learn-more">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Fore Tech Style */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-services">
              OUR SERVICES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-services">
              Distribution Center Cleaning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive cleaning services designed for high-traffic industrial environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover-elevate transition-all border-t-4 border-t-[#97CC06]" data-testid={`card-service-${index}`}>
                <CardHeader>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#063970]/10 mb-4">
                    <service.icon className="h-8 w-8 text-[#063970]" />
                  </div>
                  <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <Badge variant="outline" className="mb-4" data-testid="badge-benefits">
                KEY BENEFITS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-benefits">
                Why Clean Distribution Centers Operate Better
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <strong>Excel Facility Services Group's distribution center cleaning service creates a safe and healthy environment</strong> for your employees, customers, and partners by taking these extra steps. We implement a comprehensive cleaning regimen that includes regular sanitization and thorough inspections.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle2 className="w-6 h-6 text-[#97CC06] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
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
                alt="Distribution Center Cleaning Benefits"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-benefits"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tailored Services Content */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
              TAILORED APPROACH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="heading-tailored">
              Cleanliness Vital for Seamless Operations
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              At Excel Facility Services Group, we recognize that cleanliness is vital for the seamless operation of your distribution center. A clean facility not only promotes employee health but also ensures optimal performance in every function. Our specialized team is trained to address the unique challenges of maintaining cleanliness in high-traffic environments.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              We implement a <Link href="/services/levelup-clean" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-levelup">comprehensive cleaning regimen</Link> that includes regular sanitization of high-touch surfaces and thorough inspections to guarantee compliance with industry standards. Our advanced techniques and eco-friendly products ensure an environment that is not only clean but also conducive to productivity.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              By partnering with us, you can reduce the risk of illness in the workplace and create a welcoming space for employees and visitors alike. Our commitment to excellence allows us to adapt our services to meet your specific needs.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              Ensure that your distribution center remains a safe, efficient hub for operations. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link> to discover how we can enhance your facility's cleanliness and efficiency!
            </p>
          </div>
        </div>
      </section>

      {/* Value Propositions - 5 Cards with green borders */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-why-choose">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-choose">
              EFSG is Committed to Exceeding Your Expectations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {valuePropositions.map((item, index) => (
              <Card key={index} className="h-full hover-elevate transition-all border-2 border-[#97CC06] bg-background text-center" data-testid={`card-value-prop-${index}`}>
                <CardHeader className="pb-2">
                  <div className="flex h-16 w-16 items-center justify-center mx-auto mb-4">
                    <item.icon className="h-12 w-12 text-[#97CC06]" />
                  </div>
                  <CardTitle className="text-base font-semibold text-[#063970]">{item.title}</CardTitle>
                </CardHeader>
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
              Ready for Professional Distribution Center Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              By partnering with us, you can reduce the risk of illness in the workplace and create a welcoming space for employees and visitors alike.
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
