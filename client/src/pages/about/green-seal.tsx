import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import buildingImg from "@assets/Hero_building_image1_1774869765656.webp";
import greenSealBadge from "@assets/geensealbadge_1774369297754.webp";

const pillars = [
  {
    title: "Verification",
    description:
      "Audited compliance for quality, safety, and environmental impact practices and procedures",
  },
  {
    title: "Effective Cleaning Operations",
    description:
      "Comprehensive cleaning plan and green cleaning practices and procedures for every building",
  },
  {
    title: "Clear & Effective Communications",
    description:
      "Practices and procedures that ensure openness and integrity in communications between all parties",
  },
  {
    title: "Better Equipment & Safer Products",
    description:
      "Safe and effective cleaning products and equipment that reduce environmental impacts",
  },
  {
    title: "Superior Staff Training",
    description:
      "Extensive and ongoing staff training on cleaning products and procedures to create cleaner indoor environments and protect building occupants",
  },
];

export default function GreenSeal() {
  return (
    <div>
      <SEO
        title="Green Seal Certification"
        description="Excel Facility Services Group is Green Seal GS-42 certified, delivering environmentally responsible commercial cleaning solutions."
        path="/about/green-seal"
      />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/90 via-[#0A5EB9]/80 to-[#063970]/90" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-testid="text-hero-title"
          >
            Excel Facility Services Group is Green Seal Certified
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            Protecting our environment and embracing sustainable cleaning
            practices is just one of the many ways we offer quality services to
            our clients.
          </p>
        </div>
      </section>

      {/* Video + About Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#063970] to-[#0A5EB9]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="aspect-video rounded-md overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/k6zvcGXnXKk"
                title="Excel Sustainability"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video-sustainability"
              />
            </div>
            <div className="flex flex-col gap-6">
              <img
                src={buildingImg}
                alt="Excel Facility Services building"
                className="w-full rounded-md object-cover"
                data-testid="img-building"
              />
              <p
                className="text-lg text-white/90 leading-relaxed"
                data-testid="text-about-description"
              >
                <strong className="text-white">Excel Facility Services Group</strong> believes in
                protecting our planet and natural resources, and we are doing
                our part to ensure that we educate ourselves and our clients on
                green technologies and cleaning practices that benefit us all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leader in Sustainability Section */}
      <section className="py-16 md:py-24 bg-[#0d3d1a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
            data-testid="text-sustainability-heading"
          >
            Leader in Sustainability
          </h2>

          {/* White Card */}
          <div className="bg-white rounded-md overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-[30%_70%]">
              {/* Left panel */}
              <div className="bg-[#0d3d1a] flex flex-col items-center justify-center p-4">
                <img
                  src={greenSealBadge}
                  alt="Green Seal Badge"
                  className="w-full max-w-[200px] mb-3"
                  data-testid="img-green-seal-badge"
                />
                <p className="text-white text-[13px] text-center leading-snug">
                  Independently Certified Under Green Seal's Commercial Cleaning
                  Services Standard (GS-42)
                </p>
              </div>

              {/* Right panel */}
              <div className="p-8">
                <h3
                  className="text-xl font-semibold text-gray-800 mb-1"
                  data-testid="text-commercial-cleaning-subtitle"
                >
                  Commercial Cleaning Service
                </h3>
                <hr className="mb-6 border-gray-200" />

                <ul className="space-y-5">
                  {pillars.map((pillar) => (
                    <li key={pillar.title} data-testid={`text-pillar-${pillar.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <span className="font-bold text-[#0d3d1a]">
                        {pillar.title}
                      </span>{" "}
                      <span className="text-gray-700 text-sm">
                        — {pillar.description}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-right text-sm text-gray-500 mt-6">
                  greenseal.org/gs-42
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote + CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <blockquote
            className="italic text-lg text-gray-600 mb-10 border-l-4 border-[#97CC06] pl-4 text-left"
            data-testid="text-gs42-quote"
          >
            "The GS-42 Green Seal standard establishes requirements for cleaning
            service providers to ensure an environmentally safe cleaning solution
            for customers."
          </blockquote>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-[#0A5EB9]"
            data-testid="text-healthier-title"
          >
            Creating Healthier Workplaces!
          </h2>

          <Link href="/contact">
            <Button
              className="bg-[#97CC06] text-white mb-4 text-base px-8"
              data-testid="button-contact-us"
            >
              CONTACT US TODAY
            </Button>
          </Link>

          <p className="text-gray-700" data-testid="text-cta-subtext">
            to discuss how to{" "}
            <span className="text-[#97CC06] font-medium">
              make your facility Green with us!
            </span>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-8" data-testid="text-cta-message">
            <Link href="/contact" className="underline hover:no-underline">
              Contact us today
            </Link>
          </p>
          <p className="text-lg" data-testid="text-cta-subtitle">
            to discuss how to make your facility Green with us!
          </p>
        </div>
      </section>
    </div>
  );
}
