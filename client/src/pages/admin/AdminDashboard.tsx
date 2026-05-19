import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, BookOpen, CalendarClock, TrendingUp } from "lucide-react";
import type { Contact, VendorRegistration, TopBlogPostStats } from "@shared/schema";
import AdminLayout from "./AdminLayout";
import { useAdminAuth } from "./adminAuth";
import BlogPerformancePanel from "@/components/admin/BlogPerformancePanel";

interface DashboardStats {
  totalContacts: number;
  totalVendors: number;
  newContacts: number;
  newVendors: number;
  publishedPosts: number;
  totalPosts: number;
  pendingFollowUps: number;
  recentContacts: Contact[];
  recentVendors: VendorRegistration[];
}

export default function AdminDashboard() {
  const { authData, authLoading } = useAdminAuth();

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!authData?.authenticated,
  });

  const { data: topPosts, isLoading: topPostsLoading } = useQuery<TopBlogPostStats[]>({
    queryKey: ["/api/admin/blog/top-stats", { limit: 5, range: 30 }],
    queryFn: async () => {
      const res = await fetch("/api/admin/blog/top-stats?limit=5&range=30", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load top posts");
      return res.json();
    },
    enabled: !!authData?.authenticated,
  });

  const formatDuration = (ms: number): string => {
    if (!ms || ms <= 0) return "—";
    const sec = Math.round(ms / 1000);
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    contacted: "bg-yellow-500",
    "in-progress": "bg-orange-500",
    "follow-up": "bg-purple-500",
    qualified: "bg-green-500",
    approved: "bg-[#97CC06]",
    rejected: "bg-red-500",
    closed: "bg-gray-500",
  };

  return (
    <AdminLayout title="Excel CRM Dashboard" activeNav="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-contacts">{stats?.totalContacts || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.newContacts || 0} new</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-vendors">{stats?.totalVendors || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.newVendors || 0} new</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-posts">{stats?.totalPosts || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.publishedPosts || 0} published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-pending-followups">{stats?.pendingFollowUps || 0}</div>
            <p className="text-xs text-muted-foreground">due today or overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <BlogPerformancePanel />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top blog posts (last 30 days)
            </span>
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" data-testid="link-view-all-blog-admin">View All</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topPostsLoading ? (
            <p className="text-muted-foreground text-center py-4">Loading...</p>
          ) : !topPosts || topPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4" data-testid="text-no-top-posts">No blog views in the last 30 days</p>
          ) : (
            <div className="space-y-2">
              {topPosts.map((p, idx) => (
                <Link key={p.postId} href={`/admin/blog?expand=${p.postId}`}>
                  <div
                    className="flex items-center justify-between gap-4 p-3 rounded-md hover-elevate cursor-pointer"
                    data-testid={`row-top-post-${p.postId}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-semibold text-muted-foreground tabular-nums w-5">{idx + 1}.</span>
                      <p className="font-medium truncate" data-testid={`text-top-post-title-${p.postId}`}>{p.title}</p>
                    </div>
                    <div className="flex gap-6 text-sm flex-shrink-0">
                      <span className="text-muted-foreground">
                        Views: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`text-top-post-views-${p.postId}`}>{p.totalViews.toLocaleString()}</span>
                      </span>
                      <span className="text-muted-foreground hidden sm:inline">
                        Avg. time: <span className="font-semibold text-[#063970] tabular-nums" data-testid={`text-top-post-avgtime-${p.postId}`}>{formatDuration(p.avgTimeOnPageMs)}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Recent Contacts
              <Link href="/admin/contacts">
                <Button variant="ghost" size="sm" data-testid="link-view-all-contacts">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentContacts?.map((contact) => (
                <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                  <Badge className={statusColors[contact.status] || "bg-gray-400"}>{contact.status}</Badge>
                </div>
              ))}
              {(!stats?.recentContacts || stats.recentContacts.length === 0) && (
                <p className="text-muted-foreground text-center py-4">No contacts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Recent Vendors
              <Link href="/admin/vendors">
                <Button variant="ghost" size="sm" data-testid="link-view-all-vendors">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentVendors?.map((vendor) => (
                <div key={vendor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{vendor.companyName}</p>
                    <p className="text-sm text-muted-foreground">{vendor.contactName}</p>
                  </div>
                  <Badge className={statusColors[vendor.status] || "bg-gray-400"}>{vendor.status}</Badge>
                </div>
              ))}
              {(!stats?.recentVendors || stats.recentVendors.length === 0) && (
                <p className="text-muted-foreground text-center py-4">No vendors yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
