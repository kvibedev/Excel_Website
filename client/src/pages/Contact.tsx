import Hero from "@/components/Hero";
import EstimateForm from "@/components/EstimateForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Briefcase, Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Contact() {
  return (
    <div>
      <Hero
        title="Get in touch"
        subtitle="Partner with a nationwide leader in commercial facility services"
        imageSrc={heroImage}
        height="small"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-heading">Get in touch</h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-contact-message">
                Please leave your contact information below, along with a simple message, and we will gladly reach out to assist you with any further questions.
              </p>
              <Card>
                <CardContent className="pt-6">
                  <EstimateForm />
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8" data-testid="text-contact-info-heading">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4" data-testid="contact-phone">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#97CC06]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:8005932414" className="text-lg text-muted-foreground hover:text-[#97CC06]" data-testid="link-phone">
                      (800) 593-2414
                    </a>
                  </div>
                </div>

                <div className="flex gap-4" data-testid="contact-email">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#97CC06]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:info@efsgnj.com" className="text-lg text-muted-foreground hover:text-[#97CC06]" data-testid="link-email">
                      info@efsgnj.com
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground italic pt-4" data-testid="text-tagline">
                  "If you are looking for a commercial cleaning company you can trust to get the job done right, look no further than Excel Facility Services Group."
                </p>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4" data-testid="text-social-heading">Connect With Us</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/efsgnj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-[#97CC06]/10 hover-elevate active-elevate-2"
                    data-testid="link-facebook"
                  >
                    <FaFacebook className="h-5 w-5 text-[#97CC06]" />
                  </a>
                  <a 
                    href="https://www.instagram.com/efsgnj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-[#97CC06]/10 hover-elevate active-elevate-2"
                    data-testid="link-instagram"
                  >
                    <FaInstagram className="h-5 w-5 text-[#97CC06]" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/efsgnj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-[#97CC06]/10 hover-elevate active-elevate-2"
                    data-testid="link-linkedin"
                  >
                    <FaLinkedin className="h-5 w-5 text-[#97CC06]" />
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4" data-testid="text-why-choose-heading">Why Choose EFSG?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">20+ years of commercial cleaning experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">Serving 28 states nationwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#97CC06] font-bold">✓</span>
                    <span className="text-muted-foreground">400M square feet serviced daily</span>
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

              <div className="mt-12 space-y-6">
                <Card className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-[#97CC06]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" data-testid="text-vendor-heading">Vendor/Contractor Registration</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Interested in partnering with EFSG? Register as a vendor or contractor.
                        </p>
                        <a 
                          href="#vendor-registration" 
                          className="text-[#97CC06] hover:underline font-medium text-sm"
                          data-testid="link-vendor"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/10 flex-shrink-0">
                        <Users className="h-6 w-6 text-[#97CC06]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" data-testid="text-careers-heading">Careers at EFSG</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Join our growing team and build your career in facility services.
                        </p>
                        <a 
                          href="#careers" 
                          className="text-[#97CC06] hover:underline font-medium text-sm"
                          data-testid="link-careers"
                        >
                          View Openings →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
