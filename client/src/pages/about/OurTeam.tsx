import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/Worker_group_shot_(2)_1774896517773.png";
import alvinImage from "@assets/Alvin-1_1764595596799.webp";
import gumersindoImage from "@assets/Mesa-de-trabajo-6-80-1_1764595596799.webp";
import yairaImage from "@assets/Mesa-de-trabajo-7-80_1764595596799.webp";
import erinImage from "@assets/Erin_(1)_1774895727872.png";
import normaImage from "@assets/Norma_(1)_1774895749603.png";
import ruthImage from "@assets/Ruth_1764595596798.jpg";
import jacquelineImage from "@assets/JACQUELINE-JIMENEZ-ACCOUNT-MANAGER-edited-3_1764595596798.webp";
import shaylaImage from "@assets/Shayla_1764595596798.webp";
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
      name: "Norma Benitez, MBA",
      title: "MBA Financial Controller",
      image: normaImage
    },
    {
      name: "Ruth Barreto",
      title: "Accounting Manager",
      image: ruthImage
    },
    {
      name: "Jacqueline Jimenez",
      title: "Account Manager",
      image: jacquelineImage,
      hidden: true
    },
    {
      name: "Shayla Arce",
      title: "Executive Assistant",
      image: shaylaImage
    },
    {
      name: "Stephanie Candelaria",
      title: "Certified Payroll Specialist",
      image: stephanieImage
    },
    {
      name: "Wendy Espinosa",
      title: "CMMS Manager",
      image: wendyImage
    },
    {
      name: "Zaira Cruz",
      title: "Recruiting Specialist",
      image: zairaImage
    },
    {
      name: "Fernando Gonzalez",
      title: "Operations Administrative Assistant",
      image: fernandoImage
    },
    {
      name: "Juan Huaman",
      title: "Senior Account Manager I",
      image: juanImage
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
      image: cristianImage
    },
    {
      name: "Jhoana Vivas",
      title: "Field Operator",
      image: jhoanaImage,
      hidden: true
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
    }
  ];

  return (
    <div>
      <SEO
        title="Our Team"
        description="Meet the leadership team behind Excel Facility Services Group — dedicated professionals with decades of facility management experience."
        path="/about/our-team"
      />
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#063970]/95 via-[#063970]/90 to-[#063970]/85"></div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.filter(m => !m.hidden).map((member, index) => (
              <Card 
                key={index}
                className="hover-elevate active-elevate-2 border-0 shadow-lg bg-transparent"
                data-testid={`card-team-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-full mb-4 overflow-hidden rounded-[2.5rem]" style={{ aspectRatio: '3/4' }}>
                    <img 
                      src={member.image}
                      alt={member.name}
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
