import { 
  type User, type InsertUser,
  type Contact, type InsertContact,
  type VendorRegistration, type InsertVendorRegistration,
  type VendorNote, type InsertVendorNote,
  type ContactNote, type InsertContactNote,
  type AdminUser, type InsertAdminUser,
  type BlogPost, type InsertBlogPost,
  users, contacts, vendorRegistrations, vendorNotes, contactNotes, adminUsers, blogPosts
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
    const [admin] = await db.select().from(adminUsers).where(
      and(eq(adminUsers.username, username), eq(adminUsers.isActive, true))
    );
    return admin;
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(
      and(eq(adminUsers.email, email), eq(adminUsers.isActive, true))
    );
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
    await db.delete(contacts).where(eq(contacts.id, id));
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
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
}

export const storage = new DatabaseStorage();
