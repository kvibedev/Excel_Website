import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  ThumbsUp, 
  Building2,
  Stethoscope,
  SprayCan,
  Calendar,
  Leaf,
  HeartPulse,
  ClipboardCheck
} from "lucide-react";
import heroImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";

export default function MedicalGroups() {
  const services = [
    {
      icon: Shield,
      title: "Infection Control",
      description: "Our specialized team is trained to follow infection control protocols, ensuring all areas of the facility are adequately cleaned and disinfected.",
    },
    {
      icon: SprayCan,
      title: "Advanced Disinfection",
      description: "We utilize advanced disinfection techniques to mitigate the risk of infection, giving you peace of mind for patients and staff.",
    },
    {
      icon: Calendar,
      title: "Customized Schedules",
      description: "We understand each medical facility has unique needs, which is why we offer customized cleaning schedules tailored to your busiest times.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Solutions",
      description: "We prioritize eco-friendly cleaning solutions to promote a healthier environment for your patients and staff.",
    },
  ];

  const benefits = [
    "Improve patient safety",
    "Comply with regulations",
    "Increase satisfaction",
    "Feel confident that you're providing the safest environment possible for your employees, patients, and visitors",
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
        title="Medical Facility Cleaning"
        description="Specialized cleaning for medical groups from Excel Facility Services Group. Certified disinfection for healthcare environments."
        path="/industries/medical-groups"
      />
      {/* Hero Section */}
      <Hero
        title="Medical Groups"
        subtitle="It is crucial for medical groups to have a clean and healthy environment for their patients, staff, and visitors."
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
                alt="Professional Medical Facility Cleaning"
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
                Creating Safe & Healthy Healthcare Environments
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-1">
                <strong>A clean environment helps prevent the spread of illness and infection</strong> and makes a good impression on anyone who enters the facility — visitors, patients, and staff alike.
              </p>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-2">
                At <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about">Excel Facility Services Group</Link>, we understand how important creating a positive and welcoming environment for your patients is. That's why we offer a full range of <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial">janitorial services</Link> designed to keep your hospital or medical office looking its best.
              </p>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-3">
                From general cleaning and trash removal to deep cleaning and carpet shampooing, our team will work tirelessly to exceed your expectations.
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
              Specialized Healthcare Cleaning Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From waiting rooms to examination areas, our team ensures every corner is sanitized and spotless
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
                Why Healthcare Facilities Trust EFSG
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                <strong>Our specialized team is trained to follow infection control protocols.</strong> This helps to ensure that all areas of the facility are adequately cleaned and disinfected. As a result, medical groups can feel confident that their environment is safe and clean.
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
                alt="Medical Facility Cleaning Benefits"
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
              HEALTHCARE EXPERTISE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="heading-tailored">
              Navigating Change in Healthcare
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-1">
              The healthcare industry has seen many changes in recent years, and Excel Facility Services Group has been at the forefront of innovation, providing a full range of services to meet the needs of our clients. From hospitals and clinics to long-term care facilities and outpatient services, we have the expertise and experience to ensure that your facilities are well-maintained and safe for patients, staff, and visitors.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-2">
              We help medical groups to navigate change, and provide them with assurance by demonstrating trustworthy cleaning through a <strong>three-step approach</strong> that delivers healthy spaces with certified disinfection. In the wake of COVID-19, we have redoubled our efforts to ensure that our client's facilities are clean and safe for everyone who enters them.
            </p>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-tailored-3">
              Our trained professionals utilize <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfection">advanced disinfection techniques</Link> to mitigate the risk of infection, giving you peace of mind. Our comprehensive approach not only increases patient satisfaction but also helps you stay compliant with health regulations.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-tailored-4">
              Partnering with Excel Facility Services signals your commitment to exceptional care and safety. Choose us for a reliable cleaning solution that prioritizes the health of everyone who walks through your doors. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Contact us today</Link>!
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
              Ready for Professional Medical Facility Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with specialized cleaning services for healthcare facilities that prioritize patient safety and regulatory compliance.
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
