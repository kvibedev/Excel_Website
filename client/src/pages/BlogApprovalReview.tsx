import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Check, MessageSquare, Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import Markdown from "react-markdown";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, BlogApprovalHistory } from "@shared/schema";

interface ReviewData {
  post: Omit<BlogPost, "approvalToken">;
  history: BlogApprovalHistory[];
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDateTime(d: string | Date | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

const actionLabels: Record<string, string> = {
  sent_for_approval: "Sent for approval",
  approved: "Approved",
  changes_requested: "Changes requested",
  edits_completed: "Edits completed",
};

export default function BlogApprovalReview() {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [decision, setDecision] = useState<null | "approved" | "changes_requested">(null);

  const { data, isLoading, error } = useQuery<ReviewData>({
    queryKey: ["/api/blog-approval", token],
    retry: false,
    enabled: decision === null,
  });

  const approveMutation = useMutation({
    mutationFn: async () => apiRequest("POST", `/api/blog-approval/${token}/approve`),
    onSuccess: () => {
      setDecision("approved");
      toast({ title: "Approved", description: "The post has been approved and published." });
    },
    onError: () => toast({ title: "Could not approve", description: "This review link may have expired.", variant: "destructive" }),
  });

  const requestEditsMutation = useMutation({
    mutationFn: async (fb: string) => apiRequest("POST", `/api/blog-approval/${token}/request-edits`, { feedback: fb }),
    onSuccess: () => {
      setFeedbackOpen(false);
      setFeedback("");
      setDecision("changes_requested");
      toast({ title: "Feedback sent", description: "The team has been notified of your requested changes." });
    },
    onError: () => toast({ title: "Could not submit feedback", description: "Please try again.", variant: "destructive" }),
  });

  if (decision) {
    const approved = decision === "approved";
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            {approved ? (
              <CheckCircle2 className="w-16 h-16 text-[#97CC06] mx-auto" />
            ) : (
              <MessageSquare className="w-16 h-16 text-amber-500 mx-auto" />
            )}
            <h1 className="text-2xl font-bold text-[#063970]" data-testid="text-decision-confirmed">
              {approved ? "Approved & Published" : "Feedback Submitted"}
            </h1>
            <p className="text-muted-foreground">
              {approved
                ? "Thank you. The post is now live on the Excel Facility Services Group site."
                : "Thank you. The team has been notified and will send a revised version for review."}
            </p>
            <p className="text-xs text-muted-foreground">You can safely close this window.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#0A5EB9]" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#063970] mb-2" data-testid="text-invalid-link">Review link unavailable</h1>
            <p className="text-muted-foreground">This review link is invalid or has expired. Please contact Excel Facility Services Group for a new link.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { post, history } = data;
  const tags = post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const isFinalized = post.approvalStatus === "approved" || post.approvalStatus === "changes_requested";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#063970] text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">Excel Facility Services Group</p>
            <p className="font-bold">Blog Post Review</p>
          </div>
          <Badge
            className={
              post.approvalStatus === "approved" ? "bg-[#97CC06] text-[#063970]" :
              post.approvalStatus === "changes_requested" ? "bg-amber-500" :
              "bg-white text-[#063970]"
            }
            data-testid="badge-approval-status"
          >
            {post.approvalStatus === "approved" ? "Approved" :
             post.approvalStatus === "changes_requested" ? "Changes Requested" :
             "Awaiting Your Review"}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              {post.imageUrl && (
                <img src={post.imageUrl} alt="" className="w-full h-64 object-cover" />
              )}
              <CardContent className="pt-6">
                {post.category && (
                  <div className="inline-block px-3 py-1 bg-[#97CC06] text-[#063970] text-xs font-bold rounded-full mb-3" data-testid="badge-category">
                    {post.category}
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-[#063970] mb-4 leading-tight" data-testid="text-post-title">
                  {post.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span>By {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {estimateReadTime(post.content)}</span>
                </div>
                {post.excerpt && (
                  <p className="text-lg text-gray-700 italic border-l-4 border-[#0A5EB9] pl-4 mb-6">{post.excerpt}</p>
                )}
                <article className="prose prose-lg max-w-none prose-headings:text-[#063970] prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold">
                  <Markdown>{post.content}</Markdown>
                </article>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    {tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="text-lg">Your Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isFinalized ? (
                  <div className="p-4 bg-gray-50 rounded-md text-sm">
                    {post.approvalStatus === "approved" ? (
                      <div className="flex items-start gap-2 text-[#063970]">
                        <CheckCircle2 className="w-5 h-5 text-[#97CC06] flex-shrink-0 mt-0.5" />
                        <span>You approved this post. It has been published.</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-amber-700">
                        <MessageSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>You requested changes. The team has been notified and will follow up with a revised version.</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">Please review the post on the left. Once you're satisfied, approve it to publish — or request edits with your feedback.</p>
                    <Button
                      className="w-full bg-[#97CC06] hover:bg-[#97CC06]/90 text-[#063970] font-bold"
                      onClick={() => approveMutation.mutate()}
                      disabled={approveMutation.isPending}
                      data-testid="button-approve"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {approveMutation.isPending ? "Approving..." : "Approve & Publish"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setFeedbackOpen(true)}
                      data-testid="button-request-edits"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Request Edits
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.map(h => (
                      <div key={h.id} className="text-sm border-l-2 border-gray-200 pl-3" data-testid={`history-entry-${h.id}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-[#063970]">{actionLabels[h.action] || h.action}</span>
                          <span className="text-xs text-muted-foreground">{formatDateTime(h.createdAt)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">by {h.performedBy}</p>
                        {h.feedback && (
                          <p className="mt-1 text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded text-xs">{h.feedback}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Edits</DialogTitle>
            <DialogDescription>
              Let the team know what should be changed. They'll revise the post and send it back for another review.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What needs to change? Be as specific as possible..."
              rows={8}
              data-testid="input-feedback"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackOpen(false)} data-testid="button-cancel-feedback">Cancel</Button>
            <Button
              onClick={() => requestEditsMutation.mutate(feedback)}
              disabled={!feedback.trim() || requestEditsMutation.isPending}
              data-testid="button-submit-feedback"
            >
              {requestEditsMutation.isPending ? "Sending..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
