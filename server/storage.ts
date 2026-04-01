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
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAdminUser(id: number): Promise<AdminUser | undefined>;
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<void>;
  getContactNotes(contactId: number): Promise<ContactNote[]>;
  createContactNote(note: InsertContactNote): Promise<ContactNote>;
  
  getVendorRegistrations(): Promise<VendorRegistration[]>;
  getVendorRegistration(id: number): Promise<VendorRegistration | undefined>;
  createVendorRegistration(vendor: InsertVendorRegistration): Promise<VendorRegistration>;
  updateVendorStatus(id: number, status: string): Promise<VendorRegistration | undefined>;
  deleteVendorRegistration(id: number): Promise<void>;
  getVendorNotes(vendorId: number): Promise<VendorNote[]>;
  createVendorNote(note: InsertVendorNote): Promise<VendorNote>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
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

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
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
