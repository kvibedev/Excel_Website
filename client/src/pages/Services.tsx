import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import {
  Sparkles,
  Users,
  Shield,
  Droplets,
  Worm,
  Layers,
  SprayCan,
  Brush,
  Wind,
  Warehouse,
  Cog,
  Building2,
} from "lucide-react";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Services() {
  const services = [
    {
      icon: Sparkles,
      title: "Janitorial",
      description:
        "Janitorial services are essential for businesses of all sizes. It not only keeps the workplace looking clean and professional, but they also help to ensure a safe and healthy environment for customers and employees.",
      href: "/services/janitorial",
    },
    {
      icon: Users,
      title: "Day Porters",
      description:
        "A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. Day porters typically work during regular business hours, ensuring that the building is clean and presentable for employees and visitors.",
      href: "/services/day-porters",
    },
    {
      icon: Shield,
      title: "LevelUp Clean®",
      description:
        "A healthier space for businesses and people to thrive! LEVEL UP CLEAN® helps clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers sanitized spaces with certified disinfection.",
      href: "/services/levelup-clean",
    },
    {
      icon: Droplets,
      title: "Disinfection",
      description:
        "In commercial cleaning, disinfection is a process of applying an antimicrobial agent on all surfaces to destroy or inhibit the growth of potentially harmful microorganisms.",
      href: "/services/disinfection",
    },
    {
      icon: Worm,
      title: "COVID-19 Cleaning",
      description:
        "In addition to regular cleaning and disinfecting, commercial cleaners help reduce the virus's spread by implementing new protocols, such as increased air circulation and filtration.",
      href: "/services/covid-19-cleaning",
    },
    {
      icon: Layers,
      title: "Floor Care",
      description:
        "Far too often, business owners overlook the importance of floor care and neglect their facility floors' obvious stains and dullness. This can send a wrong message about the company's carelessness in providing customers with a positive experience.",
      href: "/services/floor-care",
    },
    {
      icon: Brush,
      title: "Window Washing",
      description:
        "Window washing is a necessary service to keep a commercial building looking its best. It not only improves the appearance of the building but also extends the life of the windows by removing dirt, dust, and debris.",
      href: "/services/window-washing",
    },
    {
      icon: Wind,
      title: "Air Duct & HVAC",
      description:
        "The air duct and HVAC system in a business or corporate building is critical for the health and comfort of employees and visitors. As a result, it is important to regularly maintain these systems to ensure smooth air quality throughout the workplace.",
      href: "/services/air-duct-hvac",
    },
    {
      icon: Warehouse,
      title: "Carpet Extraction",
      description:
        "Carpet extraction can be challenging to manage and maintain within a commercial building. The right equipment and expertise are crucial for safe, effective work that meets all health regulations.",
      href: "/services/carpet-extraction",
    },
    {
      icon: Cog,
      title: "Concrete Polishing",
      description:
        "Concrete polishing is a process that uses specialized equipment to grind and smooth surfaces. The process can be used on both new and existing concrete, and it produces a variety of benefits.",
      href: "/services/concrete-polishing",
    },
    {
      icon: SprayCan,
      title: "Power Washing",
      description:
        "Power washing is a popular method of cleaning that uses high-pressure water to remove dirt, grime, and other surface deposits. Power washing effectively cleans many surfaces, including driveways, sidewalks, decks, and entrances.",
      href: "/services/power-washing",
    },
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description:
        "Comprehensive commercial cleaning solutions tailored to your business needs, ensuring a pristine and professional environment.",
      href: "/services/commercial-cleaning",
    },
  ];

  return (
    <div>
      <Hero
        title="We specialize in expert cleaning and disinfection services"
        subtitle="Dedicated to providing facility solutions that help businesses run smoothly and efficiently."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "Request Estimate", href: "/contact" }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From janitorial services to specialized cleaning, we provide comprehensive solutions
              for all your facility needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
