import Hero from "@/components/Hero";
import EstimateForm from "@/components/EstimateForm";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Service Area",
      details: ["Nationwide Coverage", "20+ States"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["Available 24/7", "Contact us for assistance"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["Quick response time", "Professional support"],
    },
  ];

  return (
    <div>
      <Hero
        title="Get in Touch"
        subtitle="Request an estimate and let us help you create a healthier workplace"
        imageSrc={heroImage}
        height="small"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Request An Estimate</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours to discuss
                your facility cleaning needs.
              </p>
              <Card>
                <CardContent className="pt-6">
                  <EstimateForm />
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4" data-testid={`contact-${info.title.toLowerCase().replace(/\s/g, '-')}`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0">
                      <info.icon className="h-6 w-6 text-[#97CC06]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Why Choose EFSG?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">20+ years of commercial cleaning experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">Serving 20+ states nationwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">30M+ square feet serviced daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">Customized cleaning solutions for your industry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">Certified disinfection and health-focused cleaning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
