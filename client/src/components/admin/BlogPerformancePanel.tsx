import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye, Users, Clock, TrendingUp } from "lucide-react";
import type { BlogOverviewStats } from "@shared/schema";

type Range = "7" | "30" | "90" | "all";

function formatDuration(ms: number): string {
  if (!ms || ms <= 0) return "—";
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function formatShortDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}`;
}

export default function BlogPerformancePanel() {
  const [range, setRange] = useState<Range>("30");

  const { data, isLoading } = useQuery<BlogOverviewStats>({
    queryKey: ["/api/admin/blog/stats/overview", { range }],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog/stats/overview?range=${range}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load blog performance");
      return res.json();
    },
  });

  const maxTopViews = Math.max(1, ...(data?.topPosts?.map((p) => p.views) || [1]));

  return (
    <Card data-testid="card-blog-performance">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#063970]" />
            Blog Performance
          </CardTitle>
          <div className="flex items-center gap-1">
            {(["7", "30", "90", "all"] as Range[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? "default" : "outline"}
                onClick={() => setRange(r)}
                data-testid={`button-blog-range-${r}`}
              >
                {r === "all" ? "All time" : `${r}d`}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="text-sm text-muted-foreground py-12 text-center">Loading blog performance…</div>
        ) : data.totalViews === 0 ? (
          <div className="py-10 text-center">
            <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No blog views recorded in this range yet. Once readers visit your posts, their activity will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> Total views
                </div>
                <div className="text-2xl font-bold text-[#063970]" data-testid="stat-overview-views">
                  {data.totalViews.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> Unique visitors
                </div>
                <div className="text-2xl font-bold text-[#063970]" data-testid="stat-overview-visitors">
                  {data.uniqueVisitors.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Avg. time on page
                </div>
                <div className="text-2xl font-bold text-[#063970]" data-testid="stat-overview-avgtime">
                  {formatDuration(data.avgTimeOnPageMs)}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-2">Views over time</div>
              <div style={{ width: "100%", height: 220 }}>
                {data.series.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 rounded-md">
                    No data in this range
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.series} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="blogViewsFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0A5EB9" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#0A5EB9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={formatShortDate} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip
                        labelFormatter={(label) => label}
                        formatter={(value: number) => [value, "Views"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#0A5EB9"
                        strokeWidth={2}
                        fill="url(#blogViewsFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-muted-foreground">Top performing posts</div>
                <Link href="/admin/blog">
                  <Button variant="ghost" size="sm" data-testid="link-view-all-blog">All posts</Button>
                </Link>
              </div>
              {data.topPosts.length === 0 ? (
                <div className="text-sm text-muted-foreground py-3">No posts have views yet.</div>
              ) : (
                <ul className="space-y-2">
                  {data.topPosts.map((p) => {
                    const pct = Math.round((p.views / maxTopViews) * 100);
                    return (
                      <li
                        key={p.postId}
                        className="space-y-1"
                        data-testid={`top-post-${p.postId}`}
                      >
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <Link
                            href={`/resources/${p.slug}`}
                            className="font-medium text-[#063970] hover:underline truncate"
                            data-testid={`link-top-post-${p.postId}`}
                          >
                            {p.title}
                          </Link>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                            <span>{p.views.toLocaleString()} views</span>
                            <span className="hidden sm:inline">{p.uniqueVisitors.toLocaleString()} unique</span>
                            <span className="hidden md:inline">{formatDuration(p.avgTimeOnPageMs)}</span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                          <div
                            className="h-full bg-[#0A5EB9]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
