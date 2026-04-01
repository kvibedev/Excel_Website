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
  Store,
  SprayCan,
  Sparkles,
  ShieldCheck,
  Leaf
} from "lucide-react";
import heroImage from "@assets/Retail_bg_1774866729482.webp";
import sectionImage from "@assets/retail_1_1774866657583.webp";
import aboutImage from "@assets/retailer_3_1774977280364.webp";

export default function Retailer() {
  const services = [
    {
      icon: Sparkles,
      title: "Floor Care & Maintenance",
      description: "Shining floors that impress customers from the moment they walk in. We keep your retail space looking pristine and professional.",
    },
    {
      icon: SprayCan,
      title: "Restroom & Fitting Room Care",
      description: "Spotless restrooms and well-kept fitting rooms that meet customer expectations and maintain your store's reputation.",
    },
    {
      icon: ShieldCheck,
      title: "COVID-19 Cleaning",
      description: "Comprehensive disinfection services to keep your customers and staff safe in today's health-conscious retail environment.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Solutions",
      description: "We utilize advanced cleaning technologies and eco-friendly products to create a safe environment for customers and employees.",
    },
  ];

  const benefits = [
    "Improve your store's appearance and organization",
    "Improve customer satisfaction",
    "Increase foot traffic",
    "Foster loyalty and encourage repeat visits",
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
        title="Retail Cleaning"
        description="Commercial cleaning services for retail stores from Excel Facility Services Group. Maintain a clean, inviting shopping environment."
        path="/industries/retailer"
      />
      {/* Hero Section */}
      <Hero
        title="Built Around the Realities of Retail Operations"
        subtitle="A well-managed facility can help to create a positive customer experience, which is essential for success in the retail industry."
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
                src={aboutImage}
                alt="Professional Retail Store Cleaning"
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
                Facility Services Built for Retail Stores
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                Retail stores depend on cleanliness, presentation, and consistency to support customer confidence and protect brand perception. In customer-facing environments, facility service needs to help maintain a clean, welcoming experience across entrances, sales floors, fitting rooms, restrooms, and common areas.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about">Excel Facility Services Group</Link> provides commercial cleaning and facility services for retail stores that need <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial">janitorial support</Link>, day porter services, disinfection, floor care, and service programs aligned with customer traffic, operating hours, and day-to-day store demands.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                With more than 20 years of operational experience and multi-site capability, Excel helps retail stores maintain cleaner, safer, and more professional environments through dependable service delivery, responsive communication, and standards built for consistency across customer-facing and operational spaces.
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
              Comprehensive Retail Cleaning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Keep shoppers coming back for more with shining floors, spotless restrooms, well-kept fitting rooms, and more
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
                Why Clean Stores Win More Customers
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                <strong>64% of shoppers have walked out of a store due to poor physical appearance and disorganization.</strong> In today's competitive retail landscape, it's more important than ever to create a positive shopping experience.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our attention to detail and relentless work ethic makes us a huge asset to you and your store. Though shoppers don't see what goes on behind the scenes, they expect shining floors, spotless restrooms, well-kept fitting rooms, comfortable temperatures, safe parking, and more.
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
                src={sectionImage}
                alt="Retail Store Cleaning Benefits"
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
              Built Around the Realities of Retail Operations
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-tailored-1">
              Retail stores depend on cleanliness, presentation, and consistency to support customer confidence and protect brand perception. <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial-2">Excel Facility Services Group</Link> provides cleaning and facility services designed to help maintain cleaner entrances, sales floors, fitting rooms, restrooms, and other high-traffic spaces throughout the store.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="h-full" data-testid="card-tailored-1">
              <CardHeader>
                <CardTitle className="text-xl mb-2">Customer-Ready Presentation</CardTitle>
                <CardDescription className="text-base">
                  Help keep sales floors, entrances, and display areas clean, polished, and ready to support a stronger first impression.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full" data-testid="card-tailored-2">
              <CardHeader>
                <CardTitle className="text-xl mb-2">Cleaner Customer Spaces</CardTitle>
                <CardDescription className="text-base">
                  Maintain fitting rooms, restrooms, checkout zones, and shared spaces that shape how shoppers experience the store.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full" data-testid="card-tailored-3">
              <CardHeader>
                <CardTitle className="text-xl mb-2">Support for Daily Operations</CardTitle>
                <CardDescription className="text-base">
                  Service programs built around store traffic, operating hours, and day-to-day retail activity to help maintain consistency without disruption.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto" data-testid="text-tailored-closing">
            Our approach helps retail stores maintain cleaner, safer, and more organized environments that support both customer experience and daily operations. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link>.
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
              Let Excel Facility Services Group Exceed Your Expectations
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
              Ready for Professional Retail Store Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              We keep stores looking their best so customers can enjoy a painless experience and buy from your store without hesitation or regret.
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
