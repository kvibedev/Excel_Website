import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertContactSchema, insertVendorRegistrationSchema, insertVendorNoteSchema, insertContactNoteSchema, insertBlogPostSchema, insertFormEmailSettingSchema, ROLE_HIERARCHY, type AdminRole, type InsertBlogPost } from "@shared/schema";
import { z } from "zod";
import { sendContactFormEmail, sendVendorFormEmail, sendBlogApprovalRequestEmail, sendBlogApprovedEmail, sendBlogChangesRequestedEmail, sendBlogClientConfirmationEmail, getBlogApprovalRecipients } from "./email";
import crypto from "crypto";

declare module "express-session" {
  interface SessionData {
    adminId?: number;
    adminUsername?: string;
    adminRole?: string;
  }
}

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const admin = await storage.getAdminUser(req.session.adminId);
  if (!admin || !admin.isActive) {
    req.session.destroy(() => {});
    return res.status(401).json({ error: "Account is deactivated" });
  }
  next();
}

function requireAtLeast(minRole: AdminRole) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.adminId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const admin = await storage.getAdminUser(req.session.adminId);
    if (!admin || !admin.isActive) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: "Account is deactivated" });
    }
    req.session.adminRole = admin.role;
    const userRole = admin.role as AdminRole;
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

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path !== "/" && req.path.endsWith("/") && !req.path.startsWith("/api")) {
      const newPath = req.path.slice(0, -1);
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, newPath + query);
    }
    next();
  });

  const oldBlogSlugs = [
    "non-toxic-cleaning-transforms-facilities",
    "sustainable-floor-care-transforming-facilities",
    "green-cleaning-transforming-facility-management",
    "smart-technology-revolutionizes-facility-security",
    "automation-revolutionizes-commercial-cleaning-efficiency",
    "unlocking-energy-efficiency-for-facilities",
    "smart-iot-driving-facility-management",
    "unlocking-ai-power-in-facility-maintenance",
    "developing-cleaning-plans-for-diverse-industrial-facilities",
    "regular-office-cleaning-enhances-employee-productivity",
    "the-importance-of-janitorial-services-for-distribution-centers",
    "celebrating-world-facilities-management-day-with-excel-facility-services-group",
    "empowering-a-sustainable-future-excel-facility-services-groups-commitment-to-green-cleaning",
    "reinvigorating-spaces-and-minds-the-power-of-spring-cleaning-for-commercial-spaces",
    "understanding-the-crucial-difference-between-cleaning-and-disinfecting",
    "breathe-easy-and-stay-safe-indoor-air-quality-awareness-month",
    "the-impact-of-seasonal-changes-on-commercial-cleaning",
    "excel-facility-services-group-ranks-no-2126-on-the-2023-inc-5000",
    "the-impact-of-a-clean-school-environment-on-student-performance",
    "the-professional-touch-why-hiring-professional-cleaning-services-is-a-smart-business-move",
    "celebrate-national-cleaning-week-with-excel-facility-services-group",
    "how-a-preventive-maintenance-program-can-save-you-money",
    "workplace-safety-and-health-the-role-of-professional-cleaning-services",
    "choosing-between-day-porter-and-janitorial-services-what-does-your-business-need",
    "how-to-ensure-that-your-warehouse-is-clean-and-safe",
    "3-significant-benefits-of-outsourcing-your-cleaning-needs",
    "a-green-seal-certified-cleaning-service-means-safer-indoor-air",
  ];

  app.use((req: Request, res: Response, next: NextFunction) => {
    const slug = req.path.replace(/^\//, "").replace(/\/$/, "");
    if (oldBlogSlugs.includes(slug)) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, `/resources/${slug}${query}`);
    }
    next();
  });

  app.get("/careers", (_req: Request, res: Response) => {
    res.redirect(301, "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=2efccd9b-d01e-4fc0-a0bd-5735ec5ae45c&ccId=19000101_000001&lang=en_US");
  });

  const oldRouteRedirects: Record<string, string> = {
    "/about": "/about-us",
    "/about/our-team": "/about-us/team",
    "/about/recognitions-certifications": "/about-us/recognitions-and-certifications",
    "/about/coverage-areas": "/about-us/coverage-areas",
    "/about/green-seal": "/about-us/green-seal",
  };

  app.use((req: Request, res: Response, next: NextFunction) => {
    const target = oldRouteRedirects[req.path];
    if (target) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      return res.redirect(301, target + query);
    }
    next();
  });

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

      if (!admin.isActive) {
        return res.status(401).json({ error: "This account has been deactivated. Please contact your administrator." });
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

  app.get("/api/admin/me", async (req, res) => {
    if (req.session.adminId) {
      const admin = await storage.getAdminUser(req.session.adminId);
      if (!admin || !admin.isActive) {
        req.session.destroy(() => {});
        return res.json({ authenticated: false });
      }
      req.session.adminRole = admin.role;
      res.json({ authenticated: true, id: admin.id, username: admin.username, role: admin.role });
    } else {
      res.json({ authenticated: false });
    }
  });

  app.post("/api/admin/setup", async (req, res) => {
    try {
      const allAdmins = await storage.getAdminUsers();
      if (allAdmins.length > 0) {
        return res.status(403).json({ error: "Setup is disabled. Admin accounts already exist." });
      }

      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, password, and email are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await storage.createAdminUser({ username, password: hashedPassword, email, role: "super_admin" });
      res.json({ success: true, username: admin.username });
    } catch (error) {
      res.status(500).json({ error: "Setup failed" });
    }
  });

  // ── Admin user management ──────────────────────────────────────────────────

  app.get("/api/admin/users", requireAtLeast("admin"), async (req, res) => {
    try {
      const admins = await storage.getAdminUsers();
      res.json(admins.map((a) => ({ id: a.id, username: a.username, email: a.email, role: a.role, isActive: a.isActive, createdAt: a.createdAt })));
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

      const updates: Partial<{ username: string; email: string; role: string; password: string }> = {};
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

      await storage.deactivateAdminUser(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to deactivate admin user" });
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
      sendContactFormEmail(contact).catch(err => {
        console.error("Background email send failed:", err);
      });
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
      sendVendorFormEmail(vendor).catch(err => {
        console.error("Background vendor email send failed:", err);
      });
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

  const sanitizeBlogPost = <T extends { approvalToken?: string | null; approvalTokenExpiresAt?: Date | null }>(p: T) => {
    const { approvalToken: _t, approvalTokenExpiresAt: _e, ...rest } = p;
    return rest;
  };

  app.get("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts.map(sanitizeBlogPost));
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
      res.json(sanitizeBlogPost(post));
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

  // ── Blog approval workflow ─────────────────────────────────────────────────

  app.get("/api/admin/blog/:id/approval-history", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const history = await storage.getBlogApprovalHistory(id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch approval history" });
    }
  });

  app.post("/api/admin/blog/:id/send-for-approval", requireAtLeast("editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) return res.status(404).json({ error: "Blog post not found" });

      const { to: approvalTo } = await getBlogApprovalRecipients();
      if (approvalTo.length === 0) {
        return res.status(400).json({ error: "No client approval recipients configured. Add a recipient in Admin → Email Settings under Blog Approval before sending." });
      }

      if (post.approvalStatus === "changes_requested") {
        const history = await storage.getBlogApprovalHistory(id);
        const lastFeedback = history.find(h => h.action === "changes_requested");
        const hasCompletion = lastFeedback
          ? history.some(h => h.action === "edits_completed" && new Date(h.createdAt) > new Date(lastFeedback.createdAt))
          : false;
        if (!hasCompletion) {
          return res.status(400).json({ error: "Mark edits completed before resending for approval" });
        }
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const updated = await storage.updateBlogPost(id, {
        approvalStatus: "pending",
        approvalToken: token,
        approvalTokenExpiresAt: expiresAt,
      });

      await storage.createBlogApprovalHistory({
        blogPostId: id,
        action: "sent_for_approval",
        feedback: null,
        performedBy: req.session.adminUsername || "admin",
      });

      sendBlogApprovalRequestEmail(updated!, token).catch(err => console.error("Background email failed:", err));
      res.json(updated ? sanitizeBlogPost(updated) : null);
    } catch (error) {
      console.error("send-for-approval error:", error);
      res.status(500).json({ error: "Failed to send for approval" });
    }
  });

  app.post("/api/admin/blog/:id/mark-edits-completed", requireAtLeast("editor"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) return res.status(404).json({ error: "Blog post not found" });
      if (post.approvalStatus !== "changes_requested") {
        return res.status(400).json({ error: "Post is not in 'changes requested' state" });
      }
      const history = await storage.getBlogApprovalHistory(id);
      const lastFeedback = history.find(h => h.action === "changes_requested");
      const alreadyCompleted = lastFeedback
        ? history.some(h => h.action === "edits_completed" && new Date(h.createdAt) > new Date(lastFeedback.createdAt))
        : false;
      if (alreadyCompleted) {
        return res.status(400).json({ error: "Edits have already been marked completed for the latest feedback" });
      }
      await storage.createBlogApprovalHistory({
        blogPostId: id,
        action: "edits_completed",
        feedback: null,
        performedBy: req.session.adminUsername || "admin",
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark edits completed" });
    }
  });

  // Public token-secured approval endpoints
  const APPROVAL_TOKEN_REGEX = /^[a-f0-9]{64}$/;
  const validateToken = (token: string) => APPROVAL_TOKEN_REGEX.test(token);

  app.get("/api/blog-approval/:token", async (req, res) => {
    try {
      if (!validateToken(req.params.token)) {
        return res.status(404).json({ error: "Invalid or expired review link" });
      }
      const post = await storage.getBlogPostByApprovalToken(req.params.token);
      if (!post) return res.status(404).json({ error: "Invalid or expired review link" });
      if (post.approvalTokenExpiresAt && new Date(post.approvalTokenExpiresAt) < new Date()) {
        return res.status(410).json({ error: "This review link has expired" });
      }
      const history = await storage.getBlogApprovalHistory(post.id);
      const { approvalToken: _t, ...safePost } = post;
      res.json({ post: safePost, history });
    } catch (error) {
      res.status(500).json({ error: "Failed to load review" });
    }
  });

  const clientEmailSchema = z.object({ clientEmail: z.string().trim().email().max(254).optional().or(z.literal("")) }).partial();

  app.post("/api/blog-approval/:token/approve", async (req, res) => {
    try {
      if (!validateToken(req.params.token)) {
        return res.status(404).json({ error: "Invalid or expired review link" });
      }
      const parsedBody = clientEmailSchema.safeParse(req.body || {});
      const clientEmail = parsedBody.success ? (parsedBody.data.clientEmail || "").trim() : "";
      const existing = await storage.getBlogPostByApprovalToken(req.params.token);
      if (!existing) return res.status(404).json({ error: "Invalid or expired review link" });
      if (existing.approvalTokenExpiresAt && new Date(existing.approvalTokenExpiresAt) < new Date()) {
        return res.status(410).json({ error: "This review link has expired" });
      }
      const updates: Partial<InsertBlogPost> = {
        approvalStatus: "approved",
        approvalToken: null,
        approvalTokenExpiresAt: null,
        status: "published",
      };
      if (!existing.publishedAt) updates.publishedAt = new Date();
      const updated = await storage.consumeApprovalToken(req.params.token, updates);
      if (!updated) {
        return res.status(409).json({ error: "This review link has already been used" });
      }
      await storage.createBlogApprovalHistory({
        blogPostId: updated.id,
        action: "approved",
        feedback: null,
        performedBy: "client",
      });
      sendBlogApprovedEmail(updated).catch(err => console.error("Background email failed:", err));
      if (clientEmail) {
        sendBlogClientConfirmationEmail(updated, clientEmail, "approved").catch(err => console.error("Client confirmation email failed:", err));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("approve error:", error);
      res.status(500).json({ error: "Failed to approve post" });
    }
  });

  app.post("/api/blog-approval/:token/request-edits", async (req, res) => {
    try {
      if (!validateToken(req.params.token)) {
        return res.status(404).json({ error: "Invalid or expired review link" });
      }
      const feedbackSchema = z.object({ feedback: z.string().min(1, "Please provide feedback").max(5000) });
      const { feedback } = feedbackSchema.parse(req.body);
      const parsedEmail = clientEmailSchema.safeParse(req.body || {});
      const clientEmail = parsedEmail.success ? (parsedEmail.data.clientEmail || "").trim() : "";
      const existing = await storage.getBlogPostByApprovalToken(req.params.token);
      if (!existing) return res.status(404).json({ error: "Invalid or expired review link" });
      if (existing.approvalTokenExpiresAt && new Date(existing.approvalTokenExpiresAt) < new Date()) {
        return res.status(410).json({ error: "This review link has expired" });
      }
      const updated = await storage.consumeApprovalToken(req.params.token, {
        approvalStatus: "changes_requested",
        approvalToken: null,
        approvalTokenExpiresAt: null,
      });
      if (!updated) {
        return res.status(409).json({ error: "This review link has already been used" });
      }
      await storage.createBlogApprovalHistory({
        blogPostId: updated.id,
        action: "changes_requested",
        feedback,
        performedBy: "client",
      });
      sendBlogChangesRequestedEmail(updated, feedback).catch(err => console.error("Background email failed:", err));
      if (clientEmail) {
        sendBlogClientConfirmationEmail(updated, clientEmail, "changes_requested", feedback).catch(err => console.error("Client confirmation email failed:", err));
      }
      res.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });

  // ── Public blog ─────────────────────────────────────────────────────────────

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts.map(sanitizeBlogPost));
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
      res.json(sanitizeBlogPost(post));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // ── Admin form email settings ──────────────────────────────────────────────

  app.get("/api/admin/form-email-settings", requireAtLeast("admin"), async (req, res) => {
    try {
      const settings = await storage.getAllFormEmailSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form email settings" });
    }
  });

  app.post("/api/admin/form-email-settings", requireAtLeast("admin"), async (req, res) => {
    try {
      const parsed = insertFormEmailSettingSchema.parse(req.body);
      const setting = await storage.createFormEmailSetting(parsed);
      res.json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create form email setting" });
    }
  });

  app.patch("/api/admin/form-email-settings/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await storage.updateFormEmailSetting(id, req.body);
      if (!updated) return res.status(404).json({ error: "Setting not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update form email setting" });
    }
  });

  app.delete("/api/admin/form-email-settings/:id", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFormEmailSetting(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete form email setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
