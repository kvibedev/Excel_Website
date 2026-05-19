import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import type { BlogPostStatsDetail } from "@shared/schema";

type Range = "7" | "30" | "90" | "all";

function formatDuration(ms: number): string {
  if (!ms || ms <= 0) return "—";
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

interface Props {
  postId: number;
}

export default function BlogStatsPanel({ postId }: Props) {
  const [range, setRange] = useState<Range>("30");

  const { data, isLoading } = useQuery<BlogPostStatsDetail>({
    queryKey: ["/api/admin/blog", postId, "stats", { range }],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog/${postId}/stats?range=${range}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load stats");
      return res.json();
    },
  });

  return (
    <div className="mt-3 p-4 bg-white border rounded-md" data-testid={`stats-panel-${postId}`}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="text-sm font-semibold text-[#063970]">Performance</div>
        <div className="flex items-center gap-1">
          {(["7", "30", "90", "all"] as Range[]).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? "default" : "outline"}
              onClick={() => setRange(r)}
              data-testid={`button-range-${r}-${postId}`}
            >
              {r === "all" ? "All time" : `${r}d`}
            </Button>
          ))}
        </div>
      </div>

      {isLoading || !data ? (
        <div className="text-sm text-muted-foreground py-6 text-center">Loading stats…</div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-xs text-muted-foreground">Views</div>
              <div className="text-2xl font-bold text-[#063970]" data-testid={`stat-views-${postId}`}>
                {data.totalViews.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-xs text-muted-foreground">Unique visitors</div>
              <div className="text-2xl font-bold text-[#063970]" data-testid={`stat-visitors-${postId}`}>
                {data.uniqueVisitors.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-xs text-muted-foreground">Avg. time on page</div>
              <div className="text-2xl font-bold text-[#063970]" data-testid={`stat-avgtime-${postId}`}>
                {formatDuration(data.avgTimeOnPageMs)}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Views over time</div>
            <div style={{ width: "100%", height: 200 }}>
              {data.series.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground bg-gray-50 rounded-md">
                  No data in this range
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.series} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#0A5EB9" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">Top referrers</div>
            {data.topReferrers.length === 0 ? (
              <div className="text-sm text-muted-foreground">No referrer data yet.</div>
            ) : (
              <ul className="space-y-1">
                {data.topReferrers.map((r) => (
                  <li
                    key={r.referrer}
                    className="flex justify-between text-sm py-1 border-b last:border-0"
                    data-testid={`referrer-${postId}-${r.referrer}`}
                  >
                    <span className="truncate mr-2">{r.referrer}</span>
                    <span className="text-muted-foreground tabular-nums">{r.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
