import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

export default function GreenCleaningTransformingFacilityManagement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    {
      title: "Non Toxic Cleaning Transforms Facilities",
      slug: "non-toxic-cleaning-transforms-facilities",
      date: "July 22, 2025"
    },
    {
      title: "Sustainable Floor Care Transforming Facilities",
      slug: "sustainable-floor-care-transforming-facilities",
      date: "July 21, 2025"
    },
    {
      title: "Unlocking Energy Efficiency For Facilities",
      slug: "unlocking-energy-efficiency-for-facilities",
      date: "July 15, 2025"
    }
  ];

  return (
    <div>
      {/* Back Navigation */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <Link href="/resources">
            <button 
              className="flex items-center gap-2 text-[#0A5EB9] hover:text-[#063970] transition-colors"
              data-testid="button-back-resources"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold">Back to Resources</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/95 via-[#0A5EB9]/90 to-[#063970]/85"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-[#97CC06] text-[#063970] text-sm font-bold rounded-full mb-4" data-testid="badge-category">
              Sustainability
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-article-title">
              Green Cleaning Transforming Facility Management
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">July 18, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span data-testid="text-read-time">5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    Facility management is seeing big changes as more companies trade toxic cleaning chemicals for greener and safer alternatives. Facility managers today can't really ignore the growing pressure to step up sustainability, partly because of tougher rules on things like PFAS and also because people are paying more attention to what's in the air they breathe inside buildings. It's not just about meeting the latest compliance requirement, either—there's a real drive to protect occupant health and show that your building cares about the planet. A focus on green cleaning isn't just a bonus for a facility anymore, it's basically a necessity.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Trends Fueling Green Cleaning</h2>
                  <p className="mb-6">
                    Most facilities are moving away from harsh, old-school products to options that are bio-based and a lot gentler for both people and the environment. Many managers are swapping in non-toxic, plant-based cleaners and even enzyme-based solutions, with some sites totally removing PFAS-type chemicals due to stricter bans. And it's not just the cleaning liquids—now you've got energy-smart vacuums, water-saving scrubbers, and even some cleaning robots entering the scene, helping to cut operational costs and shrink a facility's total environmental impact.
                  </p>

                  <p className="mb-8">
                    Certifications are getting more important, too. Buildings following LEED, Green Seal, or WELL standards stand out in today's marketplace and often have an easier time attracting tenants or clients that want a clear sustainability profile. These changes mean that today's cleaning teams need continuous training to keep up—not just in the products they use, but in smarter, more efficient methods for floor care and overall maintenance.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Sector-Specific Advantages</h2>
                  <p className="mb-6">
                    Each facility type has its own green cleaning playbook now. In commercial properties, easy upgrade steps like using microfiber mops and switching to water-based floor finishes mean less chemical and water waste. These buildings can maintain hygiene without hammering the environment or stretching resources. Offices are tackling air quality issues with low-VOC cleaners to keep people healthier and even see fewer sick days. Management is making staff education a recurring routine—it's kinda expected that everyone gets trained in sustainable floor care and safe material handling.
                  </p>

                  <p className="mb-8">
                    Industrial operations face the harshest scrutiny when it comes to regulations, which just pushes them harder to integrate energy-saving equipment and thorough, regular maintenance schedules. Predictive cleaning strategies work well in these tough, high-traffic spaces, helping reduce both pollution and compliance headaches.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Benefits Beyond Green PR</h2>
                  <p className="mb-6">
                    There's more to green cleaning than just looking good on paper. Healthier air and non-toxic floors lead to fewer headaches, literally and figuratively, for everyone living or working in the building. Biodegradable and plant-based products seriously cut landfill waste and stop toxic runoff. Investing in energy- and water-efficient machines doesn't just keep bills down; it can also help a company achieve public sustainability targets.
                  </p>

                  <p className="mb-8">
                    Companies notice a difference in staff morale, too, when people are shown how to use less-harmful cleaning supplies or given responsibility in the facility's green mission. Preventive routines—like regular sweeping and quick spot cleaning—prolong floor quality and further cut chemical usage, letting the facility avoid expensive and harsh deep cleans except when totally necessary.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Action Steps for Facility Leaders</h2>
                  <p className="mb-6">
                    If you're looking to be ahead in green cleaning, the actual process is more about steady change than any huge overhaul overnight. Choose certified, non-toxic cleaning products first—look out for trusted badges like EPA Safer Choice or Green Seal. Revamp your gear, switching out old inefficient tools for machines that use less water and electricity.
                  </p>

                  <p className="mb-6">
                    Don't skimp on regular team training. It's key for making sure people use the right products, follow safe routines, and stay aligned with the latest sustainability regulations. Work with cleaning partners ready to offer flexible, eco-focused solutions and have proof that their methods really work in similar environments.
                  </p>

                  <p className="mb-8">
                    Keep communication lines open with everyone who uses or visits the facility. Being open about your efforts in green cleaning builds trust and gets staff and visitors engaged with your goals. That way, sustainability becomes woven into the culture, not just a checklist item.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Future-Proofing with Innovation</h2>
                  <p className="mb-6">
                    There's really no slowing down on green trends—facility managers have to keep watching new laws on harmful chemicals and fit their programs to match the latest standards. Tech will play a bigger role too. Smart equipment lets you monitor air quality and floor health in real time while automation tools handle repetitive tasks so teams can focus on more complex issues.
                  </p>

                  <p className="mb-8">
                    Don't hesitate to ask vendors for case studies so you can see real results from other facilities that made the green switch. Benchmarking your cleaning plans against the best-in-class sustainable buildings provides a practical guide to step up your own program. And if you can, enroll in workshops or work towards professional certifications—these efforts make it clear you're dedicated to building and maintaining truly health-focused, eco-friendly spaces.
                  </p>

                  <p className="mb-8">
                    Unlocking the power of green cleaning gives your facility an edge, preparing it for changes in rules, rising tenant expectations, and ongoing demands for accountability. Running greener operations means cleaner air, safer workspaces, smarter budgets, and a reputation that helps the business stand taller long-term. Upgrading your cleaning habits today basically sets your facility up for tomorrow's biggest sustainability wins.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#greencleaning</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#sustainability</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#facilitycare</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#ecofriendly</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#nontoxic</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#floorcare</span>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Share */}
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h3 className="text-lg font-bold text-[#063970] mb-4" data-testid="text-share-title">Share Article</h3>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      data-testid="button-share"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-[#063970] mb-6" data-testid="text-related-title">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedArticles.map((article, index) => (
                        <Link href={`/resources/${article.slug}`} key={index}>
                          <div 
                            className="group hover-elevate active-elevate-2 p-4 rounded-lg border border-gray-200"
                            data-testid={`card-related-${index + 1}`}
                          >
                            <h4 className="font-semibold text-[#063970] group-hover:text-[#0A5EB9] transition-colors mb-2 leading-snug" data-testid={`text-related-title-${index + 1}`}>
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span data-testid={`text-related-date-${index + 1}`}>{article.date}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
            Ready for Green Cleaning Solutions?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group delivers sustainable cleaning services across 20+ states.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="default"
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-[#063970] border-2 border-[#97CC06] text-lg px-8 py-6 h-auto font-bold"
                data-testid="button-request-proposal"
              >
                REQUEST PROPOSAL
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 text-lg px-8 py-6 h-auto font-bold"
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
