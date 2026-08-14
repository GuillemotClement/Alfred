CREATE TABLE "workplace" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workplace_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"street" varchar NOT NULL,
	"city" varchar NOT NULL,
	"postal_code" integer NOT NULL,
	"image" varchar,
	"worplace_category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "worplace_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "worplace_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "workplace_user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workplace_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"description" text,
	"value" integer NOT NULL,
	"workplace_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workplace_user_mission" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workplace_user_mission_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"worked_at" timestamp NOT NULL,
	"workplace_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workplace" ADD CONSTRAINT "workplace_worplace_category_id_worplace_category_id_fkey" FOREIGN KEY ("worplace_category_id") REFERENCES "worplace_category"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "workplace_user" ADD CONSTRAINT "workplace_user_workplace_id_workplace_id_fkey" FOREIGN KEY ("workplace_id") REFERENCES "workplace"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "workplace_user" ADD CONSTRAINT "workplace_user_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "workplace_user_mission" ADD CONSTRAINT "workplace_user_mission_workplace_id_workplace_id_fkey" FOREIGN KEY ("workplace_id") REFERENCES "workplace"("id");--> statement-breakpoint
ALTER TABLE "workplace_user_mission" ADD CONSTRAINT "workplace_user_mission_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;