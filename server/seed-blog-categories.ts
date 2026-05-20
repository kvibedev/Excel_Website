import { storage } from "./storage";
import { DEFAULT_BLOG_CATEGORIES } from "@shared/schema";

export async function seedBlogCategories() {
  const existing = await storage.getBlogCategories();
  if (existing.length > 0) {
    console.log(`Blog categories already exist (${existing.length}), skipping seed`);
    return;
  }
  for (const name of DEFAULT_BLOG_CATEGORIES) {
    await storage.createBlogCategory({ name });
  }
  console.log(`Seeded ${DEFAULT_BLOG_CATEGORIES.length} blog categories`);
}
