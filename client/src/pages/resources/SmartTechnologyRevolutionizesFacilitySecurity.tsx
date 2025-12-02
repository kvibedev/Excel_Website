import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

export default function SmartTechnologyRevolutionizesFacilitySecurity() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedArticles = [
    {
      title: "Automation Revolutionizes Commercial Cleaning Efficiency",
      slug: "automation-revolutionizes-commercial-cleaning-efficiency",
      date: "July 16, 2025"
    },
    {
      title: "Unlocking Energy Efficiency For Facilities",
      slug: "unlocking-energy-efficiency-for-facilities",
      date: "July 15, 2025"
    },
    {
      title: "Green Cleaning Transforming Facility Management",
      slug: "green-cleaning-transforming-facility-management",
      date: "July 18, 2025"
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
              Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-article-title">
              Smart Technology Revolutionizes Facility Security
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">July 17, 2025</span>
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
                    Across facilities in the United States, smart technology is reshaping what security means for business owners and facility managers. In 2025, the pressure's increasing not just to deal with traditional physical threats, but to harness data, automation, and intelligent software that lifts your security performance to a new level. This evolving digital transformation makes it possible to monitor and manage everything—access, cameras, doors, or environmental controls—faster and, quite honestly, smarter than ever before. Knowing how to work these innovations into daily operations is rapidly becoming a necessity, not just a trend.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Smart Security Tech: What's in Play?</h2>
                  <p className="mb-6">
                    Modern security setups lean into systems like cloud-hosted dashboards, AI video analytics, mobile access control, and networked IoT sensors. Cloud platforms now put centralized oversight at your fingertips—meaning you can check several sites from one spot, whether you're on-site or remote. My personal practice with integrating a cloud system meant fewer blind spots since the setup gave me real-time data for all entry points. This alone cut down worries over missed incidents and night-time risks.
                  </p>

                  <p className="mb-6">
                    AI video analytics offers a major leap too. Instead of relying on someone just staring at the screens, smart cameras look out for odd behavior, automatically flag unfamiliar faces or vehicles, and trigger instant alerts. In one multi-tenant building I supported, this AI-driven video cut down false alarms and caught several real incidents managers probably would've missed otherwise. These tools honestly saved time and paid for themselves by reducing lost inventory and property damage.
                  </p>

                  <p className="mb-8">
                    Instead of giving everyone old keys or static cards, I moved facilities over to mobile credentials and even some biometrics where practical. This improved not just security (no more fuss over lost keys) but hygiene and convenience—particularly meaningful after 2020 made us rethink "touchless" solutions everywhere.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Building Automation and the Role of IoT</h2>
                  <p className="mb-6">
                    Smart security isn't just about who can open a door. IoT sensors now let managers control HVAC, lighting, and security doors all through one network. At locations I've consulted for, connecting facility systems improved not only safety (locking down automatically at night, tracking movement in real time), but it also brought energy savings since lights and equipment only run where truly needed. Relying on continuous IoT feeds meant I could act before problems spread—predictive maintenance tools would notify me if a camera or lock system slipped offline. Less emergency scrambling, more reliability.
                  </p>

                  <p className="mb-8">
                    But I've also learned the digital upgrades come with risk. Everything's a target for cyberthreats, so every upgrade included stronger encryption, software patching with no hesitation, and practical employee training against phishing or weak passwords. Without these steps, even the best physical tech leaves you exposed.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">How Smart Security Changes Facility Management</h2>
                  <p className="mb-6">
                    Centralizing operations with a Building Automation System, or integrating security with environmental controls, fundamentally changes my workflow. Unified monitoring means fewer scattered logins, quicker incident response, and easier reporting for compliance—critical as regulatory expectations get stricter each year. I've used these systems not just to spot trouble but to optimize routines—like syncing access control with janitorial cycles or leveraging analytics for predicting which zones get heavy foot traffic and when.
                  </p>

                  <p className="mb-6">
                    Scalable smart security has been a huge plus for budgets—installing upgrades bit by bit allowed me to modernize an old site without the shock of big upfront spend. Each new sensor or module worked alongside existing hardware, so there was no need to rip out what still worked.
                  </p>

                  <p className="mb-8">
                    Facilities across healthcare, logistics, and property sectors now roll out hybrid-cloud systems for flexibility—balancing privacy, control, and scalability. For mobile staff or solo workers, popular solutions like smartphone panic buttons offered me peace of mind that help's available at a tap and no one feels stuck alone when things go wrong.
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Real Steps: Boosting Security with Smart Tech</h2>
                  <p className="mb-6">
                    To really dial up security, my approach has become a checklist of smart moves. First, prioritize a hybrid-cloud solution—this gives centralized data and lets you expand as necessary, without getting boxed in by old systems. I wouldn't skip on AI video, particularly in busy or high-value locations, since it filters out those never-ending false alarms and keeps attention focused on what really matters.
                  </p>

                  <p className="mb-6">
                    Mobile and biometric access should be next if you're thinking about costs related to keys, time-wasting credential management, and making sure only approved users walk in. Integrating IoT controls—so HVAC, lights, and locks all talk to each other—is something that always proved a win for both security and energy use.
                  </p>

                  <p className="mb-6">
                    Make sure you never treat cybersecurity as just IT's job. Whether patching devices, using robust encryption, or teaching every staffer to avoid suspicious links—these are everyone's responsibility in a truly connected operation. I found iterative, modular investments—upgrading system-by-system—kept legacy pieces working while focusing new dollars where they matter most.
                  </p>

                  <p className="mb-8">
                    Finally, data analytics now built into smart platforms deliver insights I never knew I needed. Each quarter, I honestly challenge my practices—do heat maps show a shift in traffic, are after-hours access points ignored or overused, and can cleaning be optimized without sacrificing security?
                  </p>

                  <h2 className="text-3xl font-bold text-[#063970] mt-12 mb-6">Pushing Further: Exploring Smart Security</h2>
                  <p className="mb-8">
                    For anyone in U.S. facility management now, there are deep resources for taking your understanding and operations to newer heights. Dig into cloud deployment strategies, review AI case studies in settings like retail or health, and always check current cyber guidelines for your sector. Regulations and best practices, including those set out by EFSG, shift fast—regular reading and networking keeps your approach sharp and compliant.
                  </p>

                  <p className="mb-8">
                    Taking smart security seriously isn't a trend—it's a real, practical evolution of the profession. Whether you're retrofitting a single building or managing a vast property network, smarter solutions are here. They don't just reduce risk. It's about giving you the confidence for teams and those who visit that safety and efficiency go hand in hand—even when no one's watching.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#Security</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#SmartTech</span>
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
            Ready for Smart Security Solutions?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group integrates with modern security systems across 20+ states.
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
