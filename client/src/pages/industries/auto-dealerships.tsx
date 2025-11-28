import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Shield, Leaf, Users, Award, Clock, ThumbsUp, Building2, Car, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";

export default function AutoDealerships() {
  const benefits = [
    "Your dealership will look more organized and professional",
    "Customers will feel like they're valued and important",
    "We keep your environment clean and presentable",
    "We create a safe and healthy workplace for your team",
  ];

  const whyChooseUsCards = [
    {
      icon: Car,
      title: "Showroom Excellence",
      description: "Everything should look shiny and new, from the cars to the service department. We ensure your showroom always impresses.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Products",
      description: "Our experienced team uses advanced cleaning techniques and eco-friendly products to ensure every corner of your dealership sparkles.",
    },
    {
      icon: Sparkles,
      title: "Tailored Services",
      description: "Our tailored cleaning services are designed to meet your specific needs, from detailing the showroom to sanitizing service areas.",
    },
    {
      icon: Shield,
      title: "Customer Confidence",
      description: "A well-maintained dealership gives off the appearance of a successful business which helps instill confidence in potential buyers.",
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
      <Hero
        title="Auto Dealership"
        subtitle="A dirty or cluttered dealership will give customers a bad impression and may cause them to go elsewhere."
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
              A healthy and clean auto dealership plays a role in how customers view your business and the brands you sell. Everything should look shiny and new, from the cars to the service department. Some high-profile areas are front entrances, glass doors, displays, and the showroom floor. The sales area should be clean, bright, and inviting.
            </p>
            
            <p className="text-xl font-semibold text-center my-8 text-[#063970]" data-testid="text-highlight">
              First impressions are important to customers.
            </p>

            <p className="text-lg text-muted-foreground mb-6" data-testid="text-intro-2">
              Our professional cleaning service can ultimately help support your sales. We thoroughly <Link href="/services/disinfection" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-disinfection">disinfect</Link>, remove dust, remove the trash, and do <Link href="/services/janitorial" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-janitorial">overall cleaning</Link>. A well-maintained dealership will give off the appearance of a successful business which helps instill confidence in potential buyers.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-3">
              <strong>EFSG service can work out a cleaning schedule that best fits your needs.</strong> Our priority is keeping your dealership safe and maintaining a positive image for your customers and employees.
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

      {/* Tailored Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4" data-testid="badge-tailored">
              TAILORED SERVICES
            </Badge>
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
            
            <div className="text-center">
              <Link href="/contact" data-testid="link-request-estimate-tailored">
                <Button size="lg" data-testid="button-request-estimate-tailored">
                  REQUEST AN ESTIMATE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
              EFSG is Committed to Exceeding Your Expectations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From detailing the showroom to sanitizing service areas, we prioritize delivering exceptional results that enhance your dealership's reputation.
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
              By establishing a regular cleaning schedule, you can focus on running your business while we handle the cleanliness of your facility. Your dealership's outlook affects how customers perceive your brand, and our services are aimed at elevating that perception. With our support, you can create an inviting atmosphere that encourages foot traffic and <Link href="/services/levelup-clean" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-levelup">repeat visits</Link>. <Link href="/contact" className="text-[#0A5EB9] font-semibold hover:underline" data-testid="link-contact">Reach out to us today</Link> to get started!
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
              Ready for Professional Auto Dealership Cleaning?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              EFSG is committed to exceeding your expectations with cleaning services that help project professionalism and maintain a healthy space.
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
}
