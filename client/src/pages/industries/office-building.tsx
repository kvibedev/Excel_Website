import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Shield, Leaf, Users, Award, Clock, ThumbsUp, Building2 } from "lucide-react";
import heroImage from "@assets/office_top_bg_1774871962308.webp";
import greenSealImage from "@assets/Hero_building_image1_1774869765656.webp";
import greenSealBadge from "@assets/GS-Provide-Service-dk_1764335201153.webp";

export default function OfficeBuilding() {
  const benefits = [
    "Save money and time with a customized program",
    "Get reliable, local service that you can trust",
    "Streamline your operations for sustainable maintenance",
    "Benefit from unparalleled expertise in commercial cleaning services and facility management",
  ];

  const whyChooseUsCards = [
    {
      icon: Shield,
      title: "Employee Productivity",
      description: "A clean office goes beyond aesthetics; it's essential for employee productivity and overall well-being.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "We utilize eco-friendly cleaning products, ensuring a safe space for your employees while being mindful of our planet.",
    },
    {
      icon: Users,
      title: "Personalized Solutions",
      description: "Every office space is unique, which is why we take the time to assess your specific needs and offer personalized cleaning solutions.",
    },
    {
      icon: Award,
      title: "Rigorous Training",
      description: "Our staff undergoes rigorous training to stay updated with best practices and innovations in the cleaning industry.",
    },
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
        title="Office Building Cleaning"
        description="Professional cleaning services for office buildings from Excel Facility Services Group. Create a healthier, more productive workspace."
        path="/industries/office-building"
      />
      <Hero
        title="Office Building"
        subtitle="EFSG provides reliable facility services to keep your office clean, comfortable, and safe."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
      />

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4" data-testid="badge-industries">
              INDUSTRIES
            </Badge>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-intro-1">
              An office is one of the first places potential customers and partners will see when they visit your company. First impressions matter and a clean, well-maintained building will help your business project a professional image. <Link href="/about" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-about-efsg">Excel Facility Services Group</Link> offers a wide range of commercial cleaning services to keep your office looking its best. From regularly scheduled <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial-services">janitorial services</Link> to one-time deep cleans, we can develop a customized cleaning plan that meets your specific needs. Our experienced professionals only use the latest equipment and techniques to get the job done correctly.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-2">
              <strong>Excel Facility Services Group</strong> can help you get organized and create a space that reflects professionalism and attention to detail. We understand that privacy is very important in an office setting, so we are willing to work with our customers on scheduling times for cleaning their offices when no one else will be there.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold" data-testid="heading-benefits">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                      <CheckCircle2 className="w-6 h-6 text-[#97CC06] flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Green Seal Certification Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <img
                src={greenSealImage}
                alt="Green Seal Certified Commercial Cleaning"
                className="rounded-md w-full h-auto shadow-lg"
                data-testid="img-green-seal"
              />
            </div>
            <div>
              <Badge variant="outline" className="mb-4 bg-[#97CC06]/10 text-[#97CC06] border-[#97CC06]" data-testid="badge-certified">
                GREEN SEAL CERTIFIED
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-certification">
                Certified Excellence in Commercial Cleaning
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="text-certification">
                Excel Facility's Commercial Cleaning Service is certified by the <strong>Green Seal Standard for Commercial and Institutional Cleaning Services</strong>. This certification guarantees that your office has been cleaned to the highest standards in the industry. When you partner with EFSG, you can be confident that your office will always make a positive impression.
              </p>
              <img
                src={greenSealBadge}
                alt="Green Seal - Proud providers of a Certified service"
                className="h-24 w-auto"
                data-testid="img-green-seal-badge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-why-choose">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-choose">
              Creating Environments That Promote Focus and Collaboration
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At Excel Facility Services Group, we believe that a clean office goes beyond aesthetics; it's essential for employee productivity and overall well-being.
            </p>
          </div>

          {/* Original 4 Cards with descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
            {whyChooseUsCards.map((item, index) => (
              <Card key={index} className="h-full hover-elevate transition-all" data-testid={`card-why-choose-${index}`}>
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#063970] mb-4">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 5 Value Proposition Cards with green borders */}
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

          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-lg text-muted-foreground text-center" data-testid="text-why-choose-closing">
              Our comprehensive services can be tailored to suit various office settings, from small startups to large corporate environments. Regular cleaning schedules can be seamlessly integrated into your operations, minimizing disruption while maintaining cleanliness standards. Don't compromise on the health and appearance of your workspace. Allow Excel Facility Services Group to <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-partner-contact">partner with you</Link> in maintaining a pristine office that leaves a lasting impression on clients and employees alike.
            </p>
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
              Your office is an important part of your business, so why not make it look great?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG provides reliable facility services to keep your office clean, comfortable, and safe.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-white border-0 text-lg px-8"
                data-testid="button-request-proposal"
              >
                REQUEST AN ESTIMATE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
