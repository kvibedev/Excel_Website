CREATE TABLE IF NOT EXISTS "blog_post_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_post_id" integer NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"referrer" text,
	"user_agent" text,
	"time_on_page_ms" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "blog_post_views" ADD CONSTRAINT "blog_post_views_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;
