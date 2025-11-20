import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";
import {
  Sparkles,
  Users,
  Shield,
  Droplets,
  Award,
  Building2,
  Globe,
  CheckCircle2,
  TrendingUp,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import aboutImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";

export default function HomeTemplate3() {
  const trustLogos = [
    { name: "Inc. 5000", icon: Award },
    { name: "MBE Certified", icon: Award },
    { name: "Green Seal GS-42", icon: Award },
  ];

  const statsHighlight = [
    { value: "28", label: "States Nationwide", icon: Globe },
    { value: "400M", label: "Sq Ft Serviced Daily", icon: Building2 },
    { value: "20+", label: "Years of Excellence", icon: TrendingUp },
    { value: "100%", label: "Satisfaction Guaranteed", icon: Star },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Janitorial Services",
      description: "Comprehensive janitorial services maintaining professional, clean workplaces for businesses of all sizes across diverse industries.",
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description: "On-site professionals ensuring your facility remains clean, organized, and welcoming throughout regular business hours.",
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description: "Certified disinfection delivering sanitized spaces you can trust through our proven three-step cleaning approach.",
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection Services",
      description: "Professional disinfection services applying antimicrobial agents to protect against harmful microorganisms.",
      href: "/services/disinfection",
    },
  ];

  const caseStudies = [
    {
      title: "Office Building Transformation",
      industry: "Corporate Office",
      description: "Transformed a 200,000 sq ft corporate headquarters with our comprehensive facility management program, reducing operational costs by 25% while improving cleanliness scores.",
      image: officeImage,
    },
    {
      title: "Retail Chain Partnership",
      industry: "Multi-Location Retail",
      description: "Deployed standardized cleaning protocols across 50+ retail locations in 12 states, ensuring brand consistency and customer satisfaction.",
      image: retailImage,
    },
    {
      title: "Healthcare Facility Excellence",
      industry: "Medical Campus",
      description: "Implemented specialized disinfection protocols for a 5-building medical campus, achieving 99.9% pathogen reduction rates.",
      image: medicalImage,
    },
  ];

  const teamRoles = [
    {
      icon: Users,
      title: "Regional Operations Teams",
      description: "Experienced professionals managing day-to-day service delivery with local market expertise.",
    },
    {
      icon: Award,
      title: "Quality Assurance Specialists",
      description: "Dedicated teams ensuring consistent service excellence through regular inspections and performance monitoring.",
    },
    {
      icon: Shield,
      title: "Compliance & Safety Officers",
      description: "Certified experts maintaining the highest standards for safety, environmental compliance, and industry regulations.",
    },
  ];

  const pricingTiers = [
    {
      name: "Small Business",
      description: "Perfect for growing companies",
      features: [
        "Up to 10,000 sq ft coverage",
        "Flexible scheduling options",
        "Core janitorial services",
        "Monthly quality inspections",
        "Dedicated account manager",
        "Green cleaning products",
      ],
    },
    {
      name: "Mid-Market",
      description: "Ideal for established businesses",
      features: [
        "10,000 - 50,000 sq ft coverage",
        "Extended service hours",
        "Comprehensive service portfolio",
        "Bi-weekly quality inspections",
        "Priority customer support",
        "Custom service agreements",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      description: "Comprehensive facility management",
      features: [
        "Multi-location coordination",
        "24/7 service availability",
        "Full-service offerings",
        "Real-time reporting dashboard",
        "Executive account team",
        "Custom SLA agreements",
      ],
    },
  ];

  const testimonials = [
    {
      quote: "Excel Facility Services Group has been instrumental in maintaining our multi-state operations. Their consistency and professionalism are unmatched in the industry.",
      author: "Director of Facilities",
      company: "Fortune 500 Healthcare Company",
      rating: 5,
    },
    {
      quote: "We've worked with several national providers, but EFSG delivers the personal attention and regional expertise that makes the difference. Their technology platform provides real-time visibility we never had before.",
      author: "VP of Operations",
      company: "National Retail Chain",
      rating: 5,
    },
    {
      quote: "The transition to EFSG was seamless, and the results have been outstanding. Our facilities have never looked better, and we've reduced our facility management costs significantly.",
      author: "CFO",
      company: "Mid-Market Technology Firm",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What geographic areas does Excel Facility Services Group serve?",
      answer: "We operate across 28 states nationwide, managing over 400 million square feet daily. Our regional structure ensures local accountability with enterprise-scale resources. Contact us to confirm service availability in your specific location.",
    },
    {
      question: "How do you ensure consistent quality across multiple locations?",
      answer: "We utilize a combination of standardized operating procedures, technology-enabled reporting, regular quality inspections, and dedicated account management teams. Our real-time dashboard provides transparency and accountability across all your facilities.",
    },
    {
      question: "What certifications and credentials does EFSG hold?",
      answer: "We are Inc. 5000 recognized for rapid growth, MBE Certified as a Minority Business Enterprise, and Green Seal GS-42 certified for environmental excellence. Our teams maintain industry-specific certifications relevant to your facility type.",
    },
    {
      question: "Can you handle both day and night cleaning services?",
      answer: "Yes, we offer flexible scheduling including after-hours janitorial services, daytime porter services, and 24/7 availability for enterprise clients. We work with you to create a service schedule that minimizes disruption to your operations.",
    },
    {
      question: "How quickly can you start service for a new facility?",
      answer: "For standard implementations, we can typically begin service within 2-3 weeks. For urgent needs or large-scale deployments, we can mobilize resources more quickly. Our experienced onboarding team ensures smooth transitions with minimal disruption.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Professional Cleaning Excellence for Enterprise Facilities"
        subtitle="Serving 28 states nationwide with 20+ years of experience managing 400 million square feet daily. From startups to Fortune 500 companies, we deliver scalable facility solutions with unmatched accountability."
        imageSrc={heroImage}
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
        secondaryCta={{ text: "CONTACT US", href: "/contact" }}
      />

      {/* Client Trust Section */}
      <section className="py-12 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center mb-8">
            <p className="text-sm font-semibold text-muted-foreground">TRUSTED & CERTIFIED:</p>
            {trustLogos.map((logo, index) => (
              <div key={index} className="text-center" data-testid={`badge-trust-${index}`}>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  <logo.icon className="h-4 w-4 mr-2 text-[#97CC06]" />
                  {logo.name}
                </Badge>
              </div>
            ))}
          </div>

          {/* Stats Highlight */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {statsHighlight.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-[#97CC06]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-about">
                Scalable Solutions for Every Facility
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you're a growing startup or a Fortune 500 enterprise, Excel Facility Services Group adapts to your unique needs. Our multi-state infrastructure provides the scale and resources of national providers, while our regional accountability ensures the personal attention your facilities deserve.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From single-location businesses to complex multi-state operations, we bring 20+ years of facility management excellence, proven systems, and technology-enabled transparency that transforms facilities from cost centers into strategic assets.
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-learn-more">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div>
              <img
                src={aboutImage}
                alt="Professional cleaning team"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-about"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-services">
              Comprehensive Facility Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From routine janitorial maintenance to specialized disinfection protocols, we provide the complete range of facility services your business needs to thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full hover-elevate transition-all cursor-pointer" data-testid={`card-service-${index}`}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 mb-4">
                      <service.icon className="h-6 w-6 text-[#97CC06]" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-semibold text-sm">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects/Case Studies Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-case-studies">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real results from real clients across diverse industries and facility types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden hover-elevate transition-all" data-testid={`card-case-study-${index}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="outline" className="mb-2 w-fit">
                    {study.industry}
                  </Badge>
                  <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                  <CardDescription className="text-base">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/contact">
                    <Button variant="ghost" size="sm" data-testid={`button-case-study-${index}`}>
                      Learn More <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription/Newsletter Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-newsletter">
              Stay Updated with EFSG
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest insights on facility management best practices, industry trends, and service updates delivered to your inbox.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                variant="default"
                className="bg-[#97CC06] text-black hover:bg-[#85b505] border-0"
                data-testid="button-newsletter-cta"
              >
                <Mail className="mr-2 h-5 w-5" />
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-team">
              Expert Teams Nationwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our success is built on the expertise and dedication of professional teams across 28 states, delivering consistent excellence every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamRoles.map((role, index) => (
              <Card key={index} className="text-center hover-elevate transition-all" data-testid={`card-team-${index}`}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#97CC06]/10">
                      <role.icon className="h-8 w-8 text-[#97CC06]" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-service-tiers">
              Service Packages for Every Facility
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Customized facility management solutions that grow with your business, designed for companies of all sizes.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-muted/40 border border-muted-foreground/20 rounded-lg p-8 hover-elevate transition-all"
                  data-testid={`card-service-tier-${index}`}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`heading-tier-${index}`}>
                      {tier.name}
                    </h3>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#97CC06]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-[#97CC06]" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact">
                    <Button
                      className="w-full"
                      variant="default"
                      data-testid={`button-tier-${index}`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-primary/5 border border-primary/10 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4" data-testid="heading-custom-solutions">
                    Enterprise Solutions Available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Need something more specialized? EFSG provides fully customized facility management solutions tailored to your exact requirements, from multi-location operations to unique industry specifications.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#97CC06]" />
                      <span className="text-sm">Specialized cleaning programs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#97CC06]" />
                      <span className="text-sm">Integrated technology solutions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#97CC06]" />
                      <span className="text-sm">24/7 facility management</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="default"
                      className="bg-[#063970] hover:bg-[#0A5EB9]"
                      data-testid="button-custom-solutions"
                    >
                      REQUEST PROPOSAL
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Inquiry Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact">
                  Let's Discuss Your Facility Needs
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Ready to experience the EFSG difference? Our facility experts are standing by to create a customized solution for your business.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#97CC06]" />
                    <span>Call us for immediate assistance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#97CC06]" />
                    <span>Email us your facility details</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#97CC06]" />
                    <span>28 states nationwide coverage</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full bg-[#97CC06] text-black hover:bg-[#85b505] border-0 text-lg"
                    data-testid="button-contact-proposal"
                  >
                    REQUEST PROPOSAL
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-background/10 backdrop-blur-sm border-white/30 text-white hover:bg-background/20"
                    data-testid="button-contact-services"
                  >
                    VIEW ALL SERVICES
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-testimonials">
              Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from business leaders who trust EFSG with their facility management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-testimonial-${index}`}>
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#97CC06] text-[#97CC06]" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic mb-4">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-faq">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our services and approach
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Link href="/contact">
                <Button size="lg" data-testid="button-faq-contact">
                  Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
