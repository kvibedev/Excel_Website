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
  UtensilsCrossed,
  SprayCan,
  ShieldCheck,
  Headphones,
  ClipboardCheck
} from "lucide-react";
import heroImage from "@assets/restaurant_bg_1774868915681.webp";
import sectionImage from "@assets/restaurant_1_1774868947379.webp";

export default function Restaurants() {
  const services = [
    {
      icon: UtensilsCrossed,
      title: "Kitchen to Dining Area",
      description: "A cleaner and safer restaurant from the kitchen to the dining area. We ensure every space meets the highest hygiene standards.",
    },
    {
      icon: SprayCan,
      title: "Deep Disinfection",
      description: "We provide deep-cleaning services that target areas where viruses are most likely to accumulate, keeping your establishment safe.",
    },
    {
      icon: Users,
      title: "Dedicated Staff",
      description: "Our dedicated and experienced staff understands the unique cleaning challenges that restaurants face and delivers exceptional results.",
    },
    {
      icon: Headphones,
      title: "24-Hour Support",
      description: "24-hour operations support and measured inspections ensure your restaurant stays clean around the clock.",
    },
  ];

  const benefits = [
    "Your restaurant will be clean and sanitary",
    "You'll be in compliance with all health and safety regulations",
    "Customers will feel safe and comfortable dining in your establishment",
    "They'll appreciate the effort you put into keeping your business clean",
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
        title="Restaurant Cleaning"
        description="Professional cleaning services for restaurants from Excel Facility Services Group. Maintain health standards and customer satisfaction."
        path="/industries/restaurants"
      />
      {/* Hero Section */}
      <Hero
        title="Restaurants"
        subtitle="Any restaurant owner knows that a clean and well-maintained dining area is essential for attracting and keeping customers."
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
                alt="Professional Restaurant Cleaning"
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
                Safe & Sanitary Restaurant Environments
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                The outbreak of <Link href="/services/covid-19-cleaning" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-covid">COVID-19</Link> has led to a sharp increase in the importance of commercial cleaning, particularly in the restaurant industry. In addition to the usual concerns about cleanliness and hygiene, restaurants now face the added challenge of preventing the spread of illness.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                With the dynamic nature of the restaurant business, it can be challenging to find the time and resources to regularly give your establishment the deep clean it needs. That's where our <Link href="/services" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-services">commercial cleaning services</Link> can be a valuable asset.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                Commercial cleaning services can help ensure that your restaurant is safe for employees and customers. In addition to regular cleaning, we provide deep-cleaning services that target areas where viruses are most likely to accumulate.
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
              Comprehensive Restaurant Cleaning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our restaurant cleaning services provide everything you need to maintain a pristine, health-code compliant establishment
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
                Why Clean Restaurants Keep Customers Coming Back
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                <strong>66% of people are not willing to revisit a restaurant with bad food hygiene.</strong> This makes cleanliness even more important to consumers than customer service.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Almost all consumers agree that cleanliness is one of the most important things when they visit a restaurant — and our services can help keep your restaurant on their radar!
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
                alt="Restaurant Cleaning Benefits"
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
              Elevate Your Restaurant's Reputation
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              At Excel Facility Services, we understand the unique cleaning challenges that restaurants face. A spotless establishment not only enhances the dining experience but also encourages customer retention. Our dedicated team provides a comprehensive range of cleaning services tailored explicitly for the restaurant industry.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              We emphasize the importance of <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfection">sanitation and hygiene</Link>, especially in high-touch areas such as menus, tables, and restrooms. Our skilled professionals are trained to implement deep-cleaning protocols that adhere to health regulations and safety standards.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              We work diligently to ensure that your restaurant remains an inviting space for customers, contributing to their overall satisfaction. In today's competitive market, maintaining a clean and safe environment is crucial for your restaurant's success.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              With our reliable cleaning services, you can focus on delivering exceptional food and service while we take care of the cleanliness. Trust Excel Facility Services to help elevate your restaurant's reputation and keep patrons returning for more — <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">contact us today</Link>!
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
              Ready for Professional Restaurant Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with reliable cleaning services that keep patrons returning for more.
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
