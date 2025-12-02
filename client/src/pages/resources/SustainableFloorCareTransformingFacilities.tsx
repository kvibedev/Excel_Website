import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

export default function SustainableFloorCareTransformingFacilities() {
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
      title: "Green Cleaning Transforming Facility Management",
      slug: "green-cleaning-transforming-facility-management",
      date: "July 18, 2025"
    },
    {
      title: "Automation Revolutionizes Commercial Cleaning Efficiency",
      slug: "automation-revolutionizes-commercial-cleaning-efficiency",
      date: "July 16, 2025"
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
              Floor Care
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-article-title">
              Sustainable Floor Care Transforming Facilities
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">July 21, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span data-testid="text-read-time">6 min read</span>
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
                    Facility managers in industrial centers, warehouses, and manufacturing plants are realizing that floor care is about much more than simply keeping up appearances. Keeping floors durable and hygienic while reducing environmental impact is now critical. Modern industrial spaces face tough wear from machines, heavy foot traffic, and constant use—so it's essential to shift toward sustainable floor care solutions that protect facilities, workers, and the environment at the same time.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">The Shift Toward Greener Methods</h2>
                  <p className="mb-6">
                    Industrial spaces that once depended on harsh chemicals for cleaning are switching to more eco-friendly routines. Facility managers are choosing cleaning products that are non-toxic, biodegradable, and certified by groups like Green Seal or the EPA's Safer Choice. They choose these because they cut staff exposure to hazardous fumes, limit indoor air pollution, and reduce runoff that harms local waterways. Even the equipment is different now—with many sites using vacuums, scrubbers, and other machines designed to save electricity and cut down water use.
                  </p>

                  <p className="mb-8">
                    Microfiber mops and towels have become popular since they grab dust and dirt with much less need for chemicals. Some facilities add low-water scrubbers and floor coatings that release hardly any harmful VOCs, making both the air and the floors healthier. Routines are changing too; more teams rely on regular light cleaning, quick spot-checks, and planned preventive maintenance so there's less need for those tough, resource-intensive deep cleans that dominated the past.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Sector-Specific Solutions</h2>
                  <p className="mb-6">
                    Every industrial space has its own needs. In high-traffic centers where the flooring gets pounded by forklifts, eco-friendly coatings such as water-based epoxies or polyaspartics are getting popular. These last long and don't stink up the air with pollution, plus some engineered new concretes, like MEGASLAB, can actually cut a facility's CO2 emission footprint nearly in half. Recent government regulations and corporate social responsibility goals are pushing even more managers to seek greener options fast.
                  </p>

                  <p className="mb-6">
                    Manufacturing plants tend to focus on air quality and worker health. Non-toxic, chemical-free cleaning methods like dry carpet care remove dirt and allergens, helping employees breathe easier and avoid unnecessary chemical contact during work. Many plants customize their schedules so the dirtiest spots get the most attention and low-traffic areas are done less often. Fast, residue-free cleaning techniques mean production lines get back up and going without risking health or missing deadlines.
                  </p>

                  <p className="mb-8">
                    Warehouses and distribution centers face relentless dirt and abuse, so any new sustainable option must hold up under pressure. Eco-friendly coatings and advanced concretes now resist damage from chemicals, equipment, and traffic just as well—or better—than traditional finishes. These products sometimes cost more up front, but since they reduce breakdowns, last longer, and want less labor, most facilities see costs fall over time.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Best Practices and Leading Brands</h2>
                  <p className="mb-6">
                    Good intentions only go so far—real progress means facility teams put their money into supplies and equipment with proven sustainability credentials. Managers now check every new supply order for labels like Green Seal, ECOLOGO, or EPA Safer Choice. They also look for new technology, like scrubbers that waste less water or vacuum cleaners with top-notch HEPA filtration to catch extra dust.
                  </p>

                  <p className="mb-8">
                    Leaders in sustainable floor care include MilliCare, SaniGLAZE, Husky Coatings, and Green Clean Commercial. These companies have earned their stripes through certified green products made for tough industrial demands. But your system matters, too: training every cleaning crew about safe chemical handling, equipment use, and waste reduction is key. Facilities can connect sustainable practices to their public images by highlighting green cleaning achievements in RFPs or new business bids. Showing your building's clean green record might even keep you ahead of changing regulations and client expectations.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Steps for Action</h2>
                  <p className="mb-6">
                    If your facility is ready to go greener, start by switching to certified green cleaning solutions. Don't grab any "eco" product off a shelf—look for the right credentials. Upgrade tools to microfiber mops or energy-saving vacuums and set up regular, lighter cleaning so you cut back on big, disruptive cleanings that use tons of chemicals and water. For major upgrades or new floors, pick coatings and concrete that are low-VOC or specially engineered to be tough and earth-friendly.
                  </p>

                  <p className="mb-8">
                    Take the time to teach staff about sustainable routines. Using technology like low-water scrubbers or chemical-free techniques only really saves money and resources when teams know the best way to use them. When evaluating products, always double check the long-term costs—many facilities discover that sustainable tools pay for themselves, both through fewer replacement needs and more reliable long-term results. And don't keep these wins quiet: when you hire cleaning partners or pitch to new clients or investors, showcase your green policies to stand out.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Where to Go Next</h2>
                  <p className="mb-8">
                    The field of sustainable floor care keeps changing, and there are plenty of ways to push your operations further. You might want to study exactly how much those new concrete solutions shrink your facility's carbon footprint. Maybe it's worth comparing high-traffic sustainable coatings with the old options—not just for cost, but for worker safety too. Large manufacturers can investigate how robots or totally chemical-free scrubbers perform during real workdays and if they keep floors as spotless as promised.
                  </p>

                  <p className="mb-8">
                    Another big opportunity sits in customized cleaning schedules. When facilities dial in the ideal maintenance frequency for each zone, they cut waste in staff time, materials, and dollars. These focused schedules not only save money but might actually help your organization boost productivity and set new benchmarks for sustainability. Pushing into these research areas means you can deliver strong improvements for both your business and the surrounding environment.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#sustainable</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#floorcare</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#industrial</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#maintenance</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#ecoproducts</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#environment</span>
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
            Ready for Sustainable Floor Care?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group delivers eco-friendly floor care solutions across 20+ states.
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
