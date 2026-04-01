import { db } from "./db";
import { adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function seedAdminUser() {
  const existing = await db.select().from(adminUsers);
  if (existing.length > 0) {
    const seeded = existing.find((u) => u.email === "admin@efsgnj.com");
    if (seeded && seeded.role !== "super_admin") {
      await db.update(adminUsers).set({ role: "super_admin" }).where(eq(adminUsers.id, seeded.id));
      console.log("Updated admin@efsgnj.com role to super_admin");
    }
    console.log("Admin user already exists, skipping seed");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin@123", 10);
  await db.insert(adminUsers).values({
    username: "superadmin",
    email: "admin@efsgnj.com",
    password: hashedPassword,
    role: "super_admin",
  });
  console.log("Admin user seeded: admin@efsgnj.com (super_admin)");
}
