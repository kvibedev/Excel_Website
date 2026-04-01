import SEO from "@/components/SEO";
import EstimateForm from "@/components/EstimateForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Briefcase, Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import heroImage from "@assets/Vendor_registration_(2)_1775007307662.png";

export default function Contact() {
  return (
    <div>
      <SEO
        title="Contact Us"
        description="Get in touch with Excel Facility Services Group. Call (800) 593-2414 or email info@efsgnj.com. Request a proposal for commercial cleaning services."
        path="/contact"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover object-top" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-contact-hero-title">
              Get in touch
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-contact-message">
                Please leave your contact information below, along with a simple message, and we will gladly reach out to assist you with any further questions.
              </p>
              <Card className="p-6 border-t-4 border-t-[#0A5EB9]">
                <EstimateForm />
              </Card>
            </div>

            {/* Right Column - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8" data-testid="text-contact-info-heading">Contact info</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4 items-start" data-testid="contact-phone">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A5EB9]/10 flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#0A5EB9]" />
                  </div>
                  <div>
                    <a href="tel:8005932414" className="text-2xl font-bold text-foreground hover:text-[#0A5EB9] transition-colors" data-testid="link-phone">
                      (800) 593-2414
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start" data-testid="contact-email">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A5EB9]/10 flex-shrink-0">
                    <Mail className="h-6 w-6 text-[#0A5EB9]" />
                  </div>
                  <div>
                    <a href="mailto:info@efsgnj.com" className="text-lg text-foreground hover:text-[#0A5EB9] transition-colors" data-testid="link-email">
                      info@efsgnj.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start" data-testid="contact-address">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A5EB9]/10 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#0A5EB9]" />
                  </div>
                  <div>
                    <p className="text-lg text-foreground" data-testid="text-address">
                      200 Broadacres Dr., Suite 160<br />
                      Bloomfield, NJ 07003
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground italic mb-8" data-testid="text-tagline">
                If you are looking for a commercial cleaning company you can trust to get the job done right, look no further than Excel Facility Services Group.
              </p>

              <div className="mb-12">
                <h3 className="font-bold mb-4" data-testid="text-social-heading">Follow us:</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://www.facebook.com/Excelfacilityservices" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A5EB9]/10 hover-elevate active-elevate-2"
                    data-testid="link-facebook"
                  >
                    <FaFacebook className="h-5 w-5 text-[#0A5EB9]" />
                  </a>
                  <a 
                    href="https://www.instagram.com/excelfacilityservicesgroup/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A5EB9]/10 hover-elevate active-elevate-2"
                    data-testid="link-instagram"
                  >
                    <FaInstagram className="h-5 w-5 text-[#0A5EB9]" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/excel-facility-services-llc/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A5EB9]/10 hover-elevate active-elevate-2"
                    data-testid="link-linkedin"
                  >
                    <FaLinkedin className="h-5 w-5 text-[#0A5EB9]" />
                  </a>
                </div>
              </div>

              {/* Vendors / Contractors Card */}
              <Card className="mb-6 hover-elevate border-t-4 border-t-[#97CC06]">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#97CC06]/10 flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-[#97CC06]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" data-testid="text-vendor-heading">Vendors / Contractors</h3>
                      <p className="text-muted-foreground mb-4">
                        Excel Facility Services Group appreciates your interest in doing business with us. Please complete the form below and a company representative will contact you in the next 48 hours.
                      </p>
                      <Link href="/vendor-registration">
                        <Button 
                          variant="default"
                          data-testid="button-vendor"
                        >
                          Vendor Registration Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Careers Card */}
              <Card className="hover-elevate border-t-4 border-t-[#97CC06]">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#97CC06]/10 flex-shrink-0">
                      <Users className="h-6 w-6 text-[#97CC06]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" data-testid="text-careers-heading">Careers</h3>
                      <p className="text-muted-foreground mb-4">
                        Our Talent Community keeps you informed about the new opportunities relevant to your job profile.
                      </p>
                      <a 
                        href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=2efccd9b-d01e-4fc0-a0bd-5735ec5ae45c&ccId=19000101_000001&lang=en_US" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button 
                          variant="default"
                          data-testid="button-careers"
                        >
                          View Current Openings
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
