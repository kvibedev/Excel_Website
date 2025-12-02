import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Share2 } from "lucide-react";

interface RelatedArticle {
  title: string;
  slug: string;
  date: string;
}

interface BlogSidebarProps {
  relatedArticles: RelatedArticle[];
}

export default function BlogSidebar({ relatedArticles }: BlogSidebarProps) {
  return (
    <div className="sticky top-24">
      {/* Share */}
      <div className="bg-[#97CC06] rounded-xl shadow-md p-6 mb-6">
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
      <div className="bg-[#97CC06] rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-[#063970] mb-6" data-testid="text-related-title">Related Articles</h3>
        <div className="space-y-4">
          {relatedArticles.map((article, index) => (
            <Link href={`/resources/${article.slug}`} key={index}>
              <div 
                className="group hover-elevate active-elevate-2 p-4 rounded-lg bg-[#063970]"
                data-testid={`card-related-${index + 1}`}
              >
                <h4 className="font-semibold text-white mb-2 leading-snug" data-testid={`text-related-title-${index + 1}`}>
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-white/80">
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
