import { 
  type User, type InsertUser,
  type Contact, type InsertContact,
  type VendorRegistration, type InsertVendorRegistration,
  type VendorNote, type InsertVendorNote,
  type ContactNote, type InsertContactNote,
  type AdminUser, type InsertAdminUser,
  type BlogPost, type InsertBlogPost,
  type FormEmailSetting, type InsertFormEmailSetting,
  type BlogApprovalHistory, type InsertBlogApprovalHistory,
  type BlogPostView, type InsertBlogPostView,
  type BlogPostStats, type BlogPostStatsDetail, type BlogOverviewStats,
  type ContactBlogAttribution, type InsertContactBlogAttribution, type ContactAttributedPost,
  users, contacts, vendorRegistrations, vendorNotes, contactNotes, adminUsers, blogPosts, formEmailSettings, blogApprovalHistory, blogPostViews, contactBlogAttributions
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gt, gte, sql, inArray } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  
  getAdminUsers(): Promise<AdminUser[]>;
  updateAdminUser(id: number, data: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  deactivateAdminUser(id: number): Promise<void>;
  setPasswordResetToken(id: number, token: string, expiresAt: Date): Promise<void>;
  getAdminByResetToken(token: string): Promise<AdminUser | undefined>;
  clearPasswordResetToken(id: number, newPasswordHash: string): Promise<void>;
  consumePasswordResetToken(token: string, newPasswordHash: string): Promise<AdminUser | undefined>;

  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;
  updateContactAssignment(id: number, assignedTo: string | null, followUpDate: Date | null): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<void>;
  getContactNotes(contactId: number): Promise<ContactNote[]>;
  createContactNote(note: InsertContactNote): Promise<ContactNote>;
  deleteContactNote(id: number): Promise<void>;

  getVendorRegistrations(): Promise<VendorRegistration[]>;
  getVendorRegistration(id: number): Promise<VendorRegistration | undefined>;
  createVendorRegistration(vendor: InsertVendorRegistration): Promise<VendorRegistration>;
  updateVendorStatus(id: number, status: string): Promise<VendorRegistration | undefined>;
  updateVendorAssignment(id: number, assignedTo: string | null, followUpDate: Date | null): Promise<VendorRegistration | undefined>;
  deleteVendorRegistration(id: number): Promise<void>;
  getVendorNotes(vendorId: number): Promise<VendorNote[]>;
  createVendorNote(note: InsertVendorNote): Promise<VendorNote>;
  deleteVendorNote(id: number): Promise<void>;

  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;

  getBlogPostByApprovalToken(token: string): Promise<BlogPost | undefined>;
  consumeApprovalToken(token: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  getBlogApprovalHistory(blogPostId: number): Promise<BlogApprovalHistory[]>;
  createBlogApprovalHistory(entry: InsertBlogApprovalHistory): Promise<BlogApprovalHistory>;

  getOrCreateBlogPostView(input: InsertBlogPostView): Promise<BlogPostView>;
  updateBlogPostViewTime(id: number, visitorId: string, timeOnPageMs: number): Promise<boolean>;
  getBlogPostView(id: number): Promise<BlogPostView | undefined>;
  getRecentBlogViewsForVisitor(visitorId: string, sinceDays: number): Promise<{ blogPostId: number; viewedAt: Date }[]>;
  getBlogPostStatsForAll(): Promise<BlogPostStats[]>;
  getBlogPostStatsDetail(postId: number, sinceDays: number | null): Promise<BlogPostStatsDetail>;
  getBlogOverviewStats(sinceDays: number | null): Promise<BlogOverviewStats>;

  setContactVisitorId(id: number, visitorId: string): Promise<void>;
  createContactBlogAttributions(entries: InsertContactBlogAttribution[]): Promise<void>;
  getContactBlogAttributions(contactId: number): Promise<ContactAttributedPost[]>;

  getFormEmailSettings(formType: string): Promise<FormEmailSetting[]>;
  getAllFormEmailSettings(): Promise<FormEmailSetting[]>;
  createFormEmailSetting(setting: InsertFormEmailSetting): Promise<FormEmailSetting>;
  updateFormEmailSetting(id: number, data: Partial<InsertFormEmailSetting>): Promise<FormEmailSetting | undefined>;
  deleteFormEmailSetting(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAdminUser(id: number): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return admin;
  }

  async createAdminUser(admin: InsertAdminUser): Promise<AdminUser> {
    const [newAdmin] = await db.insert(adminUsers).values(admin).returning();
    return newAdmin;
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return db.select().from(adminUsers).orderBy(adminUsers.username);
  }

  async updateAdminUser(id: number, data: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const [updated] = await db
      .update(adminUsers)
      .set(data)
      .where(eq(adminUsers.id, id))
      .returning();
    return updated;
  }

  async deactivateAdminUser(id: number): Promise<void> {
    await db.update(adminUsers).set({ isActive: false }).where(eq(adminUsers.id, id));
  }

  async setPasswordResetToken(id: number, token: string, expiresAt: Date): Promise<void> {
    await db
      .update(adminUsers)
      .set({ passwordResetToken: token, passwordResetExpiresAt: expiresAt })
      .where(eq(adminUsers.id, id));
  }

  async getAdminByResetToken(token: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.passwordResetToken, token));
    return admin;
  }

  async clearPasswordResetToken(id: number, newPasswordHash: string): Promise<void> {
    await db
      .update(adminUsers)
      .set({ password: newPasswordHash, passwordResetToken: null, passwordResetExpiresAt: null })
      .where(eq(adminUsers.id, id));
  }

  async consumePasswordResetToken(token: string, newPasswordHash: string): Promise<AdminUser | undefined> {
    const [updated] = await db
      .update(adminUsers)
      .set({ password: newPasswordHash, passwordResetToken: null, passwordResetExpiresAt: null })
      .where(
        and(
          eq(adminUsers.passwordResetToken, token),
          eq(adminUsers.isActive, true),
          gt(adminUsers.passwordResetExpiresAt, new Date())
        )
      )
      .returning();
    return updated;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const [updated] = await db
      .update(contacts)
      .set({ status, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    return updated;
  }

  async updateContactAssignment(id: number, assignedTo: string | null, followUpDate: Date | null): Promise<Contact | undefined> {
    const [updated] = await db
      .update(contacts)
      .set({ assignedTo, followUpDate, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    return updated;
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(contactNotes).where(eq(contactNotes.contactId, id));
    await db.delete(contactBlogAttributions).where(eq(contactBlogAttributions.contactId, id));
    await db.delete(contacts).where(eq(contacts.id, id));
  }

  async setContactVisitorId(id: number, visitorId: string): Promise<void> {
    await db.update(contacts).set({ visitorId }).where(eq(contacts.id, id));
  }

  async createContactBlogAttributions(entries: InsertContactBlogAttribution[]): Promise<void> {
    if (entries.length === 0) return;
    await db.insert(contactBlogAttributions).values(entries);
  }

  async getContactBlogAttributions(contactId: number): Promise<ContactAttributedPost[]> {
    const rows = await db
      .select({
        blogPostId: contactBlogAttributions.blogPostId,
        viewedAt: contactBlogAttributions.viewedAt,
        title: blogPosts.title,
        slug: blogPosts.slug,
      })
      .from(contactBlogAttributions)
      .innerJoin(blogPosts, eq(contactBlogAttributions.blogPostId, blogPosts.id))
      .where(eq(contactBlogAttributions.contactId, contactId))
      .orderBy(desc(contactBlogAttributions.viewedAt));
    return rows;
  }

  async getRecentBlogViewsForVisitor(visitorId: string, sinceDays: number): Promise<{ blogPostId: number; viewedAt: Date }[]> {
    const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
    const rows = await db
      .select({
        blogPostId: blogPostViews.blogPostId,
        viewedAt: sql<Date>`max(${blogPostViews.createdAt})`,
      })
      .from(blogPostViews)
      .where(and(eq(blogPostViews.visitorId, visitorId), gte(blogPostViews.createdAt, since)))
      .groupBy(blogPostViews.blogPostId)
      .orderBy(desc(sql`max(${blogPostViews.createdAt})`))
      .limit(10);
    return rows.map((r) => ({ blogPostId: r.blogPostId, viewedAt: new Date(r.viewedAt as any) }));
  }

  async getContactNotes(contactId: number): Promise<ContactNote[]> {
    return db.select().from(contactNotes).where(eq(contactNotes.contactId, contactId)).orderBy(desc(contactNotes.createdAt));
  }

  async createContactNote(note: InsertContactNote): Promise<ContactNote> {
    const [newNote] = await db.insert(contactNotes).values(note).returning();
    return newNote;
  }

  async deleteContactNote(id: number): Promise<void> {
    await db.delete(contactNotes).where(eq(contactNotes.id, id));
  }

  async getVendorRegistrations(): Promise<VendorRegistration[]> {
    return db.select().from(vendorRegistrations).orderBy(desc(vendorRegistrations.createdAt));
  }

  async getVendorRegistration(id: number): Promise<VendorRegistration | undefined> {
    const [vendor] = await db.select().from(vendorRegistrations).where(eq(vendorRegistrations.id, id));
    return vendor;
  }

  async createVendorRegistration(vendor: InsertVendorRegistration): Promise<VendorRegistration> {
    const [newVendor] = await db.insert(vendorRegistrations).values(vendor).returning();
    return newVendor;
  }

  async updateVendorStatus(id: number, status: string): Promise<VendorRegistration | undefined> {
    const [updated] = await db
      .update(vendorRegistrations)
      .set({ status, updatedAt: new Date() })
      .where(eq(vendorRegistrations.id, id))
      .returning();
    return updated;
  }

  async updateVendorAssignment(id: number, assignedTo: string | null, followUpDate: Date | null): Promise<VendorRegistration | undefined> {
    const [updated] = await db
      .update(vendorRegistrations)
      .set({ assignedTo, followUpDate, updatedAt: new Date() })
      .where(eq(vendorRegistrations.id, id))
      .returning();
    return updated;
  }

  async deleteVendorRegistration(id: number): Promise<void> {
    await db.delete(vendorNotes).where(eq(vendorNotes.vendorId, id));
    await db.delete(vendorRegistrations).where(eq(vendorRegistrations.id, id));
  }

  async getVendorNotes(vendorId: number): Promise<VendorNote[]> {
    return db.select().from(vendorNotes).where(eq(vendorNotes.vendorId, vendorId)).orderBy(desc(vendorNotes.createdAt));
  }

  async createVendorNote(note: InsertVendorNote): Promise<VendorNote> {
    const [newNote] = await db.insert(vendorNotes).values(note).returning();
    return newNote;
  }

  async deleteVendorNote(id: number): Promise<void> {
    await db.delete(vendorNotes).where(eq(vendorNotes.id, id));
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogApprovalHistory).where(eq(blogApprovalHistory.blogPostId, id));
    await db.delete(blogPostViews).where(eq(blogPostViews.blogPostId, id));
    await db.delete(contactBlogAttributions).where(eq(contactBlogAttributions.blogPostId, id));
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getOrCreateBlogPostView(input: InsertBlogPostView): Promise<BlogPostView> {
    const [existing] = await db.select().from(blogPostViews)
      .where(and(
        eq(blogPostViews.blogPostId, input.blogPostId),
        eq(blogPostViews.sessionId, input.sessionId),
      ))
      .orderBy(desc(blogPostViews.createdAt))
      .limit(1);
    if (existing) return existing;
    const [created] = await db.insert(blogPostViews).values(input).returning();
    return created;
  }

  async updateBlogPostViewTime(id: number, visitorId: string, timeOnPageMs: number): Promise<boolean> {
    const clamped = Math.max(0, Math.min(timeOnPageMs, 6 * 60 * 60 * 1000));
    const result = await db.update(blogPostViews)
      .set({ timeOnPageMs: clamped })
      .where(and(
        eq(blogPostViews.id, id),
        eq(blogPostViews.visitorId, visitorId),
        sql`${blogPostViews.timeOnPageMs} < ${clamped}`,
      ))
      .returning({ id: blogPostViews.id });
    return result.length > 0;
  }

  async getBlogPostView(id: number): Promise<BlogPostView | undefined> {
    const [view] = await db.select().from(blogPostViews).where(eq(blogPostViews.id, id));
    return view;
  }

  async getBlogPostStatsForAll(): Promise<BlogPostStats[]> {
    const rows = await db
      .select({
        postId: blogPostViews.blogPostId,
        totalViews: sql<number>`count(*)::int`,
        uniqueVisitors: sql<number>`count(distinct ${blogPostViews.visitorId})::int`,
        avgTimeOnPageMs: sql<number>`coalesce(avg(nullif(${blogPostViews.timeOnPageMs}, 0)), 0)::int`,
      })
      .from(blogPostViews)
      .groupBy(blogPostViews.blogPostId);

    const leadRows = await db
      .select({
        postId: contactBlogAttributions.blogPostId,
        leads: sql<number>`count(distinct ${contactBlogAttributions.contactId})::int`,
      })
      .from(contactBlogAttributions)
      .groupBy(contactBlogAttributions.blogPostId);
    const leadsByPost = new Map<number, number>();
    for (const r of leadRows) leadsByPost.set(r.postId, r.leads);

    const byPost = new Map<number, BlogPostStats>();
    for (const r of rows) {
      byPost.set(r.postId, { ...r, leads: leadsByPost.get(r.postId) ?? 0 });
    }
    // Include posts that have leads but no views yet
    leadsByPost.forEach((leads, postId) => {
      if (!byPost.has(postId)) {
        byPost.set(postId, { postId, totalViews: 0, uniqueVisitors: 0, avgTimeOnPageMs: 0, leads });
      }
    });
    return Array.from(byPost.values());
  }

  async getBlogPostStatsDetail(postId: number, sinceDays: number | null): Promise<BlogPostStatsDetail> {
    const sinceDate = sinceDays != null ? new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000) : null;
    const conditions = sinceDate
      ? and(eq(blogPostViews.blogPostId, postId), gte(blogPostViews.createdAt, sinceDate))
      : eq(blogPostViews.blogPostId, postId);

    const [totals] = await db
      .select({
        totalViews: sql<number>`count(*)::int`,
        uniqueVisitors: sql<number>`count(distinct ${blogPostViews.visitorId})::int`,
        avgTimeOnPageMs: sql<number>`coalesce(avg(nullif(${blogPostViews.timeOnPageMs}, 0)), 0)::int`,
      })
      .from(blogPostViews)
      .where(conditions);

    const seriesRows = await db
      .select({
        date: sql<string>`to_char(date_trunc('day', ${blogPostViews.createdAt}), 'YYYY-MM-DD')`,
        views: sql<number>`count(*)::int`,
      })
      .from(blogPostViews)
      .where(conditions)
      .groupBy(sql`date_trunc('day', ${blogPostViews.createdAt})`)
      .orderBy(sql`date_trunc('day', ${blogPostViews.createdAt})`);

    const referrerRows = await db
      .select({
        referrer: sql<string>`coalesce(nullif(${blogPostViews.referrer}, ''), '(direct)')`,
        count: sql<number>`count(*)::int`,
      })
      .from(blogPostViews)
      .where(conditions)
      .groupBy(sql`coalesce(nullif(${blogPostViews.referrer}, ''), '(direct)')`)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    const leadsCondition = sinceDate
      ? and(eq(contactBlogAttributions.blogPostId, postId), gte(contactBlogAttributions.createdAt, sinceDate))
      : eq(contactBlogAttributions.blogPostId, postId);
    const [leadsRow] = await db
      .select({ leads: sql<number>`count(distinct ${contactBlogAttributions.contactId})::int` })
      .from(contactBlogAttributions)
      .where(leadsCondition);

    return {
      postId,
      totalViews: totals?.totalViews ?? 0,
      uniqueVisitors: totals?.uniqueVisitors ?? 0,
      avgTimeOnPageMs: totals?.avgTimeOnPageMs ?? 0,
      leads: leadsRow?.leads ?? 0,
      series: seriesRows,
      topReferrers: referrerRows,
    };
  }

  async getBlogOverviewStats(sinceDays: number | null): Promise<BlogOverviewStats> {
    const sinceDate = sinceDays != null ? new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000) : null;
    const whereClause = sinceDate ? gte(blogPostViews.createdAt, sinceDate) : undefined;

    const [totals] = await db
      .select({
        totalViews: sql<number>`count(*)::int`,
        uniqueVisitors: sql<number>`count(distinct ${blogPostViews.visitorId})::int`,
        avgTimeOnPageMs: sql<number>`coalesce(avg(nullif(${blogPostViews.timeOnPageMs}, 0)), 0)::int`,
      })
      .from(blogPostViews)
      .where(whereClause as any);

    const seriesRows = await db
      .select({
        date: sql<string>`to_char(date_trunc('day', ${blogPostViews.createdAt}), 'YYYY-MM-DD')`,
        views: sql<number>`count(*)::int`,
      })
      .from(blogPostViews)
      .where(whereClause as any)
      .groupBy(sql`date_trunc('day', ${blogPostViews.createdAt})`)
      .orderBy(sql`date_trunc('day', ${blogPostViews.createdAt})`);

    const topRows = await db
      .select({
        postId: blogPostViews.blogPostId,
        title: blogPosts.title,
        slug: blogPosts.slug,
        views: sql<number>`count(*)::int`,
        uniqueVisitors: sql<number>`count(distinct ${blogPostViews.visitorId})::int`,
        avgTimeOnPageMs: sql<number>`coalesce(avg(nullif(${blogPostViews.timeOnPageMs}, 0)), 0)::int`,
      })
      .from(blogPostViews)
      .innerJoin(blogPosts, eq(blogPosts.id, blogPostViews.blogPostId))
      .where(whereClause as any)
      .groupBy(blogPostViews.blogPostId, blogPosts.title, blogPosts.slug)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    return {
      totalViews: totals?.totalViews ?? 0,
      uniqueVisitors: totals?.uniqueVisitors ?? 0,
      avgTimeOnPageMs: totals?.avgTimeOnPageMs ?? 0,
      series: seriesRows,
      topPosts: topRows,
    };
  }

  async getBlogPostByApprovalToken(token: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.approvalToken, token));
    return post;
  }

  async consumeApprovalToken(token: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.approvalToken, token))
      .returning();
    return updated;
  }

  async getBlogApprovalHistory(blogPostId: number): Promise<BlogApprovalHistory[]> {
    return db.select().from(blogApprovalHistory)
      .where(eq(blogApprovalHistory.blogPostId, blogPostId))
      .orderBy(desc(blogApprovalHistory.createdAt));
  }

  async createBlogApprovalHistory(entry: InsertBlogApprovalHistory): Promise<BlogApprovalHistory> {
    const [created] = await db.insert(blogApprovalHistory).values(entry).returning();
    return created;
  }

  async getFormEmailSettings(formType: string): Promise<FormEmailSetting[]> {
    return db.select().from(formEmailSettings)
      .where(eq(formEmailSettings.formType, formType))
      .orderBy(desc(formEmailSettings.createdAt));
  }

  async getAllFormEmailSettings(): Promise<FormEmailSetting[]> {
    return db.select().from(formEmailSettings).orderBy(formEmailSettings.formType, desc(formEmailSettings.createdAt));
  }

  async createFormEmailSetting(setting: InsertFormEmailSetting): Promise<FormEmailSetting> {
    const [created] = await db.insert(formEmailSettings).values(setting).returning();
    return created;
  }

  async updateFormEmailSetting(id: number, data: Partial<InsertFormEmailSetting>): Promise<FormEmailSetting | undefined> {
    const [updated] = await db
      .update(formEmailSettings)
      .set(data)
      .where(eq(formEmailSettings.id, id))
      .returning();
    return updated;
  }

  async deleteFormEmailSetting(id: number): Promise<void> {
    await db.delete(formEmailSettings).where(eq(formEmailSettings.id, id));
  }
}

export const storage = new DatabaseStorage();
