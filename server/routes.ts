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
import { sendContactFormEmail, sendVendorFormEmail, sendBlogApprovalRequestEmail, sendBlogApprovedEmail, sendBlogChangesRequestedEmail, sendBlogClientConfirmationEmail, getBlogApprovalRecipients, sendPasswordResetEmail, sendAdminInviteEmail } from "./email";
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

  app.post("/api/admin/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Please enter your email address." });
      }

      const admin = await storage.getAdminByEmail(email.trim().toLowerCase());
      const genericMsg = { success: true, message: "If an account exists for that email, a password reset link has been sent." };

      if (!admin || !admin.isActive) {
        return res.json(genericMsg);
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await storage.setPasswordResetToken(admin.id, token, expiresAt);

      try {
        await sendPasswordResetEmail({ email: admin.email, name: admin.username }, token);
      } catch (err) {
        console.error("Failed to send password reset email:", err);
      }

      res.json(genericMsg);
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  app.post("/api/admin/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ error: "Reset token and a new password are required." });
      }
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
      }

      const newHash = await bcrypt.hash(password, 10);
      const updated = await storage.consumePasswordResetToken(token, newHash);
      if (!updated) {
        const existing = await storage.getAdminByResetToken(token);
        if (existing && !existing.isActive) {
          return res.status(400).json({ error: "This account is no longer active. Please contact your administrator." });
        }
        if (existing && existing.passwordResetExpiresAt && new Date(existing.passwordResetExpiresAt).getTime() < Date.now()) {
          return res.status(400).json({ error: "This reset link has expired. Please request a new one." });
        }
        return res.status(400).json({ error: "This reset link is invalid. Please request a new one." });
      }

      res.json({ success: true, message: "Your password has been reset. You can now log in with the new password." });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/admin/reset-password/verify", async (req, res) => {
    try {
      const token = typeof req.query.token === "string" ? req.query.token : "";
      if (!token) return res.json({ valid: false, reason: "missing" });
      const admin = await storage.getAdminByResetToken(token);
      if (!admin || !admin.passwordResetExpiresAt) return res.json({ valid: false, reason: "invalid" });
      if (new Date(admin.passwordResetExpiresAt).getTime() < Date.now()) return res.json({ valid: false, reason: "expired" });
      if (!admin.isActive) return res.json({ valid: false, reason: "inactive" });
      res.json({ valid: true, email: admin.email });
    } catch (error) {
      res.status(500).json({ valid: false, reason: "error" });
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
      const { username, email, role } = req.body;
      if (!username || !email || !role) {
        return res.status(400).json({ error: "Username, email, and role are required" });
      }

      const callerRole = (req.session.adminRole || "viewer") as AdminRole;
      const callerLevel = ROLE_HIERARCHY[callerRole];
      const targetLevel = ROLE_HIERARCHY[role as AdminRole];
      if (!targetLevel || targetLevel > callerLevel) {
        return res.status(403).json({ error: "You cannot assign a role higher than your own" });
      }

      const normalizedEmail = String(email).trim().toLowerCase();
      const normalizedUsername = String(username).trim();
      if (!normalizedUsername) {
        return res.status(400).json({ error: "Username is required", field: "username" });
      }
      const existingEmail = await storage.getAdminByEmail(normalizedEmail);
      if (existingEmail) {
        return res.status(400).json({ error: "An account with this email already exists", field: "email" });
      }
      const existingUsername = await storage.getAdminByUsername(normalizedUsername);
      if (existingUsername) {
        return res.status(400).json({ error: "An account with this username already exists", field: "username" });
      }

      // Create the account with an unusable random password — the user must
      // set their own via the invite link.
      const placeholder = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(placeholder, 10);
      let admin;
      try {
        admin = await storage.createAdminUser({ username: normalizedUsername, email: normalizedEmail, password: hashedPassword, role });
      } catch (err: any) {
        if (err?.code === "23505" || /duplicate key|unique constraint/i.test(err?.message || "")) {
          const field = /email/i.test(err?.detail || err?.message || "") ? "email" : "username";
          return res.status(400).json({
            error: field === "email"
              ? "An account with this email already exists"
              : "An account with this username already exists",
            field,
          });
        }
        throw err;
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await storage.setPasswordResetToken(admin.id, token, expiresAt);

      let emailSent = true;
      try {
        await sendAdminInviteEmail(
          { email: admin.email, name: admin.username },
          token,
          req.session.adminUsername
        );
      } catch (err) {
        emailSent = false;
        console.error("Failed to send admin invite email:", err);
      }

      res.json({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        inviteSent: emailSent,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin user" });
    }
  });

  app.post("/api/admin/users/:id/resend-invite", requireAtLeast("admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const callerRole = (req.session.adminRole || "viewer") as AdminRole;
      const callerLevel = ROLE_HIERARCHY[callerRole];

      const target = await storage.getAdminUser(id);
      if (!target) return res.status(404).json({ error: "User not found" });
      if (!target.isActive) return res.status(400).json({ error: "This account is inactive." });

      const targetLevel = ROLE_HIERARCHY[(target.role || "viewer") as AdminRole];
      if (targetLevel > callerLevel) {
        return res.status(403).json({ error: "You cannot resend an invite for a user with a higher role" });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await storage.setPasswordResetToken(target.id, token, expiresAt);

      try {
        await sendAdminInviteEmail(
          { email: target.email, name: target.username },
          token,
          req.session.adminUsername
        );
      } catch (err) {
        console.error("Failed to resend admin invite email:", err);
        return res.status(500).json({ error: "Failed to send invite email. Please try again." });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to resend invite" });
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

      const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : undefined;
      const normalizedUsername = typeof username === "string" ? username.trim() : undefined;

      const updates: Partial<{ username: string; email: string; role: string; password: string }> = {};
      if (normalizedUsername) updates.username = normalizedUsername;
      if (normalizedEmail) updates.email = normalizedEmail;
      if (role) updates.role = role;
      if (password) updates.password = await bcrypt.hash(password, 10);

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      if (normalizedEmail && normalizedEmail !== target.email) {
        const existingEmail = await storage.getAdminByEmail(normalizedEmail);
        if (existingEmail) {
          return res.status(400).json({ error: "An account with this email already exists", field: "email" });
        }
      }
      if (normalizedUsername && normalizedUsername !== target.username) {
        const existingUsername = await storage.getAdminByUsername(normalizedUsername);
        if (existingUsername) {
          return res.status(400).json({ error: "An account with this username already exists", field: "username" });
        }
      }

      let updated;
      try {
        updated = await storage.updateAdminUser(id, updates);
      } catch (err: any) {
        if (err?.code === "23505" || /duplicate key|unique constraint/i.test(err?.message || "")) {
          const field = /email/i.test(err?.detail || err?.message || "") ? "email" : "username";
          return res.status(400).json({
            error: field === "email"
              ? "An account with this email already exists"
              : "An account with this username already exists",
            field,
          });
        }
        throw err;
      }
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

      // Attribute the lead to blog posts the same anonymous visitor recently viewed.
      try {
        const cookies = parseCookies(req.headers.cookie);
        const rawCookie = cookies[VISITOR_COOKIE];
        if (rawCookie && /^[a-f0-9]{32,64}$/.test(rawCookie)) {
          const visitorId = crypto.createHash("sha256").update(rawCookie).digest("hex").slice(0, 32);
          await storage.setContactVisitorId(contact.id, visitorId);
          const recent = await storage.getRecentBlogViewsForVisitor(visitorId, 30);
          if (recent.length > 0) {
            await storage.createContactBlogAttributions(
              recent.slice(0, 5).map((v) => ({
                contactId: contact.id,
                blogPostId: v.blogPostId,
                viewedAt: v.viewedAt,
              }))
            );
          }
        }
      } catch (attribErr) {
        console.error("Contact attribution failed:", attribErr);
      }

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
      const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Company", "Inquiry Type", "Service Interest", "Assigned To", "Follow Up Date", "Status", "UTM Source", "UTM Medium", "UTM Campaign", "Referrer", "Created At"];
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
        c.utmSource || "",
        c.utmMedium || "",
        c.utmCampaign || "",
        c.referrerUrl || "",
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

  app.get("/api/admin/contacts/source-breakdown", requireAuth, async (req, res) => {
    try {
      const rangeRaw = typeof req.query.range === "string" ? req.query.range : "30";
      let sinceDays: number | null = null;
      if (rangeRaw !== "all") {
        const parsed = parseInt(rangeRaw, 10);
        sinceDays = Number.isFinite(parsed) && parsed > 0 ? parsed : 30;
      }
      const data = await storage.getLeadSourceBreakdown(sinceDays);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead source breakdown" });
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

  app.get("/api/admin/contacts/:id/attributions", requireAuth, async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const attributions = await storage.getContactBlogAttributions(contactId);
      res.json(attributions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attributions" });
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
      const headers = ["ID", "Company Name", "Contact Name", "Email", "Phone", "City", "State", "Services Offered", "Assigned To", "Follow Up Date", "Status", "UTM Source", "UTM Medium", "UTM Campaign", "Referrer", "Created At"];
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
        v.utmSource || "",
        v.utmMedium || "",
        v.utmCampaign || "",
        v.referrerUrl || "",
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

  app.get("/api/admin/blog/stats", requireAuth, async (_req, res) => {
    try {
      const stats = await storage.getBlogPostStatsForAll();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog stats" });
    }
  });

  app.get("/api/admin/blog/stats/overview", requireAuth, async (req, res) => {
    try {
      const rangeRaw = (req.query.range || "30").toString();
      const range = rangeRaw === "all" ? null : (["7", "30", "90"].includes(rangeRaw) ? parseInt(rangeRaw) : 30);
      const overview = await storage.getBlogOverviewStats(range);
      res.json(overview);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog overview stats" });
    }
  });

  app.get("/api/admin/blog/top-stats", requireAuth, async (req, res) => {
    try {
      const limitRaw = parseInt((req.query.limit || "5").toString());
      const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(50, limitRaw)) : 5;
      const rangeRaw = (req.query.range || "30").toString();
      const range = rangeRaw === "all" ? null : (["7", "30", "90"].includes(rangeRaw) ? parseInt(rangeRaw) : 30);
      const top = await storage.getTopBlogPostsByViews(limit, range);
      res.json(top);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch top blog posts" });
    }
  });

  app.get("/api/admin/blog/:id(\\d+)/stats", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
      const rangeRaw = (req.query.range || "30").toString();
      const range = rangeRaw === "all" ? null : (["7", "30", "90"].includes(rangeRaw) ? parseInt(rangeRaw) : 30);
      const detail = await storage.getBlogPostStatsDetail(id, range);
      res.json(detail);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post stats" });
    }
  });

  app.get("/api/admin/blog/:id(\\d+)", requireAuth, async (req, res) => {
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

  // ── Blog post view tracking ────────────────────────────────────────────────

  const BOT_UA_REGEX = /bot|crawl|spider|slurp|bing|google|yandex|baidu|facebookexternalhit|twitterbot|linkedinbot|embedly|whatsapp|telegram|pinterest|preview|fetch|monitoring|headless|lighthouse|pingdom|uptimerobot/i;
  const VISITOR_COOKIE = "efsg_bv";
  const VISITOR_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 365;

  function parseCookies(header: string | undefined): Record<string, string> {
    if (!header) return {};
    const out: Record<string, string> = {};
    for (const part of header.split(";")) {
      const [k, ...v] = part.trim().split("=");
      if (!k) continue;
      out[k] = decodeURIComponent(v.join("=") || "");
    }
    return out;
  }

  function shouldTrackView(req: Request): boolean {
    if (req.session.adminId) return false;
    const ua = (req.headers["user-agent"] || "").toString();
    if (!ua || BOT_UA_REGEX.test(ua)) return false;
    return true;
  }

  function getOrSetVisitorId(req: Request, res: Response): string {
    const cookies = parseCookies(req.headers.cookie);
    let id = cookies[VISITOR_COOKIE];
    if (!id || !/^[a-f0-9]{32,64}$/.test(id)) {
      id = crypto.randomBytes(24).toString("hex");
      const isProd = process.env.NODE_ENV === "production";
      const parts = [
        `${VISITOR_COOKIE}=${id}`,
        "Path=/",
        `Max-Age=${Math.floor(VISITOR_COOKIE_MAX_AGE / 1000)}`,
        "HttpOnly",
        "SameSite=Lax",
      ];
      if (isProd) parts.push("Secure");
      res.append("Set-Cookie", parts.join("; "));
    }
    return crypto.createHash("sha256").update(id).digest("hex").slice(0, 32);
  }

  app.post("/api/blog/:slug/view", async (req, res) => {
    try {
      if (!shouldTrackView(req)) {
        return res.json({ tracked: false });
      }
      const post = await storage.getPublishedBlogPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ error: "Blog post not found" });

      const visitorId = getOrSetVisitorId(req, res);
      const referrerRaw = typeof req.body?.referrer === "string" ? req.body.referrer : "";
      const sameOriginRef = (() => {
        try {
          if (!referrerRaw) return "";
          const u = new URL(referrerRaw);
          const host = req.headers.host || "";
          if (u.host && host && u.host === host) return "";
          return u.hostname || "";
        } catch {
          return "";
        }
      })();
      const ua = (req.headers["user-agent"] || "").toString().slice(0, 500);

      const sessionIdRaw = typeof req.body?.sessionId === "string" ? req.body.sessionId : "";
      if (!/^[A-Za-z0-9_-]{16,64}$/.test(sessionIdRaw)) {
        return res.status(400).json({ error: "Invalid session id" });
      }
      const sessionId = crypto.createHash("sha256")
        .update(`${visitorId}:${sessionIdRaw}`)
        .digest("hex")
        .slice(0, 32);

      const view = await storage.getOrCreateBlogPostView({
        blogPostId: post.id,
        visitorId,
        sessionId,
        referrer: sameOriginRef || null,
        userAgent: ua || null,
        timeOnPageMs: 0,
      });
      res.json({ tracked: true, viewId: view.id });
    } catch (error) {
      console.error("view tracking error:", error);
      res.status(500).json({ error: "Failed to record view" });
    }
  });

  app.post("/api/blog/:slug/view/heartbeat", async (req, res) => {
    try {
      if (!shouldTrackView(req)) {
        return res.json({ tracked: false });
      }
      const cookies = parseCookies(req.headers.cookie);
      const rawCookie = cookies[VISITOR_COOKIE];
      if (!rawCookie || !/^[a-f0-9]{32,64}$/.test(rawCookie)) {
        return res.status(401).json({ error: "Missing visitor cookie" });
      }
      const visitorId = crypto.createHash("sha256").update(rawCookie).digest("hex").slice(0, 32);

      const viewId = parseInt(req.body?.viewId);
      const timeOnPageMs = parseInt(req.body?.timeOnPageMs);
      if (!Number.isFinite(viewId) || viewId <= 0 || !Number.isFinite(timeOnPageMs) || timeOnPageMs < 0) {
        return res.status(400).json({ error: "Invalid heartbeat" });
      }
      const existing = await storage.getBlogPostView(viewId);
      if (!existing) return res.status(404).json({ error: "View not found" });
      if (existing.visitorId !== visitorId) {
        return res.status(403).json({ error: "View belongs to another visitor" });
      }
      const post = await storage.getPublishedBlogPostBySlug(req.params.slug);
      if (!post || post.id !== existing.blogPostId) {
        return res.status(400).json({ error: "Mismatched post" });
      }
      const ok = await storage.updateBlogPostViewTime(viewId, visitorId, timeOnPageMs);
      res.json({ tracked: ok });
    } catch (error) {
      console.error("heartbeat error:", error);
      res.status(500).json({ error: "Failed to record heartbeat" });
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
