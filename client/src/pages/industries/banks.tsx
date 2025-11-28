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
  Landmark,
  SprayCan,
  Sparkles,
  Leaf,
  ShieldCheck
} from "lucide-react";
import heroImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";

export default function Banks() {
  const services = [
    {
      icon: Sparkles,
      title: "Surface Cleaning",
      description: "Thorough cleaning of all surfaces including lobbies, teller stations, and restrooms to reflect professionalism and care.",
    },
    {
      icon: SprayCan,
      title: "Certified Disinfection",
      description: "Certified disinfection with green-grade products proven to eliminate viruses and bacteria effectively.",
    },
    {
      icon: ShieldCheck,
      title: "Three-Step Approach",
      description: "Our three-step approach to cleaning and disinfecting bank facilities ensures comprehensive sanitization.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "Industry-leading cleaning practices using eco-friendly products to effectively sanitize while minimizing environmental impact.",
    },
  ];

  const benefits = [
    "Keep your customers feeling confident about their money",
    "Help your bank stay competitive",
    "Allow your customers to have a positive experience when visiting your bank",
    "Make them feel like their money is in good hands",
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
      {/* Hero Section */}
      <Hero
        title="Banks"
        subtitle="Your customers need to feel confident that their money is in good hands, and a clean, well-maintained facility helps transmit that trust."
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
                src={heroImage}
                alt="Professional Bank Facility Cleaning"
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
                Building Customer Trust Through Cleanliness
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                At Excel Facility Services, we understand that the <Link href="/services/covid-19-cleaning" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-covid">COVID-19 pandemic</Link> brought unprecedented challenges to the banking industry. Bank facilities must now navigate a complex landscape of still-evolving health and safety guidelines while continuing to provide a safe and welcoming environment.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                We've all had the uncomfortable experience of walking into a bank that smells unpleasant, looks like the carpets haven't been cleaned in years, and seems poorly lit. No bank can afford to exhibit any of those unwelcoming characteristics, especially with industry competition at an all-time high.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-team">Our team of experts</Link> is here to help. We offer a three-step approach to cleaning and disinfecting bank facilities that is proven to eliminate viruses and bacteria effectively. Our process begins with thoroughly cleaning all surfaces, followed by certified disinfection with <Link href="/services" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-green-seal">green-grade products</Link>.
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
              Specialized Bank Facility Cleaning
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional cleaning solutions designed for financial institutions that prioritize customer trust
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
                Why Clean Banks Build Customer Confidence
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <strong>We provide ongoing support to ensure that your facility remains clean and healthy.</strong> With our help, you can be confident that your bank is taking all the necessary steps to protect your employees and customers.
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
                alt="Bank Facility Cleaning Benefits"
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
              Pristine Environments Build Lasting Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              At Excel Facility Services, we recognize that maintaining a pristine environment in your bank is crucial for building and retaining customer trust. A clean and inviting atmosphere not only reassures clients about the safety of their funds but also enhances their overall banking experience.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              Our <Link href="/services/levelup-clean" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-levelup">specialized cleaning solutions</Link> are designed to address the unique challenges faced by financial institutions. We focus on high-traffic areas such as lobbies, teller stations, and restrooms, ensuring every corner of your facility reflects professionalism and care.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              Our team employs industry-leading cleaning practices, using eco-friendly products to effectively sanitize surfaces while minimizing environmental impact. With our ongoing support and regular maintenance schedules, your bank will consistently present a safe and welcoming environment for both customers and staff.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              Let us partner with you to enhance your bank's image and create a space where customers feel valued and secure. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link> to learn more about how we can help you maintain a spotless facility!
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
              Ready for Professional Bank Facility Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with reliable cleaning services tailored for financial institutions.
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
