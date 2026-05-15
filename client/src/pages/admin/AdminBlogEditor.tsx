import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Save, Upload, Link2, Loader2, X, Send, Check, MessageSquare, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, AdminRole, BlogApprovalHistory } from "@shared/schema";
import AdminLayout from "./AdminLayout";
import { useAdminAuth, canAccess } from "./adminAuth";

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

  useEffect(() => {
    if (!authLoading && authData?.authenticated && !canAccess(authData?.role as AdminRole, "editor")) {
      setLocation("/admin/blog");
    }
  }, [authLoading, authData, setLocation]);

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
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: existingPost, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/blog", params.id],
    enabled: isEditing && !!authData?.authenticated,
  });

  const { data: approvalHistory = [] } = useQuery<BlogApprovalHistory[]>({
    queryKey: ["/api/admin/blog", params.id, "approval-history"],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog/${params.id}/approval-history`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load history");
      return res.json();
    },
    enabled: isEditing && !!authData?.authenticated,
  });

  const sendForApprovalMutation = useMutation({
    mutationFn: async () => apiRequest("POST", `/api/admin/blog/${params.id}/send-for-approval`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog", params.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog", params.id, "approval-history"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "Sent for approval", description: "The client has been emailed a review link." });
    },
    onError: () => toast({ title: "Failed to send", description: "Make sure approval recipients are configured in Email Settings.", variant: "destructive" }),
  });

  const markEditsCompletedMutation = useMutation({
    mutationFn: async () => apiRequest("POST", `/api/admin/blog/${params.id}/mark-edits-completed`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog", params.id, "approval-history"] });
      toast({ title: "Edits marked complete", description: "Now send the post for approval again when ready." });
    },
    onError: () => toast({ title: "Failed to mark complete", variant: "destructive" }),
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

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/blog/upload-image", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setForm((p) => ({ ...p, imageUrl: data.imageUrl }));
      toast({ title: "Image uploaded successfully" });
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message || "Could not upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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

  const approvalStatus = existingPost?.approvalStatus || "none";
  const sentEntries = approvalHistory.filter(h => h.action === "sent_for_approval");
  const roundNumber = sentEntries.length;
  const lastFeedbackEntry = approvalHistory.find(h => h.action === "changes_requested");
  const hasEditsCompletedAfterLastFeedback = lastFeedbackEntry
    ? approvalHistory.some(h => h.action === "edits_completed" && new Date(h.createdAt) > new Date(lastFeedbackEntry.createdAt))
    : false;
  const canSendForApproval =
    isEditing &&
    !isPending &&
    (approvalStatus !== "changes_requested" || hasEditsCompletedAfterLastFeedback);

  const approvalStatusBadge = (() => {
    if (approvalStatus === "pending") return <Badge className="bg-blue-500" data-testid="badge-approval-status">Pending Review (Round {roundNumber})</Badge>;
    if (approvalStatus === "approved") return <Badge className="bg-[#97CC06] text-[#063970]" data-testid="badge-approval-status">Client Approved</Badge>;
    if (approvalStatus === "changes_requested") return <Badge className="bg-amber-500" data-testid="badge-approval-status">Changes Requested (Round {roundNumber})</Badge>;
    return null;
  })();

  const actionLabels: Record<string, string> = {
    sent_for_approval: "Sent for approval",
    approved: "Client approved",
    changes_requested: "Client requested changes",
    edits_completed: "Edits completed",
  };

  function formatDateTime(d: string | Date): string {
    return new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  }

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
                    <Label>Featured Image</Label>
                    <p className="text-xs text-muted-foreground mb-3">Recommended: 1200 x 630 px (landscape). Max file size: 5 MB. Formats: JPG, PNG, WebP, GIF.</p>

                    <div className="flex gap-2 mb-3">
                      <Button
                        type="button"
                        variant={imageMode === "url" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImageMode("url")}
                        data-testid="button-image-url-mode"
                      >
                        <Link2 className="w-4 h-4 mr-1" />
                        Paste URL
                      </Button>
                      <Button
                        type="button"
                        variant={imageMode === "upload" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setImageMode("upload")}
                        data-testid="button-image-upload-mode"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload File
                      </Button>
                    </div>

                    {imageMode === "url" ? (
                      <Input
                        id="imageUrl"
                        value={form.imageUrl}
                        onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                        data-testid="input-image-url"
                      />
                    ) : (
                      <div
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors hover:border-[#0A5EB9] hover:bg-[#0A5EB9]/5"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        data-testid="dropzone-image"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          data-testid="input-image-file"
                        />
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-[#0A5EB9]" />
                            <span className="text-sm text-muted-foreground">Uploading...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Click to browse or drag and drop an image</span>
                            <span className="text-xs text-muted-foreground">JPG, PNG, WebP, or GIF up to 5 MB</span>
                          </div>
                        )}
                      </div>
                    )}

                    {form.imageUrl && (
                      <div className="mt-3 relative">
                        <div className="rounded-md overflow-hidden border">
                          <img
                            src={form.imageUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            data-testid="img-preview"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
                          onClick={() => setForm((p) => ({ ...p, imageUrl: "" }))}
                          data-testid="button-remove-image"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{form.imageUrl}</p>
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

            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 flex-wrap">
                    <Send className="w-5 h-5" />
                    Client Approval
                    {approvalStatusBadge}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {approvalStatus === "changes_requested" && lastFeedbackEntry && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-amber-900 mb-1">Most recent feedback</p>
                          <p className="text-sm text-amber-900 whitespace-pre-wrap" data-testid="text-latest-feedback">{lastFeedbackEntry.feedback}</p>
                          <p className="text-xs text-amber-700 mt-2">{formatDateTime(lastFeedbackEntry.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      type="button"
                      onClick={() => sendForApprovalMutation.mutate()}
                      disabled={!canSendForApproval || sendForApprovalMutation.isPending}
                      data-testid="button-send-for-approval"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {sendForApprovalMutation.isPending ? "Sending..." :
                       approvalStatus === "none" ? "Send for Approval" :
                       approvalStatus === "pending" ? "Resend Review Link" :
                       "Send for Approval Again"}
                    </Button>
                    {approvalStatus === "changes_requested" && !hasEditsCompletedAfterLastFeedback && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => markEditsCompletedMutation.mutate()}
                        disabled={markEditsCompletedMutation.isPending}
                        data-testid="button-mark-edits-completed"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark Edits Completed
                      </Button>
                    )}
                  </div>

                  {approvalHistory.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Approval History</p>
                      <div className="space-y-3">
                        {approvalHistory.map((h) => {
                          const isFeedback = h.action === "changes_requested";
                          const isApproved = h.action === "approved";
                          const isCompleted = h.action === "edits_completed";
                          const matchingCompletion = isFeedback
                            ? approvalHistory.find(e => e.action === "edits_completed" && new Date(e.createdAt) > new Date(h.createdAt))
                            : null;
                          return (
                            <div key={h.id} className="flex items-start gap-3 text-sm" data-testid={`history-${h.id}`}>
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                isApproved ? "bg-[#97CC06]" :
                                isFeedback ? "bg-amber-500" :
                                isCompleted ? "bg-green-600" :
                                "bg-blue-500"
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-gray-900">{actionLabels[h.action] || h.action}</span>
                                  {isFeedback && matchingCompletion && (
                                    <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium" title="Edits completed">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      Resolved
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground">{formatDateTime(h.createdAt)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">by {h.performedBy}</p>
                                {h.feedback && (
                                  <div className="mt-1 bg-gray-50 border-l-2 border-amber-400 pl-3 py-2 rounded text-sm text-gray-800 whitespace-pre-wrap">{h.feedback}</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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
