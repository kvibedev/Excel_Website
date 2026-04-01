import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { insertContactSchema, insertVendorRegistrationSchema, insertVendorNoteSchema, insertContactNoteSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    adminId?: number;
    adminUsername?: string;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "crm-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await storage.getAdminByEmail(username);
      
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.session.adminId = admin.id;
      req.session.adminUsername = admin.username;
      
      res.json({ success: true, username: admin.username });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if (req.session.adminId) {
      res.json({ authenticated: true, username: req.session.adminUsername });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.post("/api/admin/setup", async (req, res) => {
    try {
      const existing = await storage.getAdminByUsername("admin");
      if (existing) {
        return res.status(400).json({ error: "Admin already exists" });
      }
      
      const { username, password, email } = req.body;
      const admin = await storage.createAdminUser({ username, password, email });
      res.json({ success: true, username: admin.username });
    } catch (error) {
      res.status(500).json({ error: "Setup failed" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const parsed = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(parsed);
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.patch("/api/admin/contacts/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const contact = await storage.updateContactStatus(id, status);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContact(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  app.get("/api/admin/contacts/:id/notes", requireAdmin, async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const notes = await storage.getContactNotes(contactId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.post("/api/admin/contacts/:id/notes", requireAdmin, async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const parsed = insertContactNoteSchema.parse({ ...req.body, contactId });
      const note = await storage.createContactNote(parsed);
      res.json(note);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create note" });
    }
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const parsed = insertVendorRegistrationSchema.parse(req.body);
      const vendor = await storage.createVendorRegistration(parsed);
      res.json(vendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create vendor registration" });
    }
  });

  app.get("/api/admin/vendors", requireAdmin, async (req, res) => {
    try {
      const vendors = await storage.getVendorRegistrations();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vendors" });
    }
  });

  app.get("/api/admin/vendors/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vendor = await storage.getVendorRegistration(id);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vendor" });
    }
  });

  app.patch("/api/admin/vendors/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const vendor = await storage.updateVendorStatus(id, status);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ error: "Failed to update vendor" });
    }
  });

  app.delete("/api/admin/vendors/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteVendorRegistration(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete vendor" });
    }
  });

  app.get("/api/admin/vendors/:id/notes", requireAdmin, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      const notes = await storage.getVendorNotes(vendorId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.post("/api/admin/vendors/:id/notes", requireAdmin, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      const parsed = insertVendorNoteSchema.parse({ ...req.body, vendorId });
      const note = await storage.createVendorNote(parsed);
      res.json(note);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create note" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const vendors = await storage.getVendorRegistrations();
      const posts = await storage.getBlogPosts();
      
      const newContacts = contacts.filter(c => c.status === "new").length;
      const newVendors = vendors.filter(v => v.status === "new").length;
      const publishedPosts = posts.filter(p => p.status === "published").length;
      
      res.json({
        totalContacts: contacts.length,
        totalVendors: vendors.length,
        newContacts,
        newVendors,
        publishedPosts,
        totalPosts: posts.length,
        recentContacts: contacts.slice(0, 5),
        recentVendors: vendors.slice(0, 5),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/blog", requireAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/admin/blog", requireAdmin, async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.parse(req.body);
      const existing = await storage.getBlogPostBySlug(parsed.slug);
      if (existing) {
        return res.status(400).json({ error: "A post with this slug already exists" });
      }
      if (parsed.status === "published" && !parsed.publishedAt) {
        parsed.publishedAt = new Date();
      }
      const post = await storage.createBlogPost(parsed);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.patch("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateSchema = insertBlogPostSchema.partial();
      let updates: Partial<typeof insertBlogPostSchema._type>;
      try {
        updates = updateSchema.parse(req.body);
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          return res.status(400).json({ error: validationError.errors });
        }
        throw validationError;
      }

      const existing = await storage.getBlogPost(id);
      if (!existing) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      if (updates.slug && updates.slug !== existing.slug) {
        const slugConflict = await storage.getBlogPostBySlug(updates.slug);
        if (slugConflict) {
          return res.status(400).json({ error: "A post with this slug already exists" });
        }
      }

      if (updates.status === "published" && !updates.publishedAt && existing.status !== "published") {
        updates.publishedAt = new Date();
      }

      const post = await storage.updateBlogPost(id, updates);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.get("/api/admin/contacts/export/csv", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Company", "Inquiry Type", "Service Interest", "Status", "Created At"];
      const rows = contacts.map(c => [
        c.id,
        c.firstName,
        c.lastName,
        c.email,
        c.phone || "",
        c.company || "",
        c.inquiryType || "",
        c.serviceInterest || "",
        c.status,
        c.createdAt.toISOString()
      ]);
      
      const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=contacts.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export contacts" });
    }
  });

  app.get("/api/admin/vendors/export/csv", requireAdmin, async (req, res) => {
    try {
      const vendors = await storage.getVendorRegistrations();
      const headers = ["ID", "Company Name", "Contact Name", "Email", "Phone", "City", "State", "Services Offered", "Status", "Created At"];
      const rows = vendors.map(v => [
        v.id,
        v.companyName,
        v.contactName,
        v.email,
        v.phone,
        v.city || "",
        v.state || "",
        v.servicesOffered || "",
        v.status,
        v.createdAt.toISOString()
      ]);
      
      const csv = [headers.join(","), ...rows.map(r => r.map(val => `"${val}"`).join(","))].join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=vendors.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export vendors" });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || post.status !== "published") {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
