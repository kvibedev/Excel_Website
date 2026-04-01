import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FileText, ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";
import AdminLayout, { useAdminAuth } from "./AdminLayout";

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  imageUrl: string;
  status: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const params = useParams<{ id?: string }>();
  const isEditing = !!params.id;
  const { authData, authLoading } = useAdminAuth();

  const [form, setForm] = useState<PostForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    imageUrl: "",
    status: "draft",
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const { data: existingPost, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blog", params.id],
    enabled: isEditing && !!authData?.authenticated,
  });

  useEffect(() => {
    if (existingPost) {
      setForm({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content: existingPost.content,
        author: existingPost.author,
        category: existingPost.category || "",
        tags: existingPost.tags || "",
        imageUrl: existingPost.imageUrl || "",
        status: existingPost.status,
      });
      setSlugManuallyEdited(true);
    }
  }, [existingPost]);

  const createMutation = useMutation({
    mutationFn: async (data: PostForm) => {
      return apiRequest("POST", "/api/admin/blog", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Post created successfully" });
      setLocation("/admin/blog");
    },
    onError: () => {
      toast({
        title: "Failed to create post",
        description: "Check that the slug is unique and all required fields are filled",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: PostForm) => {
      return apiRequest("PATCH", `/api/admin/blog/${params.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog", params.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Post updated successfully" });
      setLocation("/admin/blog");
    },
    onError: () => {
      toast({
        title: "Failed to update post",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugManuallyEdited ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim() || !form.author.trim()) {
      toast({
        title: "Missing required fields",
        description: "Title, slug, author, and content are required",
        variant: "destructive",
      });
      return;
    }
    if (isEditing) {
      updateMutation.mutate(form);
    } else {
      createMutation.mutate(form);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (authLoading || (isEditing && postLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout title={`Excel CRM - ${isEditing ? "Edit Post" : "New Post"}`} activeNav="blog">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {isEditing ? "Edit Post" : "New Blog Post"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Post title"
                      data-testid="input-title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="post-url-slug"
                      data-testid="input-slug"
                    />
                    <p className="text-xs text-muted-foreground mt-1">URL-friendly identifier. Auto-generated from title.</p>
                  </div>
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={form.author}
                      onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                      placeholder="Author name"
                      data-testid="input-author"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={form.category}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                      placeholder="e.g. Cleaning Tips"
                      data-testid="input-category"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={form.tags}
                      onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                      placeholder="Comma-separated tags (e.g. cleaning, green, tips)"
                      data-testid="input-tags"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="imageUrl">Featured Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={form.imageUrl}
                      onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-image-url"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Paste a URL for the blog post hero image and listing thumbnail.</p>
                    {form.imageUrl && (
                      <div className="mt-3 rounded-md overflow-hidden border max-h-48">
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          data-testid="img-preview"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={form.excerpt}
                      onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                      placeholder="Short description shown in listings..."
                      rows={3}
                      data-testid="input-excerpt"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  placeholder="Write your post content in markdown..."
                  rows={20}
                  className="font-mono text-sm"
                  data-testid="input-content"
                />
                <p className="text-xs text-muted-foreground mt-2">Markdown supported</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="publish-toggle"
                      checked={form.status === "published"}
                      onCheckedChange={(checked) =>
                        setForm((p) => ({ ...p, status: checked ? "published" : "draft" }))
                      }
                      data-testid="toggle-publish"
                    />
                    <Label htmlFor="publish-toggle" className="cursor-pointer">
                      {form.status === "published" ? "Published" : "Draft"}
                    </Label>
                  </div>
                  <Button type="submit" disabled={isPending} data-testid="button-save">
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
