import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Share2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RelatedArticle {
  title: string;
  slug: string;
  date: string;
}

interface BlogSidebarProps {
  relatedArticles: RelatedArticle[];
}

export default function BlogSidebar({ relatedArticles }: BlogSidebarProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast({ title: "Link copied!", description: "The article link has been copied to your clipboard." });
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast({ title: "Unable to copy", description: "Please copy the URL from your browser's address bar.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="sticky top-24">
      {/* Share */}
      <div className="bg-[#97CC06]/80 rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-[#063970] mb-4" data-testid="text-share-title">Share Article</h3>
        <Button 
          variant="outline" 
          className="w-full border-2 bg-white hover:bg-[#063970] hover:text-white hover:border-[#063970] transition-colors"
          data-testid="button-share"
          onClick={handleShare}
        >
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
          {copied ? "Copied!" : "Share"}
        </Button>
      </div>
      {/* Related Articles */}
      <div className="bg-[#97CC06]/80 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-[#063970] mb-6" data-testid="text-related-title">Related Articles</h3>
        <div className="space-y-3">
          {relatedArticles.map((article, index) => (
            <Link href={`/resources/${article.slug}`} key={index}>
              <div 
                className="group hover-elevate active-elevate-2 p-5 rounded-lg border border-gray-200 bg-[#ffffff] mt-[5px] mb-[5px]"
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
  );
}
