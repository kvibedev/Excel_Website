import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost as BlogPostType } from "@shared/schema";
import BlogSidebar from "@/components/blog/BlogSidebar";

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatDate(dateStr: string | Date | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-3xl font-bold text-[#063970] mt-12 mb-6">
          {trimmed.slice(3)}
        </h2>
      );
    } else {
      elements.push(
        <p key={key++} className="mb-6">
          {trimmed}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ["/api/blog", params.slug],
  });

  const { data: allPosts } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog"],
  });

  if (error) {
    return (
      <div>
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
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-[#063970] mb-4" data-testid="text-error-title">Article Not Found</h1>
            <p className="text-muted-foreground mb-8" data-testid="text-error-message">
              The article you're looking for doesn't exist or may have been removed.
            </p>
            <Link href="/resources">
              <Button variant="default" className="bg-[#063970]" data-testid="button-back-to-resources">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (isLoading || !post) {
    return (
      <div>
        <div className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4">
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
        <section className="relative h-[400px] flex items-center justify-center bg-[#063970]">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-10 w-32 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-6 w-48 mx-auto bg-white/20" />
          </div>
        </section>
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                </div>
                <div className="lg:col-span-1">
                  <Skeleton className="h-40 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const relatedArticles = (allPosts || [])
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      date: formatDate(p.publishedAt),
    }));

  const readTime = estimateReadTime(post.content);
  const tags = post.tags
    ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div>
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} on the Excel Facility Services Group blog.`}
        path={`/resources/${post.slug}`}
      />
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

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {post.category && (
              <div
                className="inline-block px-4 py-2 bg-[#97CC06] text-[#063970] text-sm font-bold rounded-full mb-4"
                data-testid="badge-category"
              >
                {post.category}
              </div>
            )}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              data-testid="text-article-title"
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-6 justify-center items-center text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span data-testid="text-publish-date">{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span data-testid="text-read-time">{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  {post.excerpt && (
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                  )}
                  {renderContent(post.content)}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                      <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>

              <div className="lg:col-span-1">
                <BlogSidebar relatedArticles={relatedArticles} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Transform Your Facility?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
            Excel Facility Services Group delivers professional cleaning excellence across 20+ states.
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
