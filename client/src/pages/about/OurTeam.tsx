import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/About_us_team_image_4c0b3785.png";

export default function OurTeam() {
  const teamMembers = [
    {
      name: "Alvin Romero",
      title: "President / CEO",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Alvin-1.jpg"
    },
    {
      name: "Gumersindo Rivera",
      title: "Vice President",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Mesa-de-trabajo-6-80-1.jpg"
    },
    {
      name: "Yaira Matos",
      title: "Executive Business Administrator",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Mesa-de-trabajo-7-80.jpg"
    },
    {
      name: "Erin Matsko",
      title: "Chief Operating Officer",
      image: "https://efsgnj.com/wp-content/uploads/2025/10/ERIN-MATSKO-CHIEF-OPERATING-OFFICER-edited.webp"
    },
    {
      name: "Norma Benitez",
      title: "MBA Financial Controller",
      image: "https://efsgnj.com/wp-content/uploads/2024/10/Norma-Tavarez-.jpg"
    },
    {
      name: "Ruth Barreto",
      title: "Accounting Manager",
      image: "https://efsgnj.com/wp-content/uploads/2023/11/Ruth.jpg"
    },
    {
      name: "Jacqueline Jimenez",
      title: "Account Manager",
      image: "https://efsgnj.com/wp-content/uploads/2025/10/JACQUELINE-JIMENEZ-ACCOUNT-MANAGER-edited-3.webp"
    },
    {
      name: "Shayla Arce",
      title: "Executive Assistant",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Mesa-de-trabajo-11-80.jpg"
    },
    {
      name: "Stephanie Candelaria",
      title: "Certified Payroll Specialist",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Mesa-de-trabajo-11-80-1.jpg"
    },
    {
      name: "Wendy Espinosa",
      title: "CMMS Manager",
      image: "https://efsgnj.com/wp-content/uploads/2022/11/Mesa-de-trabajo-12-80.jpg"
    },
    {
      name: "Zaira Cruz",
      title: "Recruiting Specialist",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Zaira-Cruz.jpg"
    },
    {
      name: "Fernando Gonzalez",
      title: "Operations Administrative Assistant",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Fernando-Gonzalez.jpg"
    },
    {
      name: "Juan Huaman",
      title: "Senior Account Manager I",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Juan-Huaman.jpg"
    },
    {
      name: "Jose Carrero",
      title: "Senior Account Manager",
      image: "https://efsgnj.com/wp-content/uploads/2024/08/Jose-Carrero-.jpg"
    },
    {
      name: "Cristian Molina",
      title: "Senior Account Manager",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Cristian-Molina.jpg"
    },
    {
      name: "Jhoana Vivas",
      title: "Field Operator",
      image: "https://efsgnj.com/wp-content/uploads/2024/08/joana-vivas.jpg"
    },
    {
      name: "Ana Masis",
      title: "Field Operator",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Ana-Masis.jpg"
    },
    {
      name: "Myriam Tandazo",
      title: "Field Operator",
      image: "https://efsgnj.com/wp-content/uploads/2024/07/Myriam-Tandazo.jpg"
    }
  ];

  return (
    <div>
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
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover-elevate active-elevate-2"
                data-testid={`card-team-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-team-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-name-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-title-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    {member.title}
                  </p>
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
