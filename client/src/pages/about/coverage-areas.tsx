import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";
import usaMapImage from "@assets/EXCEL_MAP_2025_(1)_1774873104677.png";

export default function CoverageAreas() {
  const statesColumn1 = [
    "Ohio",
    "Texas",
    "Florida",
    "Georgia",
    "Tennessee",
    "South Carolina",
    "North Carolina",
    "Virginia",
    "West Virginia",
    "Oklahoma",
    "Montana"
  ];

  const statesColumn2 = [
    "Illinois",
    "Nevada",
    "Pennsylvania",
    "Maryland",
    "Delaware",
    "New Jersey",
    "New York",
    "Connecticut",
    "Massachusetts",
    "Puerto Rico",
    "Wyoming"
  ];

  return (
    <div>
      <SEO
        title="Coverage Areas"
        description="Excel Facility Services Group serves clients across 20+ states. View our nationwide coverage areas."
        path="/about/coverage-areas"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="EFSG Coverage Areas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/90 via-[#0A5EB9]/80 to-[#063970]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-4 bg-[#97CC06] text-[#063970]" data-testid="badge-coverage">
            Nationwide Service
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Coverage Areas
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            EFSG Continues To Expand Services Across The Country
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-intro-title">
              We Are Proud To Offer Our 5-Star Customer Service To An Ever-Growing Number Of Satisfied Customers
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-intro-description">
              At Excel Facility Services Group, we pride ourselves on the high quality of our janitorial services and the long-standing relationships we form with our customers. We understand that the key to providing excellent service is through proper communication and collaboration, working closely with our customers to ensure their needs are met and are happy with the end results. EFSG is proud to be a fully insured and bonded company, so you can trust that your facility is in good hands.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#97CC06] text-[#063970]"
                data-testid="button-contact-us"
              >
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Message Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground" data-testid="text-experience">
              With more than 20 years of experience in providing high-quality services to customers in over 22 states. We are proud to offer our services near you.
            </p>
          </div>
        </div>
      </section>

      {/* States Listing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#97CC06]/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-[#97CC06]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-states-title">
              Look at our coverage areas below to view our footprint and where we currently provide services across the United States!
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <img
              src={usaMapImage}
              alt="EFSG Coverage Areas Map"
              className="w-full h-auto"
              data-testid="img-usa-map"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Experience 5-Star Service?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            With more than 20 years of experience providing high-quality services to customers in over 22 states, we are proud to offer our services near you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#97CC06] text-[#063970]"
                data-testid="button-cta-contact"
              >
                CONTACT US TODAY
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-cta-services"
              >
                EXPLORE SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
