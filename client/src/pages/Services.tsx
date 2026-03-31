import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import heroImage from "@assets/our_services_bg_image_1774982925242.webp";
import janitorialImg from "@assets/Janitor_BG_1774969060493.webp";
import dayPortersImg from "@assets/Day_porter_bg_1774864310116.webp";
import levelUpImg from "@assets/LevelUp_Clean_BG_1774970115114.webp";
import disinfectionImg from "@assets/Covid_19_BG_image_1774968019559.webp";
import covidImg from "@assets/Covid_19_BG_image_2_1774982230106.webp";
import floorCareImg from "@assets/floor_care_1_1774863820156.webp";
import windowWashingImg from "@assets/high-rise-window-washers-seoul-korea-2026-03-24-07-16-35-utc_1774631783713.jpg";
import airDuctImg from "@assets/HVAC_bg_1774865693988.webp";
import carpetImg from "@assets/carpet_bg_image_2_1774635807951.webp";
import concreteImg from "@assets/concrete_bg_1774864652126.webp";
import powerWashingImg from "@assets/Power_washing_bg_1774863229197.webp";

export default function Services() {
  const services = [
    {
      image: janitorialImg,
      title: "Janitorial",
      description:
        "Janitorial services are essential for businesses of all sizes. It not only keeps the workplace looking clean and professional, but they also help to ensure a safe and healthy environment for customers and employees.",
      href: "/services/janitorial",
    },
    {
      image: dayPortersImg,
      title: "Day Porters",
      description:
        "A day porter is a professional who helps to maintain the cleanliness and order of a business or corporate building. Day porters typically work during regular business hours, ensuring that the building is clean and presentable for employees and visitors.",
      href: "/services/day-porters",
    },
    {
      image: levelUpImg,
      title: "LevelUp Clean®",
      description:
        "A healthier space for businesses and people to thrive! LEVEL UP CLEAN® helps clients navigate change and provide assurance by demonstrating trustworthy cleaning through a three-step approach that delivers sanitized spaces with certified disinfection.",
      href: "/services/levelup-clean",
    },
    {
      image: disinfectionImg,
      title: "Disinfection",
      description:
        "In commercial cleaning, disinfection is a process of applying an antimicrobial agent on all surfaces to destroy or inhibit the growth of potentially harmful microorganisms.",
      href: "/services/disinfection",
    },
    {
      image: covidImg,
      title: "COVID-19 Cleaning",
      description:
        "In addition to regular cleaning and disinfecting, commercial cleaners help reduce the virus's spread by implementing new protocols, such as increased air circulation and filtration.",
      href: "/services/covid-19-cleaning",
    },
    {
      image: floorCareImg,
      title: "Floor Care",
      description:
        "Far too often, business owners overlook the importance of floor care and neglect their facility floors' obvious stains and dullness. This can send a wrong message about the company's carelessness in providing customers with a positive experience. For this reason, it is imperative to maintain clean and polished floors to uphold a great and lasting impression.",
      href: "/services/floor-care",
    },
    {
      image: windowWashingImg,
      title: "Window Washing",
      description:
        "Window washing is a necessary service to keep a commercial building looking its best. It not only improves the appearance of the building but also extends the life of the windows by removing dirt, dust, and debris. Our window-washing methods will ensure that light travels effortlessly into your facility and enable your building's interior to shine!",
      href: "/services/window-washing",
    },
    {
      image: airDuctImg,
      title: "Air Duct & HVAC",
      description:
        "The air duct and HVAC system in a business or corporate building is critical for the health and comfort of employees and visitors. As a result, it is important to regularly maintain these systems to ensure smooth air quality throughout the workplace.",
      href: "/services/air-duct-hvac",
    },
    {
      image: carpetImg,
      title: "Carpet Extraction",
      description:
        "Carpet extraction can be challenging to manage and maintain within a commercial building. The right equipment and expertise are crucial for safe, effective work that meets all health regulations while minimizing disruption to your business continuity plan. It also prevents any negative impact on daily operations and customer care.",
      href: "/services/carpet-extraction",
    },
    {
      image: concreteImg,
      title: "Concrete Polishing",
      description:
        "Concrete polishing is a process that uses specialized equipment to grind and smooth surfaces. The process can be used on both new and existing concrete, and it produces a variety of benefits.",
      href: "/services/concrete-polishing",
    },
    {
      image: powerWashingImg,
      title: "Power Washing",
      description:
        "Power washing is a popular method of cleaning that uses high-pressure water to remove dirt, grime, and other surface deposits. Power washing effectively cleans many surfaces, including driveways, sidewalks, decks, and entrances. It can also remove mildew, mold, and other growths from siding and stone walls. As a result, power washing is a fast and convenient way to keep your business looking its best.",
      href: "/services/power-washing",
    },
  ];

  return (
    <div>
      <SEO
        title="Services"
        description="Explore our full range of commercial cleaning services — janitorial, day porters, disinfection, floor care, window washing, air duct & HVAC, carpet extraction, and more."
        path="/services"
      />
      <Hero
        title="We specialize in expert cleaning and disinfection services"
        subtitle="We are dedicated to providing facility solutions that help businesses run smoothly and efficiently."
        imageSrc={heroImage}
        height="medium"
        primaryCta={{ text: "REQUEST PROPOSAL", href: "/contact" }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From janitorial services to specialized cleaning, we provide comprehensive solutions
              for all your facility needs.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <div key={service.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
