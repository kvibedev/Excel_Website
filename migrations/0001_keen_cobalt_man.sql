CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'admin', 'editor', 'viewer');--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"category" text,
	"tags" text,
	"image_url" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "role" "admin_role" DEFAULT 'viewer' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "assigned_to" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "follow_up_date" timestamp;--> statement-breakpoint
ALTER TABLE "vendor_registrations" ADD COLUMN "assigned_to" text;--> statement-breakpoint
ALTER TABLE "vendor_registrations" ADD COLUMN "follow_up_date" timestamp;