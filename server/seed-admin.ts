import { db } from "./db";
import { adminUsers } from "@shared/schema";
import bcrypt from "bcrypt";

export async function seedAdminUser() {
  const existing = await db.select().from(adminUsers);
  if (existing.length > 0) {
    console.log("Admin user already exists, skipping seed");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin@123", 10);
  await db.insert(adminUsers).values({
    username: "superadmin",
    email: "admin@efsgnj.com",
    password: hashedPassword,
  });
  console.log("Admin user seeded: admin@efsgnj.com");
}
