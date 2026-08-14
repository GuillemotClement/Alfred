import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { timestamp } from "drizzle-orm/cockroach-core";

export const workplaceCategory = pgTable("worplace_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
});

export const workplace = pgTable("workplace", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  street: varchar().notNull(),
  city: varchar().notNull(),
  postalCode: integer("postal_code").notNull(),
  image: varchar(),
  workplaceCategoryId: integer("worplace_category_id")
    .notNull()
    .references(() => workplaceCategory.id, { onDelete: "cascade" }),
});

export const workplaceUser = pgTable("workplace_user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: text(),
  value: integer().notNull(),
  workplaceId: integer("workplace_id")
    .notNull()
    .references(() => workplace.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const workplaceUserMission = pgTable("workplace_user_mission", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workedAt: timestamp("worked_at").notNull(), //date de mission
  workplaceId: integer("workplace_id")
    .notNull()
    .references(() => workplace.id),
  userID: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
