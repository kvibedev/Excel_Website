CREATE TABLE "blog_approval_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_post_id" integer NOT NULL,
	"action" text NOT NULL,
	"feedback" text,
	"performed_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_email_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_type" text NOT NULL,
	"recipient_email" text NOT NULL,
	"recipient_name" text,
	"cc_type" text DEFAULT 'to' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "approval_status" text DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "approval_token" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "approval_token_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "blog_approval_history" ADD CONSTRAINT "blog_approval_history_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE no action ON UPDATE no action;