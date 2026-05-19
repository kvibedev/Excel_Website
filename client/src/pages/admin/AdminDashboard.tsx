import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, BookOpen, CalendarClock, TrendingUp, Compass } from "lucide-react";
import type { Contact, VendorRegistration, TopBlogPostStats, LeadSourceBreakdown, LeadSourceRow } from "@shared/schema";
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

type LeadSourceRange = "7" | "30" | "90" | "all";

function buildLeadSourceHref(row: LeadSourceRow): string {
  const params = new URLSearchParams();
  if (row.type === "utm") {
    if (row.utmSource) params.set("utmSource", row.utmSource);
    if (row.utmMedium) params.set("utmMedium", row.utmMedium);
  } else if (row.type === "referrer" && row.referrerDomain) {
    params.set("referrer", row.referrerDomain);
  } else {
    params.set("source", "direct");
  }
  return `/admin/contacts?${params.toString()}`;
}

export default function AdminDashboard() {
  const { authData, authLoading } = useAdminAuth();
  const [leadRange, setLeadRange] = useState<LeadSourceRange>("30");

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!authData?.authenticated,
  });

  const { data: leadSources, isLoading: leadSourcesLoading } = useQuery<LeadSourceBreakdown>({
    queryKey: ["/api/admin/contacts/source-breakdown", { range: leadRange }],
    queryFn: async () => {
      const res = await fetch(`/api/admin/contacts/source-breakdown?range=${leadRange}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load lead sources");
      return res.json();
    },
    enabled: !!authData?.authenticated,
  });

  const [topPostsRange, setTopPostsRange] = useState<"7" | "30" | "90" | "all">("30");

  const rangeLabels: Record<typeof topPostsRange, string> = {
    "7": "last 7 days",
    "30": "last 30 days",
    "90": "last 90 days",
    all: "all time",
  };

  const { data: topPosts, isLoading: topPostsLoading } = useQuery<TopBlogPostStats[]>({
    queryKey: ["/api/admin/blog/top-stats", { limit: 5, range: topPostsRange }],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog/top-stats?limit=5&range=${topPostsRange}`, { credentials: "include" });
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2 flex-wrap">
            <span className="flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Lead sources
            </span>
            <Select value={leadRange} onValueChange={(v) => setLeadRange(v as LeadSourceRange)}>
              <SelectTrigger className="w-40" data-testid="select-lead-sources-range">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leadSourcesLoading ? (
            <p className="text-muted-foreground text-center py-4">Loading...</p>
          ) : !leadSources || leadSources.rows.length === 0 ? (
            <p className="text-muted-foreground text-center py-4" data-testid="text-no-lead-sources">
              No leads in this range yet
            </p>
          ) : (
            <div className="space-y-2">
              {leadSources.rows.map((row) => {
                const pct = leadSources.total > 0 ? Math.round((row.count / leadSources.total) * 100) : 0;
                const typeLabel =
                  row.type === "utm" ? "UTM" : row.type === "referrer" ? "Referrer" : "Direct";
                return (
                  <Link key={row.key} href={buildLeadSourceHref(row)}>
                    <div
                      className="flex items-center justify-between gap-4 p-3 rounded-md hover-elevate cursor-pointer"
                      data-testid={`row-lead-source-${row.key}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Badge variant="outline" className="flex-shrink-0">{typeLabel}</Badge>
                        <p className="font-medium truncate" data-testid={`text-lead-source-label-${row.key}`}>
                          {row.label}
                        </p>
                      </div>
                      <div className="flex gap-6 text-sm flex-shrink-0 items-center">
                        <span className="text-muted-foreground tabular-nums hidden sm:inline">{pct}%</span>
                        <span className="text-muted-foreground">
                          Leads:{" "}
                          <span
                            className="font-semibold text-[#063970] tabular-nums"
                            data-testid={`text-lead-source-count-${row.key}`}
                          >
                            {row.count.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-8">
        <BlogPerformancePanel />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex flex-wrap justify-between items-center gap-2">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top blog posts ({rangeLabels[topPostsRange]})
            </span>
            <div className="flex items-center gap-2">
              <Tabs value={topPostsRange} onValueChange={(v) => setTopPostsRange(v as typeof topPostsRange)}>
                <TabsList data-testid="tabs-top-posts-range">
                  <TabsTrigger value="7" data-testid="tab-top-posts-range-7">7d</TabsTrigger>
                  <TabsTrigger value="30" data-testid="tab-top-posts-range-30">30d</TabsTrigger>
                  <TabsTrigger value="90" data-testid="tab-top-posts-range-90">90d</TabsTrigger>
                  <TabsTrigger value="all" data-testid="tab-top-posts-range-all">All time</TabsTrigger>
                </TabsList>
              </Tabs>
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm" data-testid="link-view-all-blog-admin">View All</Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topPostsLoading ? (
            <p className="text-muted-foreground text-center py-4">Loading...</p>
          ) : !topPosts || topPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4" data-testid="text-no-top-posts">No blog views in the {rangeLabels[topPostsRange]}</p>
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
