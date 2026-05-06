import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import {
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Sparkles,
  Users,
  ShieldCheck,
  Briefcase,
  Leaf,
  ScrollText,
  CalendarClock,
  UserCheck,
} from "lucide-react";
import buildingImg from "@assets/Hero_building_image1_1774869765656.webp";
import cimsLogo from "@assets/CIMS-Logo-with-Tagline-RGB-Full-Color_1775838775336.webp";

const benefits = [
  {
    title: "Demonstrate Commitment to Quality",
    description:
      "Show clients and stakeholders that your organization adheres to industry-recognized standards for delivering consistent and high-quality cleaning services.",
  },
  {
    title: "Enhance Operational Efficiency",
    description:
      "Implement structured management practices that streamline processes, reduce waste, and improve overall performance.",
  },
  {
    title: "Gain Competitive Advantage",
    description:
      "Differentiate your business in the marketplace by showcasing your dedication to excellence and continuous improvement.",
  },
  {
    title: "Support Healthier Environments",
    description:
      "Adopt practices that promote hygiene and infection prevention, contributing to the well-being of building occupants.",
  },
];

const cimsPillars = [
  {
    icon: ClipboardCheck,
    title: "Quality Management Systems",
    description:
      "Documented processes, performance measurement, and continuous-improvement practices that govern every account.",
  },
  {
    icon: Sparkles,
    title: "Service Delivery",
    description:
      "Verified workloading, scheduling, supervision, and quality control on the floor — not just on paper.",
  },
  {
    icon: Users,
    title: "Human Resources",
    description:
      "Recruiting, training, and retention practices that produce a stable, qualified, and properly supervised workforce.",
  },
  {
    icon: ShieldCheck,
    title: "Health, Safety & Environment",
    description:
      "OSHA-aligned safety programs, chemical handling, infection-prevention protocols, and incident management.",
  },
  {
    icon: Briefcase,
    title: "Management Commitment",
    description:
      "Executive accountability, customer-focused leadership, and a documented commitment to the CIMS standard.",
  },
  {
    icon: Leaf,
    title: "Green Building (CIMS-GB)",
    description:
      "Sustainable cleaning practices that support LEED documentation and healthier indoor environments.",
  },
];

const cimsCredibility = [
  {
    icon: UserCheck,
    value: "Independent",
    label: "ISSA-accredited third-party assessor",
  },
  {
    icon: ScrollText,
    value: "Hundreds",
    label: "of evaluation criteria reviewed on-site",
  },
  {
    icon: CalendarClock,
    value: "Every 2 Years",
    label: "full recertification — no shortcuts",
  },
];

export default function CIMS() {
  return (
    <div>
      <SEO
        title="CIMS Certification"
        description="Excel Facility Services Group is ISSA CIMS certified — meeting the Cleaning Industry Management Standard for quality, efficiency, and customer satisfaction."
        path="/about-us/cims"
        image={buildingImg}
        keywords="CIMS certification, ISSA, Cleaning Industry Management Standard, commercial cleaning quality"
      />

      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="text-white">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                data-testid="text-cims-hero-title"
              >
                Excel Facility Services Group is ISSA CIMS Certified
              </h1>
              <p
                className="text-lg md:text-xl text-white/90"
                data-testid="text-cims-hero-subtitle"
              >
                Meeting the Cleaning Industry Management Standard — the
                industry&rsquo;s definitive framework for quality, operational
                excellence, and customer satisfaction in commercial cleaning.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-md p-8 shadow-lg max-w-sm w-full">
                <img
                  src={cimsLogo}
                  alt="ISSA CIMS Certification Logo"
                  className="w-full object-contain"
                  data-testid="img-cims-hero-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <img
                src={buildingImg}
                alt="Excel Facility Services building"
                className="w-full rounded-md object-cover"
                data-testid="img-cims-building"
              />
            </div>
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
                data-testid="text-what-is-cims"
              >
                What is CIMS?
              </h2>
              <p
                className="text-lg text-muted-foreground leading-relaxed mb-4"
                data-testid="text-cims-description-1"
              >
                The <strong className="text-foreground">Cleaning Industry Management Standard (CIMS)</strong> is
                a comprehensive certification program developed by ISSA, the
                worldwide cleaning industry association. It provides a framework
                for cleaning organizations to establish effective management
                systems that ensure quality, efficiency, and customer
                satisfaction.
              </p>
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                data-testid="text-cims-description-2"
              >
                Whether serving as a building service contractor or managing
                in-house cleaning operations, CIMS helps align services with
                industry best practices and client expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#063970]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
            data-testid="text-cims-standard-heading"
          >
            The CIMS Standard
          </h2>

          <div className="bg-white dark:bg-card rounded-md overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-[30%_70%]">
              <div className="bg-[#063970] flex flex-col items-center justify-center p-6">
                <img
                  src={cimsLogo}
                  alt="ISSA CIMS Badge"
                  className="w-full max-w-[200px] mb-3"
                  data-testid="img-cims-badge"
                />
                <p className="text-white text-[13px] text-center leading-snug">
                  Certified Under ISSA&rsquo;s Cleaning Industry Management
                  Standard
                </p>
              </div>

              <div className="p-8">
                <h3
                  className="text-xl font-semibold text-foreground mb-1"
                  data-testid="text-cims-benefits-subtitle"
                >
                  Why CIMS Certification Matters
                </h3>
                <hr className="mb-6 border-border" />

                <ul className="space-y-5">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit.title}
                      className="flex gap-3"
                      data-testid={`text-benefit-${benefit.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#0A5EB9] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#063970] dark:text-[#0A5EB9]">
                          {benefit.title}
                        </span>{" "}
                        <span className="text-muted-foreground text-sm">
                          — {benefit.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-right text-sm text-muted-foreground mt-6">
                  cims.issa.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              data-testid="text-process-heading"
            >
              What It Takes to Earn CIMS
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-process-intro"
            >
              CIMS isn&rsquo;t a self-declared badge. An independent,
              ISSA-accredited assessor audits our entire operation against
              hundreds of criteria — and we re-earn it every two years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cimsPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={index}
                  className="h-full"
                  data-testid={`card-pillar-${index}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#063970] text-white shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle
                        className="text-base"
                        data-testid={`text-pillar-title-${index}`}
                      >
                        {pillar.title}
                      </CardTitle>
                    </div>
                    <CardDescription
                      className="text-sm"
                      data-testid={`text-pillar-description-${index}`}
                    >
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cimsCredibility.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="h-full"
                  data-testid={`card-credibility-${index}`}
                >
                  <CardHeader className="text-center items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#97CC06]/15 text-[#0A5EB9] mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle
                      className="text-2xl font-bold text-[#063970]"
                      data-testid={`text-credibility-value-${index}`}
                    >
                      {stat.value}
                    </CardTitle>
                    <CardDescription
                      className="text-sm"
                      data-testid={`text-credibility-label-${index}`}
                    >
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <blockquote
            className="italic text-lg text-muted-foreground mb-10 border-l-4 border-[#0A5EB9] pl-4 text-left"
            data-testid="text-cims-quote"
          >
            &ldquo;The CIMS Standard describes the procedures and principles to
            be considered in designing and implementing quality management
            programs for cleaning organizations — ensuring consistent,
            high-quality service delivery.&rdquo;
          </blockquote>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-[#0A5EB9]"
            data-testid="text-excellence-title"
          >
            Committed to Operational Excellence
          </h2>

          <Link href="/contact">
            <Button
              className="bg-[#97CC06] text-white mb-4 text-base px-8"
              data-testid="button-cims-contact"
            >
              CONTACT US TODAY
            </Button>
          </Link>

          <p className="text-muted-foreground" data-testid="text-cims-cta-subtext">
            to learn how our{" "}
            <span className="text-[#0A5EB9] font-medium">
              CIMS-certified operations elevate your facility
            </span>
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            data-testid="text-cims-final-cta-title"
          >
            Partner With a CIMS-Certified Leader
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Excel Facility Services Group&rsquo;s CIMS certification ensures
            your facility receives cleaning services built on proven management
            systems and industry-recognized standards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#97CC06] text-white border-0"
                data-testid="button-cims-request-proposal"
              >
                REQUEST PROPOSAL
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about-us/recognitions-and-certifications">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-cims-view-certifications"
              >
                VIEW ALL CERTIFICATIONS
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
