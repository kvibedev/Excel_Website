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
        title="Retail Stores"
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
                Keep Your Store Looking Its Best
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                Maintaining a tidy, well-organized retail store is essential for attracting customers and maintaining a good reputation. However, keeping a store in top condition can be challenging, especially for busy businesses. <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about">Excel Facility Services Group</Link> can help to keep your store clean and organized, freeing up your staff to focus on more important tasks.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                Our services range from <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial">janitorial services</Link> to <Link href="/services/covid-19-cleaning" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-covid">COVID-19 cleaning</Link>. We can handle everything from big to small retail, from a single store to an entire shopping mall.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                Our continued growth in this market is a testimony to our ability to provide superior service to companies with multi-site portfolios and special floor care needs. We have the <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-certifications">best janitorial services</Link> regardless of size or demand.
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
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
              TAILORED APPROACH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="heading-tailored">
              Be the Best Retail Company in Your Area
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              At Excel Facility Services, we recognize that cleanliness and organization are vital to your retail store's success. A well-kept environment not only draws customers in but also fosters loyalty and encourages repeat visits. Our dedicated team offers comprehensive cleaning solutions tailored to your specific needs, ensuring that every aspect of your store is immaculate.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              From regular <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial-2">janitorial services</Link> to specialized cleaning tasks, we cover all areas of your retail space. Our professionals are trained to manage everything from product displays to fitting rooms, ensuring that your store remains welcoming and hygienic.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              We utilize advanced cleaning technologies and <Link href="/services" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-eco">eco-friendly products</Link> to create a safe environment for both customers and employees. By partnering with Excel Facility Services, you're investing in the overall shopping experience of your customers.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              A clean, organized store reflects your brand's commitment to quality and care. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link> and let us help you maintain that perfect balance of cleanliness and organization, making your store the go-to destination in your area!
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
