import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { Calendar, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { BlogPost } from "@shared/schema";
import Markdown from "react-markdown";
import BlogSidebar from "@/components/blog/BlogSidebar";

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatDate(date: string | Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getVideoEmbed(url: string | null | undefined): { src: string; title: string } | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const yt = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  if (yt && yt[1]) {
    return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}`, title: "YouTube video player" };
  }

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo && vimeo[1]) {
    return { src: `https://player.vimeo.com/video/${vimeo[1]}`, title: "Vimeo video player" };
  }

  return null;
}

function splitAfterFirstParagraph(markdown: string): { first: string; rest: string } {
  const trimmed = markdown.replace(/^\s+/, "");
  const idx = trimmed.search(/\n\s*\n/);
  if (idx === -1) return { first: trimmed, rest: "" };
  return { first: trimmed.slice(0, idx), rest: trimmed.slice(idx) };
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
  });

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  useEffect(() => {
    if (!post || !slug) return;
    if (typeof window === "undefined") return;

    const sessionKey = `efsg_bv_tracked_${slug}`;
    const SESSION_ID_KEY = "efsg_bv_sid";
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    if (!sessionId) {
      const bytes = new Uint8Array(18);
      window.crypto.getRandomValues(bytes);
      sessionId = btoa(String.fromCharCode(...bytes)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    let cancelled = false;
    let viewId: number | null = null;
    const startedAt = Date.now();
    let lastSent = 0;

    const alreadyTracked = sessionStorage.getItem(sessionKey);
    if (alreadyTracked) {
      const parsed = parseInt(alreadyTracked);
      if (Number.isFinite(parsed) && parsed > 0) viewId = parsed;
    }

    const sendBeacon = (timeMs: number) => {
      if (!viewId || timeMs <= lastSent + 1000) return;
      lastSent = timeMs;
      const payload = JSON.stringify({ viewId, timeOnPageMs: timeMs });
      const url = `/api/blog/${encodeURIComponent(slug)}/view/heartbeat`;
      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon(url, blob);
          return;
        }
      } catch {}
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        credentials: "include",
        keepalive: true,
      }).catch(() => {});
    };

    const trackView = async () => {
      if (viewId) return;
      try {
        try {
          const meRes = await fetch("/api/admin/me", { credentials: "include" });
          if (meRes.ok) {
            const me = await meRes.json();
            if (me?.authenticated) return;
          }
        } catch {}
        if (cancelled) return;
        const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/view`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referrer: document.referrer || "", sessionId }),
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data?.viewId) {
          viewId = data.viewId;
          sessionStorage.setItem(sessionKey, String(viewId));
        }
      } catch {}
    };

    trackView();

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendBeacon(Date.now() - startedAt);
      }
    };
    const onPageHide = () => sendBeacon(Date.now() - startedAt);
    const intervalId = window.setInterval(() => sendBeacon(Date.now() - startedAt), 30000);

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.clearInterval(intervalId);
      sendBeacon(Date.now() - startedAt);
    };
  }, [post, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A5EB9]" data-testid="loading-spinner" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[#063970]" data-testid="text-not-found">Article Not Found</h1>
        <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/resources">
          <Button variant="default" data-testid="button-back-resources">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
        </Link>
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
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const videoEmbed = getVideoEmbed(post.videoUrl);
  const { first: firstParagraph, rest: restContent } = videoEmbed
    ? splitAfterFirstParagraph(post.content)
    : { first: post.content, rest: "" };

  return (
    <div>
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} on Excel Facility Services Group's resource center.`}
        path={`/resources/${post.slug}`}
        image={post.imageUrl || undefined}
        type="article"
        publishedTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}
        author={post.author}
        keywords={post.tags || undefined}
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
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : null}
        <div className={`absolute inset-0 ${post.imageUrl ? "bg-gradient-to-br from-[#063970]/95 via-[#0A5EB9]/90 to-[#063970]/85" : "bg-gradient-to-br from-[#063970] via-[#0A5EB9] to-[#063970]"}`}></div>
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
                {post.imageUrl && (
                  <div
                    className="mb-10 overflow-hidden rounded-xl shadow-md"
                    data-testid="img-featured-wrapper"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                      loading="eager"
                      decoding="async"
                      data-testid="img-featured"
                    />
                  </div>
                )}
                <article className="prose prose-lg max-w-none prose-headings:text-[#063970] prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4">
                  {videoEmbed ? (
                    <>
                      <Markdown>{firstParagraph}</Markdown>
                      <div
                        className="my-10 overflow-hidden rounded-xl shadow-md bg-black"
                        style={{ aspectRatio: "16 / 9" }}
                        data-testid="video-embed-wrapper"
                      >
                        <iframe
                          src={videoEmbed.src}
                          title={videoEmbed.title}
                          className="w-full h-full"
                          loading="lazy"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          data-testid="video-embed-iframe"
                        />
                      </div>
                      {restContent && <Markdown>{restContent}</Markdown>}
                    </>
                  ) : (
                    <Markdown>{post.content}</Markdown>
                  )}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
                      <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                      {tags.map((tag) => (
                        <span
                          key={tag}
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
