import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Trash2, Pencil, AlertTriangle, BarChart3, ChevronDown, ChevronUp, ArrowUpDown, Send, EyeOff } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, AdminRole, BlogPostStats } from "@shared/schema";
import AdminLayout from "./AdminLayout";
import { useAdminAuth, canAccess } from "./adminAuth";
import BlogStatsPanel from "@/components/admin/BlogStatsPanel";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-700",
  published: "bg-green-100 text-green-700",
  scheduled: "bg-blue-100 text-blue-700",
};

type StatusFilter = "all" | "published" | "scheduled" | "draft";

const approvalStatusLabels: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending Review", className: "bg-blue-100 text-blue-700" },
  approved: { label: "Client Approved", className: "bg-green-100 text-green-700" },
  changes_requested: { label: "Changes Requested", className: "bg-amber-100 text-amber-700" },
};

type SortMode = "newest" | "views" | "leads";

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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
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

  const invalidateBlogQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/blog/stats"] });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
  };

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      invalidateBlogQueries();
      toast({ title: "Post deleted" });
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PATCH", `/api/admin/blog/${id}`, { status: "draft" });
    },
    onSuccess: () => {
      invalidateBlogQueries();
      toast({ title: "Post unpublished", description: "Moved back to drafts." });
    },
    onError: (error: Error) => {
      toast({ title: "Could not unpublish", description: error.message, variant: "destructive" });
    },
  });

  const sendForApprovalMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("POST", `/api/admin/blog/${id}/send-for-approval`);
    },
    onSuccess: () => {
      invalidateBlogQueries();
      toast({ title: "Sent for approval", description: "Review link emailed to the client." });
    },
    onError: (error: Error) => {
      toast({ title: "Could not send for approval", description: error.message, variant: "destructive" });
    },
  });

  if (authLoading || postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const allPosts = posts || [];
  const counts = {
    all: allPosts.length,
    published: allPosts.filter((p) => p.status === "published").length,
    scheduled: allPosts.filter((p) => p.status === "scheduled").length,
    draft: allPosts.filter((p) => p.status === "draft").length,
  };

  const filteredPosts = allPosts.filter((post) => {
    if (statusFilter !== "all" && post.status !== statusFilter) return false;
    const term = searchTerm.toLowerCase();
    if (!term) return true;
    return (
      post.title.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term) ||
      (post.category?.toLowerCase().includes(term) ?? false)
    );
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortMode === "views") {
      const av = statsByPostId.get(a.id)?.totalViews ?? 0;
      const bv = statsByPostId.get(b.id)?.totalViews ?? 0;
      if (bv !== av) return bv - av;
    } else if (sortMode === "leads") {
      const al = statsByPostId.get(a.id)?.leads ?? 0;
      const bl = statsByPostId.get(b.id)?.leads ?? 0;
      if (bl !== al) return bl - al;
    }
    const aDate = a.publishedAt || a.createdAt;
    const bDate = b.publishedAt || b.createdAt;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <AdminLayout title="Excel CRM - Blog" activeNav="blog">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#063970]" />
              Blog Posts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {counts.published} published &middot; {counts.scheduled} scheduled &middot; {counts.draft} drafts
            </p>
          </div>
          {!isReadOnly && (
            <Link href="/admin/blog/new">
              <Button data-testid="button-new-post">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {([
            { key: "all", label: "All" },
            { key: "published", label: "Published" },
            { key: "scheduled", label: "Scheduled" },
            { key: "draft", label: "Drafts" },
          ] as { key: StatusFilter; label: string }[]).map((opt) => {
            const active = statusFilter === opt.key;
            const count = counts[opt.key];
            return (
              <Button
                key={opt.key}
                type="button"
                size="sm"
                variant={active ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setStatusFilter(opt.key)}
                data-testid={`button-filter-${opt.key}`}
              >
                {opt.label}
                <span className={`ml-1.5 text-xs ${active ? "opacity-80" : "text-muted-foreground"}`}>
                  {count}
                </span>
              </Button>
            );
          })}
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:max-w-sm bg-white"
                data-testid="input-search-posts"
              />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={sortMode === "views" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode(sortMode === "views" ? "newest" : "views")}
                  data-testid="button-sort-views"
                >
                  <ArrowUpDown className="w-4 h-4 mr-1" />
                  {sortMode === "views" ? "Sorted by Views" : "Sort by Views"}
                </Button>
                <Button
                  variant={sortMode === "leads" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode(sortMode === "leads" ? "newest" : "leads")}
                  data-testid="button-sort-leads"
                >
                  <ArrowUpDown className="w-4 h-4 mr-1" />
                  {sortMode === "leads" ? "Sorted by Leads" : "Sort by Leads"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className={`flex justify-between items-start p-4 rounded-lg border gap-4 flex-wrap transition-colors ${
                  expanded ? "border-[#063970] bg-blue-50/50" : "border-gray-200 bg-white hover:border-gray-300"
                }`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {post.author}
                      {post.category && ` · ${post.category}`}
                      {post.publishedAt && ` · Published ${new Date(post.publishedAt).toLocaleDateString()}`}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs flex-wrap">
                      <span className="text-gray-500">
                        Views: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-views-${post.id}`}>{(s?.totalViews ?? 0).toLocaleString()}</span>
                      </span>
                      <span className="text-gray-500">
                        Unique: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-unique-${post.id}`}>{(s?.uniqueVisitors ?? 0).toLocaleString()}</span>
                      </span>
                      <span className="text-gray-500">
                        Avg. time: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`col-avgtime-${post.id}`}>{formatDuration(s?.avgTimeOnPageMs ?? 0)}</span>
                      </span>
                      <span className="text-gray-500">
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
                        <Button size="icon" variant="ghost" data-testid={`button-edit-post-${post.id}`} title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    {!isReadOnly && post.status !== "published" && post.approvalStatus !== "changes_requested" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => sendForApprovalMutation.mutate(post.id)}
                        disabled={sendForApprovalMutation.isPending}
                        title={post.approvalStatus === "pending" ? "Resend review link" : "Send for approval"}
                        data-testid={`button-send-for-approval-${post.id}`}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    )}
                    {!isReadOnly && post.status === "published" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          if (confirm("Unpublish this post? It will move back to drafts.")) {
                            unpublishMutation.mutate(post.id);
                          }
                        }}
                        disabled={unpublishMutation.isPending}
                        title="Unpublish"
                        data-testid={`button-unpublish-post-${post.id}`}
                      >
                        <EyeOff className="w-4 h-4" />
                      </Button>
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
            <Card><CardContent className="py-12 text-center text-gray-500">No blog posts found</CardContent></Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
