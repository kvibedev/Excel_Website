import Hero from "@/components/Hero";
import IndustryCard from "@/components/IndustryCard";
import EstimateForm from "@/components/EstimateForm";
import { Card, CardContent } from "@/components/ui/card";
import medicalImage from "@assets/generated_images/Medical_groups_industry_image_a154fa6b.png";
import banksImage from "@assets/generated_images/Banks_industry_image_bcb98d1a.png";
import schoolsImage from "@assets/generated_images/Schools_industry_image_fe90ee17.png";
import autoImage from "@assets/generated_images/Auto_dealership_industry_image_7d795fe7.png";
import officeImage from "@assets/generated_images/Office_building_industry_image_29a84846.png";
import retailImage from "@assets/generated_images/Retail_industry_image_2a0d9b2e.png";
import distributionImage from "@assets/generated_images/Distribution_center_industry_image_5e966279.png";
import restaurantImage from "@assets/generated_images/Restaurant_industry_image_41a06d21.png";
import heroImage from "@assets/generated_images/Commercial_cleaning_hero_image_981b07c2.png";

export default function Industries() {
  const industries = [
    { title: "Office Buildings", imageSrc: officeImage, href: "/industries/office-building" },
    { title: "Retailers", imageSrc: retailImage, href: "/industries/retailer" },
    { title: "Distribution Centers", imageSrc: distributionImage, href: "/industries/distribution-centers" },
    { title: "Restaurants", imageSrc: restaurantImage, href: "/industries/restaurants" },
    { title: "Medical Groups", imageSrc: medicalImage, href: "/industries/medical-groups" },
    { title: "Banks", imageSrc: banksImage, href: "/industries/banks" },
    { title: "Schools", imageSrc: schoolsImage, href: "/industries/schools" },
    { title: "Auto Dealerships", imageSrc: autoImage, href: "/industries/auto-dealerships" },
  ];

  return (
    <div>
      <Hero
        title="We offer services for a wide range of industries"
        subtitle="Schools, banks, retail stores, medical groups, offices, restaurants, and much more."
        imageSrc={heroImage}
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Excel Facility Services Group, we recognize that each industry has its own unique
              cleaning requirements and standards. That's why we customize our services to meet the
              specific needs of our diverse clientele. Our well-trained staff takes pride in
              delivering high-quality cleaning solutions tailored to the environment you operate in.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              In educational settings, we ensure that classrooms are sanitized and ready for
              learning, while in medical facilities, we prioritize safe, disinfected spaces that
              protect both patients and staff. For retail stores and restaurants, we maintain a clean
              and inviting atmosphere that enhances customer experience.
            </p>
            <p className="text-lg text-muted-foreground">
              We also specialize in cleaning government facilities and transportation hubs, ensuring
              compliance with strict regulations. Regardless of your industry, our commitment to
              excellence and consistency remains the same.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} {...industry} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Request An Estimate
            </h2>
            <Card>
              <CardContent className="pt-6">
                <EstimateForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
