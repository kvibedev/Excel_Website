import crypto from "crypto";
import { storage } from "../server/storage";
import { sendBlogApprovalRequestEmail } from "../server/email";

async function main() {
  const RECIPIENT = "nicholson@kvibe.com";
  const BLOG_ID = 27;

  console.log("1) Ensuring blog_approval recipient exists for", RECIPIENT);
  const existing = await storage.getFormEmailSettings("blog_approval");
  const already = existing.find(s => s.recipientEmail.toLowerCase() === RECIPIENT.toLowerCase());
  if (!already) {
    const created = await storage.createFormEmailSetting({
      formType: "blog_approval",
      recipientEmail: RECIPIENT,
      recipientName: "Nicholson (test)",
      ccType: "to",
      isActive: true,
    });
    console.log("   created recipient id=", created.id);
  } else {
    if (!already.isActive) await storage.updateFormEmailSetting(already.id, { isActive: true });
    console.log("   recipient already exists id=", already.id);
  }

  console.log("2) Loading blog post id=", BLOG_ID);
  const post = await storage.getBlogPost(BLOG_ID);
  if (!post) throw new Error("Blog post not found");

  console.log("3) Generating approval token & updating post");
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const updated = await storage.updateBlogPost(BLOG_ID, {
    approvalStatus: "pending",
    approvalToken: token,
    approvalTokenExpiresAt: expiresAt,
  });
  await storage.createBlogApprovalHistory({
    blogPostId: BLOG_ID,
    action: "sent_for_approval",
    feedback: null,
    performedBy: "test-script",
  });

  console.log("4) Sending approval email via SendGrid...");
  await sendBlogApprovalRequestEmail(updated!, token);
  console.log("   DONE — token:", token);
  console.log("   review URL path: /blog/approval/" + token);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
