import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";
import AdminLayout, { useAdminAuth } from "./AdminLayout";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-500",
  published: "bg-green-500",
};

export default function AdminBlog() {
  const { toast } = useToast();
  const { authData, authLoading } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    enabled: !!authData?.authenticated,
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
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

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Excel CRM - Blog" activeNav="blog">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Blog Posts ({filteredPosts?.length || 0})
            </CardTitle>
            <Link href="/admin/blog/new">
              <Button data-testid="button-new-post">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              data-testid="input-search-posts"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts?.map((post) => (
              <div
                key={post.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                data-testid={`post-row-${post.id}`}
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.author}
                    {post.category && ` · ${post.category}`}
                    {post.publishedAt && ` · Published ${new Date(post.publishedAt).toLocaleDateString()}`}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground truncate mt-1">{post.excerpt}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge className={statusColors[post.status] || "bg-gray-400"}>{post.status}</Badge>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Button size="icon" variant="ghost" data-testid={`button-edit-post-${post.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
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
                </div>
              </div>
            ))}
            {(!filteredPosts || filteredPosts.length === 0) && (
              <p className="text-muted-foreground text-center py-8">No blog posts found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
