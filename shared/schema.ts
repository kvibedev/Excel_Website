import { sql } from "drizzle-orm";
import { pgTable, pgEnum, text, varchar, timestamp, integer, serial, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const ADMIN_ROLES = ["super_admin", "admin", "editor", "viewer"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const adminRoleEnum = pgEnum("admin_role", ADMIN_ROLES);

export const ROLE_HIERARCHY: Record<AdminRole, number> = {
  super_admin: 4,
  admin: 3,
  editor: 2,
  viewer: 1,
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: adminRoleEnum("role").notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpiresAt: timestamp("password_reset_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  isActive: true,
  passwordResetToken: true,
  passwordResetExpiresAt: true,
  createdAt: true,
});

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message"),
  inquiryType: text("inquiry_type"),
  serviceInterest: text("service_interest"),
  areaOfInquiry: text("area_of_inquiry"),
  status: text("status").default("new").notNull(),
  assignedTo: text("assigned_to"),
  followUpDate: timestamp("follow_up_date"),
  submittedFromPath: text("submitted_from_path"),
  visitorId: text("visitor_id"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrerUrl: text("referrer_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  status: true,
  visitorId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const contactBlogAttributions = pgTable("contact_blog_attributions", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  blogPostId: integer("blog_post_id").notNull().references(() => blogPosts.id),
  viewedAt: timestamp("viewed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactBlogAttributionSchema = createInsertSchema(contactBlogAttributions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactBlogAttribution = z.infer<typeof insertContactBlogAttributionSchema>;
export type ContactBlogAttribution = typeof contactBlogAttributions.$inferSelect;

export type ContactAttributedPost = {
  blogPostId: number;
  title: string;
  slug: string;
  viewedAt: Date;
};

export const vendorRegistrations = pgTable("vendor_registrations", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  servicesOffered: text("services_offered"),
  certifications: text("certifications"),
  yearsInBusiness: text("years_in_business"),
  insuranceInfo: text("insurance_info"),
  references: text("references"),
  additionalInfo: text("additional_info"),
  status: text("status").default("new").notNull(),
  assignedTo: text("assigned_to"),
  followUpDate: timestamp("follow_up_date"),
  submittedFromPath: text("submitted_from_path"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrerUrl: text("referrer_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVendorRegistrationSchema = createInsertSchema(vendorRegistrations).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVendorRegistration = z.infer<typeof insertVendorRegistrationSchema>;
export type VendorRegistration = typeof vendorRegistrations.$inferSelect;

export const vendorNotes = pgTable("vendor_notes", {
  id: serial("id").primaryKey(),
  vendorId: integer("vendor_id").notNull().references(() => vendorRegistrations.id),
  note: text("note").notNull(),
  authorName: text("author_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVendorNoteSchema = createInsertSchema(vendorNotes).omit({
  id: true,
  createdAt: true,
});

export type InsertVendorNote = z.infer<typeof insertVendorNoteSchema>;
export type VendorNote = typeof vendorNotes.$inferSelect;

export const contactNotes = pgTable("contact_notes", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  note: text("note").notNull(),
  authorName: text("author_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactNoteSchema = createInsertSchema(contactNotes).omit({
  id: true,
  createdAt: true,
});

export type InsertContactNote = z.infer<typeof insertContactNoteSchema>;
export type ContactNote = typeof contactNotes.$inferSelect;

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category"),
  tags: text("tags"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  metaDescription: text("meta_description"),
  secondaryKeywords: text("secondary_keywords"),
  status: text("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  scheduledAt: timestamp("scheduled_at"),
  approvalStatus: text("approval_status").default("none").notNull(),
  approvalToken: text("approval_token"),
  approvalTokenExpiresAt: timestamp("approval_token_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const BLOG_STATUSES = ["draft", "scheduled", "published"] as const;
export type BlogStatus = (typeof BLOG_STATUSES)[number];

export const BLOG_APPROVAL_STATUSES = ["none", "pending", "approved", "changes_requested"] as const;
export type BlogApprovalStatus = (typeof BLOG_APPROVAL_STATUSES)[number];

export const blogApprovalHistory = pgTable("blog_approval_history", {
  id: serial("id").primaryKey(),
  blogPostId: integer("blog_post_id").notNull().references(() => blogPosts.id),
  action: text("action").notNull(),
  feedback: text("feedback"),
  performedBy: text("performed_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogApprovalHistorySchema = createInsertSchema(blogApprovalHistory).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogApprovalHistory = z.infer<typeof insertBlogApprovalHistorySchema>;
export type BlogApprovalHistory = typeof blogApprovalHistory.$inferSelect;

export const BLOG_APPROVAL_ACTIONS = [
  "sent_for_approval",
  "approved",
  "changes_requested",
  "edits_completed",
] as const;
export type BlogApprovalAction = (typeof BLOG_APPROVAL_ACTIONS)[number];

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  imageUrl: z.string().trim().min(1, "Featured image is required"),
  videoUrl: z
    .string()
    .trim()
    .max(2048)
    .regex(
      /^(?:https?:\/\/)(?:(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)[A-Za-z0-9_-]{6,}|youtu\.be\/[A-Za-z0-9_-]{6,}|(?:www\.|player\.)?vimeo\.com\/(?:video\/)?\d+)/i,
      "Must be a YouTube or Vimeo URL"
    )
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const blogPostViews = pgTable("blog_post_views", {
  id: serial("id").primaryKey(),
  blogPostId: integer("blog_post_id").notNull().references(() => blogPosts.id),
  visitorId: text("visitor_id").notNull(),
  sessionId: text("session_id").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  timeOnPageMs: integer("time_on_page_ms").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  blogPostIdIdx: index("blog_post_views_blog_post_id_idx").on(table.blogPostId),
  blogPostIdCreatedAtIdx: index("blog_post_views_blog_post_id_created_at_idx").on(table.blogPostId, table.createdAt),
  blogPostIdVisitorIdCreatedAtIdx: index("blog_post_views_blog_post_id_visitor_id_created_at_idx").on(table.blogPostId, table.visitorId, table.createdAt),
}));

export const insertBlogPostViewSchema = createInsertSchema(blogPostViews).omit({
  id: true,
  createdAt: true,
});

export type InsertBlogPostView = z.infer<typeof insertBlogPostViewSchema>;
export type BlogPostView = typeof blogPostViews.$inferSelect;

export type BlogPostStats = {
  postId: number;
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPageMs: number;
  leads: number;
};

export type BlogPostStatsDetail = BlogPostStats & {
  series: { date: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
};

export type BlogOverviewStats = {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPageMs: number;
  series: { date: string; views: number }[];
  topPosts: {
    postId: number;
    title: string;
    slug: string;
    views: number;
    uniqueVisitors: number;
    avgTimeOnPageMs: number;
  }[];
};

export type TopBlogPostStats = BlogPostStats & {
  title: string;
  slug: string;
};

export type LeadSourceRow = {
  key: string;
  label: string;
  type: "utm" | "referrer" | "direct";
  utmSource: string | null;
  utmMedium: string | null;
  referrerDomain: string | null;
  count: number;
};

export type LeadSourceBreakdown = {
  total: number;
  rows: LeadSourceRow[];
};

export const FORM_TYPES = ["contact", "vendor", "blog_approval"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const FORM_TYPE_LABELS: Record<FormType, string> = {
  contact: "Contact Form",
  vendor: "Vendor Registration",
  blog_approval: "Blog Post Approval",
};

export const formEmailSettings = pgTable("form_email_settings", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  recipientName: text("recipient_name"),
  ccType: text("cc_type").notNull().default("to"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFormEmailSettingSchema = createInsertSchema(formEmailSettings).omit({
  id: true,
  createdAt: true,
});

export type InsertFormEmailSetting = z.infer<typeof insertFormEmailSettingSchema>;
export type FormEmailSetting = typeof formEmailSettings.$inferSelect;
