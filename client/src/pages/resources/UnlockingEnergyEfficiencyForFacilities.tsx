import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

export default function UnlockingEnergyEfficiencyForFacilities() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    {
      title: "Green Cleaning Transforming Facility Management",
      slug: "green-cleaning-transforming-facility-management",
      date: "July 18, 2025"
    },
    {
      title: "Smart Technology Revolutionizes Facility Security",
      slug: "smart-technology-revolutionizes-facility-security",
      date: "July 17, 2025"
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
              Sustainability
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-article-title">
              Unlocking Energy Efficiency For Facilities
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">July 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span data-testid="text-read-time">7 min read</span>
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
                    Sustainability has quickly become a central focus for facility managers across the United States. What used to be just about keeping up with regulations is now a drive toward real efficiency and resilience in business operations. The shift is obvious—environmental, social, and governance (ESG) standards put energy strategy in the spotlight. Now, energy efficiency is no longer just a "good to have". It's necessary for staying competitive, controling operating costs, and meeting growing demands from both regulators and customers.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Key Trends in Energy Management</h2>
                  <p className="mb-6">
                    These days, US facilities are doubling down on smarter energy management tricks. Energy retrofits are high on the list—think a lot of LED lighting swaps, better HVAC systems, tighter insulation, and automated occupancy controls. Rather than waiting for old systems to break, teams turn to sensors and connected controls to monitor building performance. The technology, mostly built around the Internet of Things (IoT), tracks vital stats like heating, ventilation, air conditioning, and plug loads all at once and in real time. Lots of facilities now realize that this smart upgrade saves way more than it costs over time at scale.
                  </p>

                  <p className="mb-8">
                    The search for sustainability often goes hand in hand with renewable energy. More and more places have started looking closer at solar arrays, small wind turbines, and even using ground heat with geothermal. Water-saving moves also are on everyone's radar, with things like low-flow faucets, automated leak sensors, and capturing rainwater getting really common, especially in big buildings. There's another tough motivator—local and state laws are now pushing for required upgrades, not just suggesting them. This forces owners to boost their energy game whether they are ready or not.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">How Technology Gives Facilities an Edge</h2>
                  <p className="mb-6">
                    Advanced technologies are making a real dent in energy waste. Artificial intelligence and machine learning are all over predictive maintenance today—they help catch problems with HVAC or lighting way before anything shuts down or runs up a big utility bill. Smart sensors instantly adjust lights or the AC depending on when and where people actually are working, rather than following strict schedules. Cloud-driven platforms have become popular too, so managers can check real-time stats, compare sites, and make quick calls from anywhere.
                  </p>

                  <p className="mb-8">
                    This whole arsenal of tech helps facility managers squeeze more out of every kilowatt hour. Especially with hybrid work making offices half-full some days and packed the next, automated controls never stop adapting. That sort of reactive, data-based management just wasn't possible back when everything was done by hand or clock.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Best Practices for Achieving Efficiency</h2>
                  <p className="mb-6">
                    The path to energy efficiency usually begins with a good old fashioned facility energy audit. Software and sensors can pinpoint where energy is leaking—wasting money on dated lighting, subpar insulation, or old HVAC. The results make it clear which jobs need to get done first for the fastest impact.
                  </p>

                  <p className="mb-8">
                    Forward-thinking organizations are building what's called "decarbonization roadmaps." They map future emissions targets and lay out each step (like lighting upgrades, insulation, or installing solar) in an achievable way. Data analytics isn't just a buzzword—it genuinely helps schedule upgrades, predict when parts might fail, and give insight into how building space is actually being used. Capital planning and asset life-cycles benefit from this, and resource usage is cut down nearly across the board. As a bonus, certifications like LEED and WELL help formalize your efforts and can boost both reputation and property value.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Practical Steps Facility Leaders Should Take</h2>
                  <p className="mb-6">
                    Leaders can make the most progress if they start with the basics: doing regular audits, then rolling out upgrades for lights, insulation, and air systems in phases. As they do this, it pays to chase green building certifications at the same time—it makes spaces more attractive for buyers and tenants.
                  </p>

                  <p className="mb-6">
                    It's smart to prioritize controls and monitoring tech that work together, tightening up every system to avoid unnecessary use. If possible, investing in on-site renewables should be next—solar panels or geothermal set-ups have proven their worth for cutting costs and staying inside stricter energy laws. Labor may be another roadblock, so ongoing training and using remote or managed service vendors might be crucial as technology advances faster than labor supply.
                  </p>

                  <p className="mb-8">
                    Facility teams should lean hard on data platforms to track how they stack up against the goals. Honest reporting to leadership keeps everyone accountable and can help defend investments, especially as regulations shift quickly. It's not enough just to do what's always been done—with new fines and emissions mandates, it's risky to skip this step.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Opportunities for Deeper Gains</h2>
                  <p className="mb-6">
                    For site leaders ready to go further, take the time to look closely at facility management system options. It's worth comparing mainstream vendors, weighing what their analytics and controls actually deliver. Reviewing current facility ops side-by-side with LEED or WELL criteria can highlight strengths, but also flag where more upgrades are really needed, especially before any building sale or big tenant change.
                  </p>

                  <p className="mb-8">
                    Tracking state or city policies is getting harder but is almost always necessary, since requirements jump around so much. Being proactive, benchmarking facilities well above the minimum, and staying flexible often puts teams ahead of new rules as soon as they land.
                  </p>

                  <p className="mb-8">
                    One thing is clear: sustainability isn't just a buzzword for corporate PR anymore. For US facility managers, it's a competitive requirement, as well as a responsibility. By blending smart tech investments, data-driven strategy, and ongoing training, facility teams will position their buildings for both lower operating costs and greater brand strength.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#Sustainability</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#EnergyEfficiency</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#EFSG</span>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Share */}
                  <div className="bg-[#97CC06]/10 rounded-xl shadow-md p-6 mb-6">
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
                  <div className="bg-[#97CC06]/10 rounded-xl shadow-md p-6">
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
            Ready for Energy-Efficient Facilities?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group delivers sustainable facility solutions across 20+ states.
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
