DO $$ BEGIN
  CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'admin', 'editor', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE "admin_users" (
        "id" serial PRIMARY KEY NOT NULL,
        "username" text NOT NULL,
        "password" text NOT NULL,
        "email" text NOT NULL,
        "role" "admin_role" DEFAULT 'viewer' NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "contact_notes" (
        "id" serial PRIMARY KEY NOT NULL,
        "contact_id" integer NOT NULL,
        "note" text NOT NULL,
        "author_name" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
        "id" serial PRIMARY KEY NOT NULL,
        "first_name" text NOT NULL,
        "last_name" text NOT NULL,
        "email" text NOT NULL,
        "phone" text,
        "company" text,
        "message" text,
        "inquiry_type" text,
        "service_interest" text,
        "area_of_inquiry" text,
        "status" text DEFAULT 'new' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
        "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "username" text NOT NULL,
        "password" text NOT NULL,
        CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "vendor_notes" (
        "id" serial PRIMARY KEY NOT NULL,
        "vendor_id" integer NOT NULL,
        "note" text NOT NULL,
        "author_name" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor_registrations" (
        "id" serial PRIMARY KEY NOT NULL,
        "company_name" text NOT NULL,
        "contact_name" text NOT NULL,
        "email" text NOT NULL,
        "phone" text NOT NULL,
        "address" text,
        "city" text,
        "state" text,
        "zip_code" text,
        "services_offered" text,
        "certifications" text,
        "years_in_business" text,
        "insurance_info" text,
        "references" text,
        "additional_info" text,
        "status" text DEFAULT 'new' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_notes" ADD CONSTRAINT "contact_notes_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_notes" ADD CONSTRAINT "vendor_notes_vendor_id_vendor_registrations_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor_registrations"("id") ON DELETE no action ON UPDATE no action;