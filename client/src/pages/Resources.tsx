import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

export default function Resources() {
  const blogArticles = [
    {
      id: 1,
      title: "Non Toxic Cleaning Transforms Facilities",
      date: "07/22/2025",
      excerpt: "This blog post explores how non-toxic cleaning solutions are transforming facility management through sustainable, health-conscious practices. It covers the growing demand for green cleaning due to regulations, tenant expectations, and environmental benefits. Learn how innovative products, technology, and updated policies improve indoor air quality, reduce toxic waste, and enhance safety while also providing cost-effective alternatives.",
      image: heroImage,
      slug: "non-toxic-cleaning-transforms-facilities"
    },
    {
      id: 2,
      title: "Sustainable Floor Care Transforming Facilities",
      date: "07/21/2025",
      excerpt: "This blog explores sustainable floor care in industrial facilities, focusing on eco-friendly cleaning products, energy- and water-efficient equipment, and tailored maintenance routines that protect both worker health and the environment. It highlights innovative coatings, best practices, and leading green brands while offering actionable steps for facility managers aiming to reduce costs and environmental impact without compromising durability or cleanliness.",
      image: heroImage,
      slug: "sustainable-floor-care-transforming-facilities"
    },
    {
      id: 3,
      title: "Green Cleaning Transforming Facility Management",
      date: "07/18/2025",
      excerpt: "Discover how green cleaning is transforming facility management by replacing toxic chemicals with safer, eco-friendly products and technologies. This post explores trends, benefits, sector-specific strategies, and practical steps for leaders to boost sustainability, improve health, cut costs, and future-proof their buildings.",
      image: heroImage,
      slug: "green-cleaning-transforming-facility-management"
    },
    {
      id: 4,
      title: "Smart Technology Revolutionizes Facility Security",
      date: "07/17/2025",
      excerpt: "This blog post explores how smart technology is revolutionizing facility security in the U.S., highlighting tools like AI video analytics, mobile access, cloud platforms, and IoT sensors that enhance safety, efficiency, and control. It examines the practical benefits and challenges of integrating these innovations into daily facility management, emphasizing cybersecurity and scalable upgrades.",
      image: heroImage,
      slug: "smart-technology-revolutionizes-facility-security"
    },
    {
      id: 5,
      title: "Automation Revolutionizes Commercial Cleaning Efficiency",
      date: "07/16/2025",
      excerpt: "Discover how automation is revolutionizing commercial cleaning in the U.S., with robotics, AI, and smart sensors reshaping facility hygiene. This blog explores how these innovations boost efficiency, reduce costs, enhance sustainability, and improve safety, while empowering staff through data-driven management and cyber-secure systems.",
      image: heroImage,
      slug: "automation-revolutionizes-commercial-cleaning-efficiency"
    },
    {
      id: 6,
      title: "Unlocking Energy Efficiency For Facilities",
      date: "07/15/2025",
      excerpt: "This blog post explores how US facility managers are driving sustainability through energy efficiency initiatives. It covers key trends like smart retrofits, IoT-based monitoring, and renewable energy adoption, while highlighting the role of advanced technologies such as AI and cloud platforms. The post also outlines best practices, practical steps for implementation, and strategies to stay ahead of evolving regulations—all aimed at reducing costs, boosting competitiveness, and achieving long-term sustainability goals.",
      image: heroImage,
      slug: "unlocking-energy-efficiency-for-facilities"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-resources-title">
              Resource Center
            </h1>
            <p className="text-xl text-white/90" data-testid="text-resources-subtitle">
              Industry insights, best practices, and innovations in commercial facility services
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <Card 
                key={article.id}
                className="hover-elevate active-elevate-2 overflow-hidden group"
                data-testid={`card-article-${article.id}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-article-${article.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm" data-testid={`text-date-${article.id}`}>{article.date}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl mb-3" data-testid={`text-title-${article.id}`}>
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-4" data-testid={`text-excerpt-${article.id}`}>
                    {article.excerpt}
                  </p>
                  <Button 
                    variant="default" 
                    className="w-full bg-[#0A5EB9] hover:bg-[#063970] text-white group"
                    asChild
                    data-testid={`button-read-more-${article.id}`}
                  >
                    <a href={`https://efsgnj.com/${article.slug}/`} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#0A5EB9] text-[#0A5EB9] hover:bg-[#0A5EB9] hover:text-white"
              data-testid="button-load-more"
              asChild
            >
              <a href="https://efsgnj.com/resources/#" target="_blank" rel="noopener noreferrer">
                Load More
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Transform Your Facility?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Discover how Excel Facility Services Group can deliver professional cleaning excellence for your enterprise facilities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="default"
                className="bg-[#97CC06] text-[#063970] border-[#97CC06]"
                data-testid="button-request-proposal"
              >
                REQUEST PROPOSAL
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
