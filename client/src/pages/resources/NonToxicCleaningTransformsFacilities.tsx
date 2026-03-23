import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";
import BlogSidebar from "@/components/blog/BlogSidebar";

export default function NonToxicCleaningTransformsFacilities() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    {
      title: "Sustainable Floor Care Transforming Facilities",
      slug: "sustainable-floor-care-transforming-facilities",
      date: "July 21, 2025"
    },
    {
      title: "Green Cleaning Transforming Facility Management",
      slug: "green-cleaning-transforming-facility-management",
      date: "July 18, 2025"
    },
    {
      title: "Smart Technology Revolutionizes Facility Security",
      slug: "smart-technology-revolutionizes-facility-security",
      date: "July 17, 2025"
    }
  ];

  return (
    <div>
      <SEO
        title="Non-Toxic Cleaning Transforms Facilities"
        description="How non-toxic cleaning solutions are transforming facility management through sustainable, health-conscious practices."
        path="/resources/non-toxic-cleaning-transforms-facilities"
      />
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
              Non Toxic Cleaning Transforms Facilities
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">July 22, 2025</span>
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
                    Sustainability is shaking up the way property managers, facility teams, and cleaning contractors work. These days, almost everybody in facility management is under pressure to reduce environmental impact, but doing it responsibly means more than swapping out a couple cleaning sprays. Non-toxic cleaning solutions are at the center of this major change, with their ability to support both human health and long-term maintenance goals for any kind of building. With new rules, rising demands from tenants, and better products arriving on the market, green cleaning is quickly becoming essential for anyone managing buildings or cleaning services.
                  </p>

                  <p className="mb-8">
                    As the cleaning industry keeps evolving, companies and contractors have to consider not just what works best for cleaning floors, bathrooms, or offices, but also which options offer the lowest toxicity and best sustainability. Now, they can no longer ignore the risks or reputation costs of strong chemicals such as bleach, ammonia, or PFAS. This focus ripples through day-to-day operations, contracts, and budget choices alike.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Why Non-Toxic Products Matter</h2>
                  <p className="mb-6">
                    Switching to non-toxic cleaning products has huge effects both inside and outside a building. Biodegradable and enzyme-based cleaners are rapidly replacing old-fashioned cleaning chemicals. The difference is real: eco-friendly products help cut down on indoor air pollution, stop toxic runoff from entering local water, and lower health risks for those working inside and around the building. Especially for big corporate offices and industrial facilities, the demand to show measurable, "green" improvements is causing managers to review every cleaning product and ask if it's really non-toxic.
                  </p>

                  <p className="mb-8">
                    This push isn't guesswork—it's happening because more cities and states now limit certain chemicals, while investors are checking up on ESG ("Environmental, Social, and Governance") performance. Many building owners won't even consider cleaning vendors that can't show Green Seal, EcoLogo, or EPA certifications. As a result, even older buildings are moving fast to phase out products with harsh ingredients, and entire floor care programs are being rebuilt around safe, low-VOC alternatives. That safety-first approach also pays off by reducing insurance claims, legal problems, or staff absences tied to chemical exposure.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Technology and Smart Cleaning</h2>
                  <p className="mb-6">
                    Green cleaning is not just about a product swap—it includes big leaps from new tools and smart tech. Energy-efficient vacuums and waterless carpet systems help lower both operating costs and environmental burden. AI scheduling software and IoT (internet-connected) sensors let teams track how much product or energy is wasted—and fix it on the fly. In the field, new enzyme-powered floor scrubbers and auto-dispensing cleaning machines deliver powerful results with way fewer chemicals and much less water.
                  </p>

                  <p className="mb-8">
                    Some properties have even started using low-flow equipment and refillable product containers, which means less waste gets sent to the landfill. What used to look like science fiction is now showing up in everyday work routines. Floorcare, once ruled by strong strippers and solvents, has become a front line for innovation. Careful monitoring and better hardware mean fewer harsh chemicals go down the drain and air stays cleaner in the room.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Real Impacts for Facilities and Contractors</h2>
                  <p className="mb-6">
                    The shift to eco-friendly cleaning has direct impacts for corporate, industrial, and property management teams. Leasing a building sometimes depends on showing real improvements in cleaning and air quality. Schools, hospitals, and senior care facilities, with their unique risks, have made non-toxic products mandatory. Real estate managers see tenant satisfaction go up and turnover fall when green cleaning programs are in place. Even on the bottom line, switching costs don't have to be high—there are now affordable alternatives, especially if you purchase concentrates, install refill stations, or rethink your use of disposable wipes and packaging.
                  </p>

                  <p className="mb-8">
                    Cleaning contractors must adjust quickly or lose business to those with up-to-date green certifications. Extra training is expected, covering how to properly use, store, and handle safer cleaning products, so everyone stays in line with the latest rules. Many teams report that learning to use greener chemicals often makes their jobs safer and better, not just for them but for the property too. For companies, showing clients detailed reports about reduced chemical use, better safety, and certifications offer a clear advantage when bids come up.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Steps for a Greener Cleaning Program</h2>
                  <p className="mb-6">
                    If you're trying to overhaul your cleaning approach, there are a handful of quick wins to focus on. First: pick only certified non-toxic products (look for Green Seal, EcoLogo, or EPA Safer Choice on the label). Second: use smart devices to check for overuse of water or cleaners so you don't waste money or wreck the environment by mistake. Third: provide regular training—switching products isn't enough if the team isn't taught the best ways to use and store them safely and efficiently.
                  </p>

                  <p className="mb-8">
                    Fourth: update your policies to encourage refillable packaging and concentrated solutions, not single-use bottles or wipes. This step doesn't just help you look good for audits—it really cuts your footprint. Fifth: if your property gets regular visitors or has high turnover (like apartments or offices), make sure your new practices are visible and clearly messaged. Let applicants, guests, and workers know you care—and why this makes their building safer to stay in.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Preparing for the Future</h2>
                  <p className="mb-8">
                    The future of facilities will demand even more non-toxic, low-impact strategies. Managers need to stay flexible and keep learning as the best products, certifications, and equipment options change every year. The push for sustainability isn't fading—it will only get stronger, pushed along by health research, regulations, and rising expectations in every sector from office parks to senior living. Teaming up with organizations for industry training or benchmarking your efforts against LEED can keep you ahead of competitors and help you make smarter purchasing choices. Few "trends" become permanent, but this shift clearly is: non-toxic cleaning is here to stay, and the sooner you move, the better off your property—and its people—will be.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#nontoxic</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#cleaning</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#floorcare</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#greenproducts</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#facilitymanagement</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#sustainability</span>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar relatedArticles={relatedArticles} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
            Ready for Non-Toxic Cleaning Solutions?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group delivers sustainable, eco-friendly cleaning services across 20+ states.
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
