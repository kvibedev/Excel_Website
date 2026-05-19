CREATE TABLE "contact_blog_attributions" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" integer NOT NULL,
	"blog_post_id" integer NOT NULL,
	"viewed_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "submitted_from_path" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "visitor_id" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "utm_source" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "utm_campaign" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "referrer_url" text;--> statement-breakpoint
ALTER TABLE "contact_blog_attributions" ADD CONSTRAINT "contact_blog_attributions_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_blog_attributions" ADD CONSTRAINT "contact_blog_attributions_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blog_post_views_blog_post_id_idx" ON "blog_post_views" USING btree ("blog_post_id");--> statement-breakpoint
CREATE INDEX "blog_post_views_blog_post_id_created_at_idx" ON "blog_post_views" USING btree ("blog_post_id","created_at");--> statement-breakpoint
CREATE INDEX "blog_post_views_blog_post_id_visitor_id_created_at_idx" ON "blog_post_views" USING btree ("blog_post_id","visitor_id","created_at");