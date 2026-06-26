import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import alvinImage from "@assets/Alvin-1_1764595596799.webp";
import gumersindoImage from "@assets/Mesa-de-trabajo-6-80-1_1764595596799.webp";
import yairaImage from "@assets/Yaira_1778310675624.jpg";
import erinImage from "@assets/Erin_(1)_1774895727872.png";
import normaImage from "@assets/Norma_(1)_1774895749603.png";
import ruthImage from "@assets/Ruthy_1778310675624.jpeg";
import jacquelineImage from "@assets/JACQUELINE-JIMENEZ-ACCOUNT-MANAGER-edited-3_1764595596798.webp";
import shaylaImage from "@assets/Shayla_1778310675624.jpeg";
import stephanieImage from "@assets/Stephanie_1764595596798.webp";
import wendyImage from "@assets/Wendy_1764595596798.webp";
import zairaImage from "@assets/Zaira-Cruz_1764595596798.webp";
import fernandoImage from "@assets/Fernando-Gonzalez_1764595596798.webp";
import juanImage from "@assets/Juan-Huaman_1764595596798.webp";
import joseImage from "@assets/Jose-Carrero-_1764595596798.webp";
import cristianImage from "@assets/Cristian-Molina_1764595596798.webp";
import jhoanaImage from "@assets/joana-vivas_1764595596798.webp";
import anaImage from "@assets/Ana-Masis_1764595596798.webp";
import myriamImage from "@assets/Myriam-Tandazo_1764595596798.webp";
import madisonImage from "@assets/Madison_(1)_1778855134891.jpeg";
import jolieImage from "@assets/Jolie_Approved_1778310675625.jpeg";
import thomasImage from "@assets/Thomas_1778310675624.jpg";
import dyaneImage from "@assets/Dyane_1778310675625.png";
import katherineImage from "@assets/Katherine_(1)_1778855134892.jpeg";
import yoelImage from "@assets/Yoel_1778310675623.jpg";
import darrelImage from "@assets/Darrell_1778310675625.jpg";
import guadalupeImage from "@assets/Guadalupe_1778310675625.jpg";

function placeholderImage(name: string): string {
  const initials = name
    .split(" ")
    .filter((p) => /^[A-Za-z]/.test(p))
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A5EB9"/><stop offset="100%" stop-color="#063970"/></linearGradient></defs><rect width="300" height="400" fill="url(#g)"/><circle cx="150" cy="160" r="60" fill="#ffffff" fill-opacity="0.15"/><text x="150" y="180" text-anchor="middle" font-family="Barlow, Arial, sans-serif" font-size="56" font-weight="700" fill="#ffffff">${initials}</text><text x="150" y="320" text-anchor="middle" font-family="Cabin, Arial, sans-serif" font-size="18" fill="#ffffff" fill-opacity="0.85">Photo Coming Soon</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function OurTeam() {
  const teamMembers = [
    {
      name: "Alvin Romero",
      title: "President / CEO",
      image: alvinImage
    },
    {
      name: "Erin Matsko",
      title: "Chief Operating Officer",
      image: erinImage
    },
    {
      name: "Gumersindo Rivera",
      title: "Vice President",
      image: gumersindoImage
    },
    {
      name: "Yaira Matos",
      title: "Executive Business Administrator",
      image: yairaImage
    },
    {
      name: "Shayla Arce",
      title: "Executive Assistant",
      image: shaylaImage
    },
    {
      name: "Norma Benitez, MBA",
      title: "Financial Controller",
      image: normaImage
    },
    {
      name: "Ruth Barreto",
      title: "Accounting Manager",
      image: ruthImage
    },
    {
      name: "Madison Scott",
      title: "Accounting Clerk",
      image: madisonImage
    },
    {
      name: "Stephanie Candelaria",
      title: "Certified Payroll Specialist",
      image: stephanieImage
    },
    {
      name: "Wendy Espinosa",
      title: "CMMS Manager",
      image: wendyImage,
      hidden: true
    },
    {
      name: "Zaira Cruz",
      title: "Recruitment Specialist",
      image: zairaImage
    },
    {
      name: "Jolie Figueroa",
      title: "HR Assistant",
      image: jolieImage
    },
    {
      name: "Thomas Cooper",
      title: "Senior Operations Manager",
      image: thomasImage,
      hidden: true
    },
    {
      name: "Juan Huaman",
      title: "Senior Account Manager",
      image: juanImage
    },
    {
      name: "Dyane Barbato",
      title: "Account Manager",
      image: dyaneImage
    },
    {
      name: "Fernando Gonzalez",
      title: "Account Manager",
      image: fernandoImage
    },
    {
      name: "Katherine Tavarez",
      title: "Account Manager",
      image: katherineImage
    },
    {
      name: "Yoel Beltre",
      title: "Area Manager",
      image: yoelImage,
      hidden: true
    },
    {
      name: "Darrel Bynum",
      title: "Area Manager",
      image: darrelImage
    },
    {
      name: "Guadalupe Urena",
      title: "Area Manager",
      image: guadalupeImage
    },
    {
      name: "Ana Masis",
      title: "Field Operator",
      image: anaImage
    },
    {
      name: "Myriam Tandazo",
      title: "Field Operator",
      image: myriamImage
    },
    {
      name: "Jacqueline Jimenez",
      title: "Account Manager",
      image: jacquelineImage,
      hidden: true
    },
    {
      name: "Jose Carrero",
      title: "Senior Account Manager",
      image: joseImage,
      hidden: true
    },
    {
      name: "Cristian Molina",
      title: "Senior Account Manager",
      image: cristianImage,
      hidden: true
    },
    {
      name: "Jhoana Vivas",
      title: "Field Operator",
      image: jhoanaImage,
      hidden: true
    }
  ];

  return (
    <div>
      <SEO
        title="Our Team"
        description="Meet the leadership team behind Excel Facility Services Group — dedicated professionals with decades of facility management experience."
        path="/about-us/team"
        image={alvinImage}
        keywords="Excel Facility Services team, leadership, facility management professionals"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-our-team-title">
              Meet Our Team
            </h1>
            <p className="text-xl text-white/90" data-testid="text-our-team-subtitle">
              Dedicated professionals delivering excellence across our nationwide operations
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {teamMembers.filter(m => !m.hidden).map((member, index) => (
              <Card 
                key={index}
                className="hover-elevate active-elevate-2 border-0 shadow-lg bg-transparent w-full max-w-sm md:max-w-none md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] xl:w-[calc(25%-1.5rem)]"
                data-testid={`card-team-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-full mb-4 overflow-hidden rounded-[2.5rem]" style={{ aspectRatio: '3/4' }}>
                    <img 
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                      data-testid={`img-team-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    />
                  </div>
                  <div className="px-6 pb-6 text-center">
                    <h3 className="text-xl font-bold mb-2" data-testid={`text-name-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-title-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                      {member.title}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-team-cta-title">
            Join Our Growing Team
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-team-cta-subtitle">
            We're always looking for talented professionals to join Excel Facility Services Group. Explore career opportunities with us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="default"
                className="bg-[#97CC06] text-[#063970] border-[#97CC06]"
                data-testid="button-contact-careers"
              >
                CONTACT US
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                data-testid="button-view-services"
              >
                VIEW SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
