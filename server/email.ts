import sgMail from "@sendgrid/mail";
import { storage } from "./storage";
import type { Contact, VendorRegistration, BlogPost } from "@shared/schema";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = "info@efsgnj.com";
const FROM_NAME = "Excel Facility Services Group";

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendContactFormEmail(contact: Contact): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn("SendGrid API key not configured — skipping email");
    return;
  }

  const settings = await storage.getFormEmailSettings("contact");
  const activeSettings = settings.filter(s => s.isActive);

  if (activeSettings.length === 0) {
    console.warn("No email recipients configured for contact form — skipping email");
    return;
  }

  const toRecipients = activeSettings
    .filter(s => s.ccType === "to")
    .map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));

  const ccRecipients = activeSettings
    .filter(s => s.ccType === "cc")
    .map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));

  if (toRecipients.length === 0 && ccRecipients.length > 0) {
    toRecipients.push(ccRecipients.shift()!);
  }

  if (toRecipients.length === 0) {
    console.warn("No 'to' recipients for contact form email — skipping");
    return;
  }

  const inquiryLabel = contact.inquiryType === "sales" ? "Sales Inquiry" : "General Inquiry";
  const subject = `New ${inquiryLabel} from ${contact.firstName} ${contact.lastName}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #063970; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; width: 140px; vertical-align: top;">Type:</td>
            <td style="padding: 8px 12px; color: #111827;">${inquiryLabel}</td>
          </tr>
          <tr style="background-color: #ffffff;">
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Name:</td>
            <td style="padding: 8px 12px; color: #111827;">${contact.firstName} ${contact.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Email:</td>
            <td style="padding: 8px 12px; color: #111827;"><a href="mailto:${contact.email}" style="color: #063970;">${contact.email}</a></td>
          </tr>
          ${contact.phone ? `<tr style="background-color: #ffffff;">
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Phone:</td>
            <td style="padding: 8px 12px; color: #111827;"><a href="tel:${contact.phone}" style="color: #063970;">${contact.phone}</a></td>
          </tr>` : ""}
          ${contact.company ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Company:</td>
            <td style="padding: 8px 12px; color: #111827;">${contact.company}</td>
          </tr>` : ""}
          ${contact.serviceInterest ? `<tr style="background-color: #ffffff;">
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Service:</td>
            <td style="padding: 8px 12px; color: #111827;">${contact.serviceInterest}</td>
          </tr>` : ""}
          ${contact.areaOfInquiry ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Area:</td>
            <td style="padding: 8px 12px; color: #111827;">${contact.areaOfInquiry}</td>
          </tr>` : ""}
          ${contact.message ? `<tr style="background-color: #ffffff;">
            <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
            <td style="padding: 8px 12px; color: #111827; white-space: pre-wrap;">${contact.message}</td>
          </tr>` : ""}
        </table>
      </div>
      <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>This email was sent from the Excel Facility Services Group website contact form.</p>
        <p>Submitted on ${new Date(contact.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" })} EST</p>
      </div>
    </div>
  `;

  const textContent = `New ${inquiryLabel}\n\nName: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}${contact.phone ? `\nPhone: ${contact.phone}` : ""}${contact.company ? `\nCompany: ${contact.company}` : ""}${contact.serviceInterest ? `\nService: ${contact.serviceInterest}` : ""}${contact.areaOfInquiry ? `\nArea: ${contact.areaOfInquiry}` : ""}${contact.message ? `\nMessage: ${contact.message}` : ""}`;

  const msg: sgMail.MailDataRequired = {
    to: toRecipients,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    text: textContent,
    html: htmlContent,
    replyTo: { email: contact.email, name: `${contact.firstName} ${contact.lastName}` },
  };

  if (ccRecipients.length > 0) {
    msg.cc = ccRecipients;
  }

  try {
    await sgMail.send(msg);
    console.log(`Contact form email sent to ${toRecipients.map(r => r.email).join(", ")}${ccRecipients.length > 0 ? ` (CC: ${ccRecipients.map(r => r.email).join(", ")})` : ""}`);
  } catch (error: any) {
    console.error("SendGrid email error:", error?.response?.body || error.message);
  }
}

export async function getBlogApprovalRecipients() {
  const settings = await storage.getFormEmailSettings("blog_approval");
  const active = settings.filter(s => s.isActive);
  const to = active.filter(s => s.ccType === "to").map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));
  const cc = active.filter(s => s.ccType === "cc").map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));
  if (to.length === 0 && cc.length > 0) to.push(cc.shift()!);
  return { to, cc };
}

async function getAdminNotificationRecipients() {
  const admins = await storage.getAdminUsers();
  const to = admins
    .filter(a => a.isActive && a.email)
    .map(a => ({ email: a.email, name: a.username || undefined }));
  return { to, cc: [] as { email: string; name?: string }[] };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getAppBaseUrl(): string {
  if (process.env.PUBLIC_APP_URL) return process.env.PUBLIC_APP_URL.replace(/\/$/, "");
  if (process.env.REPLIT_DEV_DOMAIN) return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  return "https://www.efsgnj.com";
}

export async function sendPasswordResetEmail(to: { email: string; name?: string }, token: string): Promise<void> {
  if (!SENDGRID_API_KEY) { console.warn("SendGrid not configured — skipping password reset email"); return; }

  const resetUrl = `${getAppBaseUrl()}/admin/reset-password?token=${encodeURIComponent(token)}`;
  const safeName = to.name ? escapeHtml(to.name) : "there";
  const subject = "Reset your Excel Facility Services admin password";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #063970; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Reset Your Password</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="color: #111827; font-size: 15px;">Hi ${safeName},</p>
        <p style="color: #111827; font-size: 15px;">We received a request to reset the password for your Excel Facility Services admin account (<strong>${escapeHtml(to.email)}</strong>).</p>
        <p style="color: #111827; font-size: 15px;">Click the button below to set a new password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background-color: #0A5EB9; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #6b7280; font-size: 13px;">Or copy this link into your browser:<br/><a href="${resetUrl}" style="color: #063970; word-break: break-all;">${resetUrl}</a></p>
        <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">If you didn't request a password reset, you can safely ignore this email — your password won't change.</p>
      </div>
      <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>Excel Facility Services Group</p>
      </div>
    </div>
  `;

  const text = `Reset Your Password\n\nHi ${to.name || "there"},\n\nWe received a request to reset the password for your admin account (${to.email}).\n\nUse the link below to set a new password. It expires in 1 hour.\n\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`;

  const msg: sgMail.MailDataRequired = {
    to: { email: to.email, name: to.name },
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject, html, text,
    trackingSettings: { clickTracking: { enable: false, enableText: false } },
  };

  try {
    await sgMail.send(msg);
    console.log(`Password reset email sent to ${to.email}`);
  } catch (error: any) {
    console.error("SendGrid password reset email error:", error?.response?.body || error.message);
    throw error;
  }
}

export async function sendBlogApprovalRequestEmail(post: BlogPost, token: string): Promise<void> {
  if (!SENDGRID_API_KEY) { console.warn("SendGrid not configured — skipping blog approval email"); return; }
  const { to, cc } = await getBlogApprovalRecipients();
  if (to.length === 0) { console.warn("No blog_approval recipients — skipping"); return; }

  const reviewUrl = `${getAppBaseUrl()}/blog/approval/${token}`;
  const safeTitle = escapeHtml(post.title);
  const safeAuthor = post.author ? escapeHtml(post.author) : "";
  const safeExcerpt = post.excerpt ? escapeHtml(post.excerpt) : "";
  const subject = `Blog post ready for your review: ${post.title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #063970; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Blog Post Ready for Review</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="color: #111827;">A blog post is ready for your review and approval.</p>
        <p style="color: #111827;"><strong>Title:</strong> ${safeTitle}</p>
        ${safeAuthor ? `<p style="color: #111827;"><strong>Author:</strong> ${safeAuthor}</p>` : ""}
        ${safeExcerpt ? `<p style="color: #374151;"><em>${safeExcerpt}</em></p>` : ""}
        <p style="text-align: center; margin: 28px 0;">
          <a href="${reviewUrl}" style="background-color: #063970; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Review &amp; Approve</a>
        </p>
        <p style="color: #6b7280; font-size: 13px;">Or copy this link into your browser: <br/><a href="${reviewUrl}" style="color: #063970; word-break: break-all;">${reviewUrl}</a></p>
        <p style="color: #6b7280; font-size: 12px;">This review link will expire in 30 days.</p>
      </div>
    </div>
  `;
  const text = `A blog post is ready for review.\n\nTitle: ${post.title}\nAuthor: ${post.author}\n\nReview & approve: ${reviewUrl}\n\nThis link expires in 30 days.`;

  const msg: sgMail.MailDataRequired = {
    to, from: { email: FROM_EMAIL, name: FROM_NAME }, subject, html, text,
    trackingSettings: { clickTracking: { enable: false, enableText: false } },
  };
  if (cc.length > 0) msg.cc = cc;
  try {
    await sgMail.send(msg);
    console.log(`Blog approval email sent for post ${post.id}`);
  } catch (error: any) {
    console.error("SendGrid email error:", error?.response?.body || error.message);
  }
}

export async function sendBlogClientConfirmationEmail(
  post: BlogPost,
  clientEmail: string,
  action: "approved" | "changes_requested",
  feedback?: string,
): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn("SendGrid not configured — skipping client confirmation email");
    return;
  }
  const email = clientEmail.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return;
  }

  const safeTitle = escapeHtml(post.title);
  const approved = action === "approved";
  const subject = approved
    ? `Your approval was received: ${post.title}`
    : `We received your feedback: ${post.title}`;

  const headerBg = approved ? "#97CC06" : "#b45309";
  const headerColor = approved ? "#063970" : "#ffffff";
  const headerText = approved ? "Approval Received" : "Feedback Received";

  const intro = approved
    ? "Thank you — we've received your approval and the post has been published."
    : "Thank you — we've received your feedback and the team will revise the post and send you an updated version for review.";

  const safeFeedback = feedback ? escapeHtml(feedback) : "";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: ${headerBg}; padding: 20px; text-align: center;">
        <h1 style="color: ${headerColor}; margin: 0; font-size: 22px;">${headerText}</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="color: #111827;">${intro}</p>
        <p style="color: #111827;"><strong>Post:</strong> ${safeTitle}</p>
        ${!approved && safeFeedback ? `
        <div style="background-color: #ffffff; border-left: 4px solid #b45309; padding: 12px 16px; margin: 16px 0;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">Your Feedback</p>
          <p style="color: #111827; white-space: pre-wrap; margin: 0;">${safeFeedback}</p>
        </div>` : ""}
        <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">This is an automated confirmation from Excel Facility Services Group. You don't need to reply.</p>
      </div>
    </div>`;
  const text = approved
    ? `${intro}\n\nPost: ${post.title}`
    : `${intro}\n\nPost: ${post.title}${feedback ? `\n\nYour feedback:\n${feedback}` : ""}`;

  const msg: sgMail.MailDataRequired = {
    to: [{ email }],
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    html,
    text,
    trackingSettings: { clickTracking: { enable: false, enableText: false } },
  };
  try {
    await sgMail.send(msg);
    console.log(`Client confirmation email (${action}) sent to ${email} for post ${post.id}`);
  } catch (error: any) {
    console.error("SendGrid client confirmation email error:", error?.response?.body || error.message);
  }
}

export async function sendBlogApprovedEmail(post: BlogPost): Promise<void> {
  if (!SENDGRID_API_KEY) return;
  const { to, cc } = await getAdminNotificationRecipients();
  if (to.length === 0) { console.warn("No active admin recipients for approval notification"); return; }
  const liveUrl = `${getAppBaseUrl()}/resources/${post.slug}`;
  const safeTitle = escapeHtml(post.title);
  const subject = `Approved & published: ${post.title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #97CC06; padding: 20px; text-align: center;">
        <h1 style="color: #063970; margin: 0; font-size: 22px;">Blog Post Approved &amp; Published</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="color: #111827;">The following blog post has been approved and is now live:</p>
        <p style="color: #111827;"><strong>${safeTitle}</strong></p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${liveUrl}" style="background-color: #063970; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Live Post</a>
        </p>
      </div>
    </div>`;
  const text = `Blog post approved and published.\n\nTitle: ${post.title}\nLive URL: ${liveUrl}`;
  const msg: sgMail.MailDataRequired = { to, from: { email: FROM_EMAIL, name: FROM_NAME }, subject, html, text, trackingSettings: { clickTracking: { enable: false, enableText: false } } };
  if (cc.length > 0) msg.cc = cc;
  try { await sgMail.send(msg); } catch (error: any) {
    console.error("SendGrid email error:", error?.response?.body || error.message);
  }
}

export async function sendBlogChangesRequestedEmail(post: BlogPost, feedback: string): Promise<void> {
  if (!SENDGRID_API_KEY) return;
  const { to, cc } = await getAdminNotificationRecipients();
  if (to.length === 0) { console.warn("No active admin recipients for changes-requested notification"); return; }
  const subject = `Changes requested: ${post.title}`;
  const safeFeedback = escapeHtml(feedback);
  const safeTitle = escapeHtml(post.title);
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #b45309; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Changes Requested</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="color: #111827;">The client has requested changes to:</p>
        <p style="color: #111827;"><strong>${safeTitle}</strong></p>
        <div style="background-color: #ffffff; border-left: 4px solid #b45309; padding: 12px 16px; margin: 16px 0;">
          <p style="color: #6b7280; font-size: 12px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.5px;">Feedback</p>
          <p style="color: #111827; white-space: pre-wrap; margin: 0;">${safeFeedback}</p>
        </div>
        <p style="color: #6b7280; font-size: 13px;">Update the post in the admin dashboard, mark the edits as completed, then resend it for approval.</p>
      </div>
    </div>`;
  const text = `Changes requested for: ${post.title}\n\nFeedback:\n${feedback}\n\nUpdate the post and resend it for approval.`;
  const msg: sgMail.MailDataRequired = { to, from: { email: FROM_EMAIL, name: FROM_NAME }, subject, html, text, trackingSettings: { clickTracking: { enable: false, enableText: false } } };
  if (cc.length > 0) msg.cc = cc;
  try { await sgMail.send(msg); } catch (error: any) {
    console.error("SendGrid email error:", error?.response?.body || error.message);
  }
}

export async function sendVendorFormEmail(vendor: VendorRegistration): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn("SendGrid API key not configured — skipping email");
    return;
  }

  const settings = await storage.getFormEmailSettings("vendor");
  const activeSettings = settings.filter(s => s.isActive);

  if (activeSettings.length === 0) {
    console.warn("No email recipients configured for vendor form — skipping email");
    return;
  }

  const toRecipients = activeSettings
    .filter(s => s.ccType === "to")
    .map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));

  const ccRecipients = activeSettings
    .filter(s => s.ccType === "cc")
    .map(s => ({ email: s.recipientEmail, name: s.recipientName || undefined }));

  if (toRecipients.length === 0 && ccRecipients.length > 0) {
    toRecipients.push(ccRecipients.shift()!);
  }

  if (toRecipients.length === 0) {
    console.warn("No 'to' recipients for vendor form email — skipping");
    return;
  }

  const subject = `New Vendor Registration from ${vendor.companyName}`;

  const row = (label: string, value: string | null | undefined, alt = false) =>
    value ? `<tr${alt ? ' style="background-color: #ffffff;"' : ""}>
      <td style="padding: 8px 12px; font-weight: bold; color: #374151; width: 160px; vertical-align: top;">${label}:</td>
      <td style="padding: 8px 12px; color: #111827; white-space: pre-wrap;">${value}</td>
    </tr>` : "";

  let alt = false;
  const nextAlt = () => { const v = alt; alt = !alt; return v; };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #063970; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Vendor Registration</h1>
      </div>
      <div style="padding: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          ${row("Company Name", vendor.companyName, nextAlt())}
          ${row("Contact Name", vendor.contactName, nextAlt())}
          ${row("Email", vendor.email ? `<a href="mailto:${vendor.email}" style="color: #063970;">${vendor.email}</a>` : null, nextAlt())}
          ${row("Phone", vendor.phone ? `<a href="tel:${vendor.phone}" style="color: #063970;">${vendor.phone}</a>` : null, nextAlt())}
          ${row("Address", [vendor.address, vendor.city, vendor.state, vendor.zipCode].filter(Boolean).join(", ") || null, nextAlt())}
          ${row("Services Offered", vendor.servicesOffered, nextAlt())}
          ${row("Certifications", vendor.certifications, nextAlt())}
          ${row("Years in Business", vendor.yearsInBusiness, nextAlt())}
          ${row("Insurance Info", vendor.insuranceInfo, nextAlt())}
          ${row("References", vendor.references, nextAlt())}
          ${row("Additional Info", vendor.additionalInfo, nextAlt())}
        </table>
      </div>
      <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>This email was sent from the Excel Facility Services Group website vendor registration form.</p>
        <p>Submitted on ${new Date(vendor.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" })} EST</p>
      </div>
    </div>
  `;

  const addressLine = [vendor.address, vendor.city, vendor.state, vendor.zipCode].filter(Boolean).join(", ");
  const textContent = `New Vendor Registration\n\nCompany Name: ${vendor.companyName}\nContact Name: ${vendor.contactName}\nEmail: ${vendor.email}\nPhone: ${vendor.phone}${addressLine ? `\nAddress: ${addressLine}` : ""}${vendor.servicesOffered ? `\nServices Offered: ${vendor.servicesOffered}` : ""}${vendor.certifications ? `\nCertifications: ${vendor.certifications}` : ""}${vendor.yearsInBusiness ? `\nYears in Business: ${vendor.yearsInBusiness}` : ""}${vendor.insuranceInfo ? `\nInsurance Info: ${vendor.insuranceInfo}` : ""}${vendor.references ? `\nReferences: ${vendor.references}` : ""}${vendor.additionalInfo ? `\nAdditional Info: ${vendor.additionalInfo}` : ""}`;

  const msg: sgMail.MailDataRequired = {
    to: toRecipients,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    text: textContent,
    html: htmlContent,
    replyTo: { email: vendor.email, name: vendor.contactName },
  };

  if (ccRecipients.length > 0) {
    msg.cc = ccRecipients;
  }

  try {
    await sgMail.send(msg);
    console.log(`Vendor form email sent to ${toRecipients.map(r => r.email).join(", ")}${ccRecipients.length > 0 ? ` (CC: ${ccRecipients.map(r => r.email).join(", ")})` : ""}`);
  } catch (error: any) {
    console.error("SendGrid email error:", error?.response?.body || error.message);
  }
}
