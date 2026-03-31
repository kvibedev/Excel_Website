import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Leaf, 
  Users, 
  Award, 
  Clock, 
  ThumbsUp, 
  Building2, 
  Car, 
  Sparkles,
  Globe,
  TrendingUp,
  Star,
  Eye,
  Wrench,
  SprayCan,
  ClipboardCheck
} from "lucide-react";
import heroImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";
import sectionImage from "@assets/car_dealership_1_1774872798522.webp";
import benefitsImage from "@assets/car_dealership_2_1774872828959.webp";

export default function AutoDealerships() {
  const services = [
    {
      icon: Car,
      title: "Showroom Detailing",
      description: "Everything should look shiny and new, from the cars to the service department. We ensure your showroom always impresses customers.",
    },
    {
      icon: SprayCan,
      title: "Disinfection Services",
      description: "We thoroughly disinfect high-touch areas, remove dust, and eliminate germs to maintain a healthy environment for staff and customers.",
    },
    {
      icon: Eye,
      title: "Front Entrance Care",
      description: "High-profile areas like front entrances, glass doors, displays, and showroom floors are kept spotless and inviting.",
    },
    {
      icon: Wrench,
      title: "Service Area Cleaning",
      description: "From detailing the showroom to sanitizing service areas, we prioritize delivering exceptional results throughout your facility.",
    },
  ];

  const benefits = [
    "Your dealership will look more organized and professional",
    "Customers will feel like they're valued and important",
    "We keep your environment clean and presentable",
    "We create a safe and healthy workplace for your team",
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
        title="Auto Dealership Cleaning"
        description="Professional cleaning services for auto dealerships from Excel Facility Services Group. Showroom-quality cleanliness."
        path="/industries/auto-dealerships"
      />
      {/* Hero Section */}
      <Hero
        title="Auto Dealership Cleaning and Facility Services"
        subtitle="Excel Facility Services Group helps auto dealerships maintain cleaner, safer, and more customer-ready environments through accountable service delivery, responsive support, and programs built for showroom presentation, service areas, and daily operations."
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
                alt="Professional Auto Dealership Cleaning"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">Facility Services Built for Auto Dealerships</h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">Auto dealerships depend on presentation, cleanliness, and consistency to support customer confidence and protect brand perception. From showroom floors and front entrances to waiting areas and service departments, every part of the environment affects how the dealership is experienced.</p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">Excel Facility Services Group provides commercial cleaning and facility services for auto dealerships that need structured janitorial support, disinfection, floor care, and day-to-day upkeep aligned with customer traffic, vehicle displays, employee workflows, and service operations.</p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                With more than 20 years of operational experience and multi-site capability, Excel supports auto dealerships with facility services designed to protect presentation, reinforce consistency, and maintain cleaner, safer environments across the property.
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
              Next-Level Dealership Cleaning Built Around Your Needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We provide tailored cleaning solutions designed to match the unique needs of your auto dealership
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
                Why Clean Dealerships Win More Customers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <strong>EFSG service can work out a cleaning schedule that best fits your needs.</strong> Our priority is keeping your dealership safe and maintaining a positive image for your customers and employees.
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
                alt="Clean Auto Dealership Benefits"
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
              Maintaining the Appeal of Your Dealership
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              To maintain the appeal of your auto dealership, our tailored cleaning services are designed to meet your specific needs. We understand that a clean environment is essential not only for customer satisfaction but also for employee morale. Our experienced team uses advanced cleaning techniques and eco-friendly products to ensure every corner of your dealership sparkles.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              From detailing the showroom to sanitizing service areas, we prioritize delivering exceptional results that enhance your dealership's reputation. By establishing a regular cleaning schedule, you can focus on running your business while we handle the cleanliness of your facility.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              Your dealership's outlook affects how customers perceive your brand, and our services are aimed at elevating that perception. With our support, you can create an inviting atmosphere that encourages foot traffic and <Link href="/services/levelup-clean" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-repeat-visits">repeat visits</Link>.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              Our commitment to excellence ensures you can showcase your inventory in the best light, making each visit memorable for potential buyers. Trust us to help you project professionalism and maintain a healthy space, essential for a thriving dealership. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-reach-out">Reach out to us today</Link> to get started!
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
              Ready for Professional Auto Dealership Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with cleaning services that help project professionalism and maintain a healthy space.
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
