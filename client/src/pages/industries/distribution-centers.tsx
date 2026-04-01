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
import benefitsImage from "@assets/Distribution_2_1774869599500.webp";

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
        title="Distribution Center Cleaning and Facility Services"
        subtitle="Excel Facility Services Group helps distribution centers maintain cleaner, safer, and more efficient environments through accountable service delivery, responsive support, and programs built for high-traffic operations."
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
                Facility Services Built for Distribution Centers
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                Distribution centers rely on cleanliness, consistency, and operational readiness to support productivity, safety, and workflow across the facility. In high-traffic industrial environments, cleaning programs need to help maintain aisles, loading areas, shared spaces, equipment zones, and employee areas without disrupting daily operations.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about">Excel Facility Services Group</Link> provides commercial cleaning and facility services for distribution centers that need dependable <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-team">janitorial support</Link>, <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfection">disinfection services</Link>, <Link href="/services/floor-care" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-floor-care">floor care</Link>, and structured cleaning programs aligned with warehouse traffic, shift schedules, and day-to-day operational demands.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                With more than 20 years of operational experience and multi-site capability, Excel helps distribution centers maintain cleaner, safer, and more efficient environments through dependable service delivery, responsive communication, and standards built for consistency across operational and employee-facing spaces.
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
                src={benefitsImage}
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
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
              TAILORED APPROACH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-tailored">
              Built Around the Realities of Distribution Center Operations
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-tailored-1">
              Distribution centers depend on cleanliness, consistency, and operational readiness to support safety, productivity, and workflow. Excel Facility Services Group provides cleaning and facility services designed to help maintain cleaner aisles, loading areas, employee spaces, and other high-traffic parts of the facility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="h-full" data-testid="card-tailored-1">
              <CardHeader>
                <CardTitle className="text-xl mb-2">
                  <Link href="/services/levelup-clean" className="text-[#0A5EB9] hover:underline" data-testid="link-levelup">Operationally Aware Service</Link>
                </CardTitle>
                <CardDescription className="text-base">
                  Service programs built around active warehouse environments where timing, traffic, and workflow matter.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full" data-testid="card-tailored-2">
              <CardHeader>
                <CardTitle className="text-xl mb-2">Cleaner High-Traffic Areas</CardTitle>
                <CardDescription className="text-base">
                  Maintain loading zones, shared spaces, restrooms, breakrooms, and other frequently used parts of the facility.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full" data-testid="card-tailored-3">
              <CardHeader>
                <CardTitle className="text-xl mb-2">Support for Daily Efficiency</CardTitle>
                <CardDescription className="text-base">
                  Cleaning plans aligned with shift schedules, employee movement, and operational priorities to help maintain consistency without disruption.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto" data-testid="text-tailored-closing">
            Our approach helps distribution centers maintain cleaner, safer, and more organized environments that support both daily operations and workforce confidence. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link>.
          </p>
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
