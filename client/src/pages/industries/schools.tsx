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
  GraduationCap,
  SprayCan,
  Sparkles,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import heroImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import sectionImage from "@assets/facade-of-red-brick-building-with-outdoor-iron-sta-2026-03-24-_1774866278191.jpg";

export default function Schools() {
  const services = [
    {
      icon: Sparkles,
      title: "Janitorial Services",
      description: "Comprehensive cleaning for classrooms, cafeterias, and common areas to maintain hygiene standards.",
    },
    {
      icon: SprayCan,
      title: "Disinfection Services",
      description: "We effectively disinfect and sanitize all areas using the latest cleaning technologies and methods.",
    },
    {
      icon: ShieldCheck,
      title: "COVID-19 Cleaning",
      description: "Specialized protocols to combat germs and ensure a safe environment for students and staff.",
    },
    {
      icon: BookOpen,
      title: "Deep Cleaning Protocols",
      description: "Targeted deep cleaning protocols to effectively combat germs and maintain the highest hygiene standards.",
    },
  ];

  const benefits = [
    "Foster a productive learning environment",
    "Reduce illness-related absences",
    "Meet or exceed educational facility standards",
    "Ensure students and staff experience a safe and healthy space",
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
        title="School Cleaning"
        description="Professional cleaning services for schools from Excel Facility Services Group. Safe, healthy learning environments."
        path="/industries/schools"
      />
      {/* Hero Section */}
      <Hero
        title="Schools"
        subtitle="Excel Facility Services Group provides service while raising health & safety standards across school facilities."
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
                alt="Professional School Facility Cleaning"
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
                Serving the Nation's Educational Communities
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                <strong>Excel Facility Services Group (EFSG)</strong> serves the nation's educational communities, providing <Link href="/services" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-services">cleaning and maintenance services</Link> for public school systems, private schools, universities, and colleges.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                Our commitment has always been to high standards that meet or exceed your expectations in every way possible. Our quality control programs are designed specifically around raising health & safety standards on our end, so you never have worries about unsafe practices going unnoticed.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                All of our employees who work within these educational facilities undergo strict training. <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-team">Our experienced team</Link> ensures that schools are clean, healthy, and safe.
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
              Educational Facility Cleaning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer various services to help your school succeed, held to a higher standard than commercial businesses
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
                Why Clean Schools Foster Better Learning
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <strong>We understand that academic institutions are held to a higher standard than commercial businesses</strong>, and we take great pride in always adhering to these standards, with no exceptions. If you're looking for a school cleaning partner who will always go the extra mile, look no further.
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
                alt="School Facility Cleaning Benefits"
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
              A Clean School is Essential for Productive Learning
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              At Excel Facility Services Group, we believe that a clean school is essential for fostering a productive learning environment. Our comprehensive cleaning and maintenance solutions are tailored to meet the unique needs of educational institutions, ensuring both students and staff experience a safe and healthy space.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              We are committed to using the latest cleaning technologies and methods to effectively <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfect">disinfect and sanitize</Link> classrooms, cafeterias, and common areas. Our team offers regular <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial">janitorial services</Link>, as well as targeted deep cleaning protocols to effectively combat germs and maintain hygiene standards.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              By choosing us as your cleaning partner, you are investing in the well-being of your students and staff. Our focus on health and safety helps to reduce illness-related absences and promotes an atmosphere conducive to learning.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              Trust Excel Facility Services Group for reliable, high-quality cleaning services that consistently meet the rigorous standards of educational institutions. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link> — let's work together to create an impeccable and safe learning environment!
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
              Ready for Professional School Facility Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with specialized cleaning services for educational institutions.
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
