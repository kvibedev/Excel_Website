import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertContactSchema, insertVendorRegistrationSchema, insertVendorNoteSchema, insertContactNoteSchema, insertBlogPostSchema, ROLE_HIERARCHY, type AdminRole } from "@shared/schema";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    adminId?: number;
    adminUsername?: string;
    adminRole?: string;
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireAtLeast(minRole: AdminRole) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.adminId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userRole = (req.session.adminRole || "viewer") as AdminRole;
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] || 0;
    if (userLevel < requiredLevel) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "crm-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  // ── Auth ────────────────────────────────────────────────────────────────────

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Please enter both email and password" });
      }

      const adminCount = await storage.getAdminUsers();
      if (adminCount.length === 0) {
        return res.status(503).json({ error: "No admin accounts have been created yet. Please contact your system administrator." });
      }

      const admin = await storage.getAdminByEmail(username);
      if (!admin) {
        return res.status(401).json({ error: "No account found with that email address" });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Incorrect password. Please try again." });
      }

      req.session.adminId = admin.id;
      req.session.adminUsername = admin.username;
      req.session.adminRole = admin.role;

      res.json({ success: true, username: admin.username, role: admin.role });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if (req.session.adminId) {
      res.json({ authenticated: true, id: req.session.adminId, username: req.session.adminUsername, role: req.session.adminRole || "viewer" });
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await storage.createAdminUser({ username, password: hashedPassword, email });
      res.json({ success: true, username: admin.username });
    } catch (error) {
      res.status(500).json({ error: "Setup failed" });
    }
  });

  // ── Admin user management ──────────────────────────────────────────────────

  app.get("/api/admin/users", requireAtLeast("admin"), async (req, res) => {
    try {
      const admins = await storage.getAdminUsers();
      res.json(admins.map((a) => ({ id: a.id, username: a.username, email: a.email, role: a.role, createdAt: a.createdAt })));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin users" });
    }
  });

  app.post("/api/admin/users", requireAtLeast("admin"), async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "Username, email, password, and role are required" });
      }

      const callerRole = (req.session.adminRole || "viewer") as AdminRole;
      const callerLevel = ROLE_HIERARCHY[callerRole];
      const targetLevel = ROLE_HIERARCHY[role as AdminRole];
      if (!targetLevel || targetLevel > callerLevel) {
        return res.status(403).json({ error: "You cannot assign a role higher than your own" });
      }

      const existingEmail = await storage.getAdminByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "An account with this email already exists" });
      }
      const existingUsername = await storage.getAdminByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "An account with this username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await storage.createAdminUser({ username, email, password: hashedPassword, role });
      res.json({ id: admin.id, username: admin.username, email: admin.email, role: admin.role, createdAt: admin.createdAt });
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin user" });
    }
  });

  app.patch("/api/admin/users/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { username, email, password, role } = req.body;

      const callerRole = (req.session.adminRole || "viewer") as AdminRole;
      const callerLevel = ROLE_HIERARCHY[callerRole];

      const target = await storage.getAdminUser(id);
      if (!target) {
        return res.status(404).json({ error: "User not found" });
      }

      const targetCurrentLevel = ROLE_HIERARCHY[(target.role || "viewer") as AdminRole];
      if (targetCurrentLevel > callerLevel) {
        return res.status(403).json({ error: "You cannot edit a user with a higher role" });
      }

      if (role) {
        const newLevel = ROLE_HIERARCHY[role as AdminRole];
        if (!newLevel || newLevel > callerLevel) {
          return res.status(403).json({ error: "You cannot assign a role higher than your own" });
        }
      }

      const updates: Record<string, any> = {};
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (password) updates.password = await bcrypt.hash(password, 10);

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      if (email && email !== target.email) {
        const existingEmail = await storage.getAdminByEmail(email);
        if (existingEmail) {
          return res.status(400).json({ error: "An account with this email already exists" });
        }
      }
      if (username && username !== target.username) {
        const existingUsername = await storage.getAdminByUsername(username);
        if (existingUsername) {
          return res.status(400).json({ error: "An account with this username already exists" });
        }
      }

      const updated = await storage.updateAdminUser(id, updates);
      if (!updated) {
        return res.status(404).json({ error: "User not found" });
      }

      if (id === req.session.adminId) {
        req.session.adminUsername = updated.username;
        req.session.adminRole = updated.role;
      }

      res.json({ id: updated.id, username: updated.username, email: updated.email, role: updated.role, createdAt: updated.createdAt });
    } catch (error) {
      res.status(500).json({ error: "Failed to update admin user" });
    }
  });

  app.delete("/api/admin/users/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (id === req.session.adminId) {
        return res.status(400).json({ error: "You cannot delete your own account" });
      }

      const callerRole = (req.session.adminRole || "viewer") as AdminRole;
      const callerLevel = ROLE_HIERARCHY[callerRole];

      const target = await storage.getAdminUser(id);
      if (!target) {
        return res.status(404).json({ error: "User not found" });
      }

      const targetLevel = ROLE_HIERARCHY[(target.role || "viewer") as AdminRole];
      if (targetLevel > callerLevel) {
        return res.status(403).json({ error: "You cannot delete a user with a higher role" });
      }

      await storage.deleteAdminUser(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete admin user" });
    }
  });

  // ── Stats ───────────────────────────────────────────────────────────────────

  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const vendors = await storage.getVendorRegistrations();
      const posts = await storage.getBlogPosts();

      const now = new Date();
      const newContacts = contacts.filter((c) => c.status === "new").length;
      const newVendors = vendors.filter((v) => v.status === "new").length;
      const publishedPosts = posts.filter((p) => p.status === "published").length;
      const pendingFollowUps = [
        ...contacts.filter((c) => c.followUpDate && new Date(c.followUpDate) <= now),
        ...vendors.filter((v) => v.followUpDate && new Date(v.followUpDate) <= now),
      ].length;

      res.json({
        totalContacts: contacts.length,
        totalVendors: vendors.length,
        newContacts,
        newVendors,
        publishedPosts,
        totalPosts: posts.length,
        pendingFollowUps,
        recentContacts: contacts.slice(0, 5),
        recentVendors: vendors.slice(0, 5),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // ── Public contact / vendor submission ──────────────────────────────────────

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

  // ── Contacts (admin) ────────────────────────────────────────────────────────
  // NOTE: static sub-paths (export/csv) MUST be registered before /:id

  app.get("/api/admin/contacts/export/csv", requireAtLeast("admin"), async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Company", "Inquiry Type", "Service Interest", "Assigned To", "Follow Up Date", "Status", "Created At"];
      const rows = contacts.map((c) => [
        c.id,
        c.firstName,
        c.lastName,
        c.email,
        c.phone || "",
        c.company || "",
        c.inquiryType || "",
        c.serviceInterest || "",
        c.assignedTo || "",
        c.followUpDate ? new Date(c.followUpDate).toISOString() : "",
        c.status,
        c.createdAt.toISOString(),
      ]);

      const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=contacts.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export contacts" });
    }
  });

  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/admin/contacts/:id", requireAuth, async (req, res) => {
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

  app.patch("/api/admin/contacts/:id/status", requireAtLeast("admin"), async (req, res) => {
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

  app.patch("/api/admin/contacts/:id/assignment", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { assignedTo, followUpDate } = req.body;
      const contact = await storage.updateContactAssignment(
        id,
        assignedTo || null,
        followUpDate ? new Date(followUpDate) : null
      );
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContact(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  app.get("/api/admin/contacts/:id/notes", requireAuth, async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const notes = await storage.getContactNotes(contactId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.post("/api/admin/contacts/:id/notes", requireAtLeast("admin"), async (req, res) => {
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

  app.delete("/api/admin/contacts/:id/notes/:noteId", requireAtLeast("admin"), async (req, res) => {
    try {
      const noteId = parseInt(req.params.noteId);
      await storage.deleteContactNote(noteId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  // ── Vendors (admin) ─────────────────────────────────────────────────────────
  // NOTE: static sub-paths (export/csv) MUST be registered before /:id

  app.get("/api/admin/vendors/export/csv", requireAtLeast("admin"), async (req, res) => {
    try {
      const vendors = await storage.getVendorRegistrations();
      const headers = ["ID", "Company Name", "Contact Name", "Email", "Phone", "City", "State", "Services Offered", "Assigned To", "Follow Up Date", "Status", "Created At"];
      const rows = vendors.map((v) => [
        v.id,
        v.companyName,
        v.contactName,
        v.email,
        v.phone,
        v.city || "",
        v.state || "",
        v.servicesOffered || "",
        v.assignedTo || "",
        v.followUpDate ? new Date(v.followUpDate).toISOString() : "",
        v.status,
        v.createdAt.toISOString(),
      ]);

      const csv = [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=vendors.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Failed to export vendors" });
    }
  });

  app.get("/api/admin/vendors", requireAuth, async (req, res) => {
    try {
      const vendors = await storage.getVendorRegistrations();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vendors" });
    }
  });

  app.get("/api/admin/vendors/:id", requireAuth, async (req, res) => {
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

  app.patch("/api/admin/vendors/:id/status", requireAtLeast("admin"), async (req, res) => {
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

  app.patch("/api/admin/vendors/:id/assignment", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { assignedTo, followUpDate } = req.body;
      const vendor = await storage.updateVendorAssignment(
        id,
        assignedTo || null,
        followUpDate ? new Date(followUpDate) : null
      );
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  app.delete("/api/admin/vendors/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteVendorRegistration(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete vendor" });
    }
  });

  app.get("/api/admin/vendors/:id/notes", requireAuth, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      const notes = await storage.getVendorNotes(vendorId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notes" });
    }
  });

  app.post("/api/admin/vendors/:id/notes", requireAtLeast("admin"), async (req, res) => {
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

  app.delete("/api/admin/vendors/:id/notes/:noteId", requireAtLeast("admin"), async (req, res) => {
    try {
      const noteId = parseInt(req.params.noteId);
      await storage.deleteVendorNote(noteId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  });

  // ── Blog (admin) ────────────────────────────────────────────────────────────

  app.get("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/admin/blog/:id", requireAuth, async (req, res) => {
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

  app.post("/api/admin/blog", requireAtLeast("editor"), async (req, res) => {
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

  app.patch("/api/admin/blog/:id", requireAtLeast("editor"), async (req, res) => {
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

  app.delete("/api/admin/blog/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // ── Blog image upload ──────────────────────────────────────────────────────

  const uploadDir = path.join(process.cwd(), "client", "public", "images", "blog");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const blogImageUpload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadDir),
      filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `blog-${uniqueSuffix}${ext}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowed.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPG, PNG, WebP, and GIF images are allowed"));
      }
    },
  });

  app.post("/api/admin/blog/upload-image", requireAtLeast("editor"), (req, res) => {
    blogImageUpload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "Image must be under 5MB" });
        }
        return res.status(400).json({ error: err.message });
      }
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }
      const imageUrl = `/images/blog/${req.file.filename}`;
      res.json({ imageUrl });
    });
  });

  // ── Public blog ─────────────────────────────────────────────────────────────

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
      const post = await storage.getPublishedBlogPostBySlug(req.params.slug);
      if (!post) {
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
