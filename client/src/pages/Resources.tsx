import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";
import heroImage from "@assets/greensealimg1_1764255375424.webp";

function formatDate(dateStr: string | Date | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function Resources() {
  const { data, isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const posts = data || [];

  return (
    <div>
      <SEO
        title="Resources"
        description="Insights and articles on commercial cleaning, green practices, facility management, and industry trends from Excel Facility Services Group."
        path="/resources"
      />
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#063970]/95 via-[#0A5EB9]/90 to-[#063970]/85"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-[#97CC06]/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-[#97CC06] font-semibold text-sm uppercase tracking-wide" data-testid="text-resources-badge">
                Insights & Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" data-testid="text-resources-title">
              Resource Center
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed" data-testid="text-resources-subtitle">
              Industry insights, best practices, and innovations in commercial facility services
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                <span className="text-sm">Sustainability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                <span className="text-sm">Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#97CC06] rounded-full"></div>
                <span className="text-sm">Best Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#063970] mb-4" data-testid="text-featured-title">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert perspectives on commercial cleaning, sustainability, and facility management
            </p>
          </div>

          {isError ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">Unable to load articles right now. Please try again later.</p>
              <Button
                variant="default"
                className="bg-[#063970]"
                onClick={() => window.location.reload()}
                data-testid="button-retry-load"
              >
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <Skeleton className="h-80 w-full" />
                    <div className="p-8 space-y-4">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                    <Skeleton className="h-56 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground" data-testid="text-no-posts">No articles published yet. Check back soon for insights on facility management.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {posts.slice(0, 2).map((article) => (
                  <Link href={`/resources/${article.slug}`} key={article.id}>
                    <div
                      className="group hover-elevate active-elevate-2 bg-white rounded-xl overflow-visible shadow-lg h-full"
                      data-testid={`card-featured-article-${article.id}`}
                    >
                      <div className="relative h-80 overflow-hidden rounded-t-xl">
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#063970] to-[#0A5EB9]"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        {article.category && (
                          <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 bg-[#97CC06] text-[#063970] text-sm font-bold rounded-full" data-testid={`badge-category-${article.id}`}>
                              {article.category}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#0A5EB9]" />
                            <span data-testid={`text-date-${article.id}`}>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#0A5EB9]" />
                            <span data-testid={`text-readtime-${article.id}`}>{estimateReadTime(article.content)}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#063970] mb-4 group-hover:text-[#0A5EB9] transition-colors leading-tight" data-testid={`text-title-${article.id}`}>
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-excerpt-${article.id}`}>
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-[#0A5EB9] font-semibold group-hover:gap-4 transition-all">
                          <span>Read Article</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {posts.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(2).map((article) => (
                    <Link href={`/resources/${article.slug}`} key={article.id}>
                      <div
                        className="group hover-elevate active-elevate-2 bg-white rounded-xl overflow-visible shadow-md h-full"
                        data-testid={`card-article-${article.id}`}
                      >
                        <div className="relative h-56 overflow-hidden rounded-t-xl">
                          {article.imageUrl ? (
                            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#063970] to-[#0A5EB9]"></div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                          {article.category && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-[#97CC06] text-[#063970] text-xs font-bold rounded-full" data-testid={`badge-category-${article.id}`}>
                                {article.category}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#0A5EB9]" />
                              <span data-testid={`text-date-${article.id}`}>{formatDate(article.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#0A5EB9]" />
                              <span data-testid={`text-readtime-${article.id}`}>{estimateReadTime(article.content)}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-[#063970] mb-3 group-hover:text-[#0A5EB9] transition-colors leading-tight" data-testid={`text-title-${article.id}`}>
                            {article.title}
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed" data-testid={`text-excerpt-${article.id}`}>
                            {article.excerpt}
                          </p>

                          <div className="flex items-center gap-2 text-[#0A5EB9] font-semibold text-sm group-hover:gap-3 transition-all">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#97CC06] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" data-testid="text-cta-title">
            Ready to Transform Your Facility?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white/95" data-testid="text-cta-subtitle">
            Discover how Excel Facility Services Group can deliver professional cleaning excellence for your enterprise facilities across 20+ states.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="default"
                className="bg-[#97CC06] hover:bg-[#97CC06]/90 text-[#063970] border-2 border-[#97CC06] text-lg px-8 py-6 h-auto font-bold shadow-xl"
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
