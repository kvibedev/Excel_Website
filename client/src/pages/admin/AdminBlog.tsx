import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Trash2, Pencil, AlertTriangle, BarChart3, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, AdminRole, BlogPostStats } from "@shared/schema";
import AdminLayout from "./AdminLayout";
import { useAdminAuth, canAccess } from "./adminAuth";
import BlogStatsPanel from "@/components/admin/BlogStatsPanel";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-500",
  published: "bg-green-500",
};

const approvalStatusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending Review", className: "bg-blue-500" },
  approved: { label: "Client Approved", className: "bg-[#97CC06] text-[#063970]" },
  changes_requested: { label: "Changes Requested", className: "bg-amber-500" },
};

type SortMode = "newest" | "views";

function formatDuration(ms: number): string {
  if (!ms || ms <= 0) return "—";
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

export default function AdminBlog() {
  const { toast } = useToast();
  const { authData, authLoading } = useAdminAuth();
  const isReadOnly = !canAccess(authData?.role as AdminRole, "editor");
  const canDelete = canAccess(authData?.role as AdminRole, "admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const search = useSearch();
  const expandedFromQueryRef = useRef(false);
  const expandedRowRef = useRef<HTMLDivElement | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    enabled: !!authData?.authenticated,
  });

  const { data: stats } = useQuery<BlogPostStats[]>({
    queryKey: ["/api/admin/blog/stats"],
    enabled: !!authData?.authenticated,
    refetchInterval: 60000,
  });

  const statsByPostId = useMemo(() => {
    const map = new Map<number, BlogPostStats>();
    (stats || []).forEach((s) => map.set(s.postId, s));
    return map;
  }, [stats]);

  useEffect(() => {
    if (expandedFromQueryRef.current) return;
    const params = new URLSearchParams(search);
    const expandRaw = params.get("expand");
    if (!expandRaw) return;
    const id = parseInt(expandRaw, 10);
    if (Number.isFinite(id)) {
      setExpandedId(id);
      expandedFromQueryRef.current = true;
    }
  }, [search]);

  useEffect(() => {
    if (expandedId && expandedRowRef.current) {
      expandedRowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedId, posts]);

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Post deleted" });
    },
  });

  if (authLoading || postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const filteredPosts = (posts || []).filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortMode === "views") {
      const av = statsByPostId.get(a.id)?.totalViews ?? 0;
      const bv = statsByPostId.get(b.id)?.totalViews ?? 0;
      if (bv !== av) return bv - av;
    }
    const aDate = a.publishedAt || a.createdAt;
    const bDate = b.publishedAt || b.createdAt;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <AdminLayout title="Excel CRM - Blog" activeNav="blog">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Blog Posts ({sortedPosts.length})
            </CardTitle>
            {!isReadOnly && (
              <Link href="/admin/blog/new">
                <Button data-testid="button-new-post">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              data-testid="input-search-posts"
            />
            <Button
              variant={sortMode === "views" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortMode(sortMode === "views" ? "newest" : "views")}
              data-testid="button-sort-views"
            >
              <ArrowUpDown className="w-4 h-4 mr-1" />
              {sortMode === "views" ? "Sorted by Views" : "Sort by Views"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedPosts.map((post) => {
              const s = statsByPostId.get(post.id);
              const expanded = expandedId === post.id;
              return (
                <div
                  key={post.id}
                  data-testid={`post-row-${post.id}`}
                  ref={expanded ? expandedRowRef : undefined}
                >
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.author}
                        {post.category && ` · ${post.category}`}
                        {post.publishedAt && ` · Published ${new Date(post.publishedAt).toLocaleDateString()}`}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm flex-wrap">
                        <span className="text-muted-foreground">
                          Views: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-views-${post.id}`}>{(s?.totalViews ?? 0).toLocaleString()}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Unique: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-unique-${post.id}`}>{(s?.uniqueVisitors ?? 0).toLocaleString()}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Avg. time: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-avgtime-${post.id}`}>{formatDuration(s?.avgTimeOnPageMs ?? 0)}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Leads: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-leads-${post.id}`}>{(s?.leads ?? 0).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                      <Badge className={statusColors[post.status] || "bg-gray-400"}>{post.status}</Badge>
                      {post.approvalStatus && post.approvalStatus !== "none" && approvalStatusLabels[post.approvalStatus] && (
                        <Badge className={approvalStatusLabels[post.approvalStatus].className} data-testid={`badge-approval-${post.id}`}>
                          {approvalStatusLabels[post.approvalStatus].label}
                        </Badge>
                      )}
                      {(() => {
                        if (post.approvalStatus !== "pending" || !post.approvalTokenExpiresAt) return null;
                        const diffMs = new Date(post.approvalTokenExpiresAt).getTime() - Date.now();
                        if (diffMs <= 0) {
                          return (
                            <Badge variant="outline" className="border-red-300 bg-red-50 text-red-800" data-testid={`badge-expired-${post.id}`}>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expired — resend
                            </Badge>
                          );
                        }
                        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                        if (days <= 3) {
                          return (
                            <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800" data-testid={`badge-expiring-${post.id}`}>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expires in {days} day{days === 1 ? "" : "s"}
                            </Badge>
                          );
                        }
                        return null;
                      })()}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExpandedId(expanded ? null : post.id)}
                        data-testid={`button-stats-${post.id}`}
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Stats
                        {expanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                      </Button>
                      {!isReadOnly && (
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button size="icon" variant="ghost" data-testid={`button-edit-post-${post.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      {canDelete && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this post?")) {
                              deletePostMutation.mutate(post.id);
                            }
                          }}
                          data-testid={`button-delete-post-${post.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {expanded && <BlogStatsPanel postId={post.id} />}
                </div>
              );
            })}
            {sortedPosts.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No blog posts found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
