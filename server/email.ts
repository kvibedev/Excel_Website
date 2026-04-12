import sgMail from "@sendgrid/mail";
import { storage } from "./storage";
import type { Contact, VendorRegistration } from "@shared/schema";

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
