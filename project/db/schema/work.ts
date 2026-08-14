import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const workplaceCategory = pgTable("worplace_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
});

export const workplace = pgTable("workplace", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  street: varchar().notNull(),
  city: varchar().notNull(),
  image: varchar(),
  description: text(),
  note: integer().notNull(),
  workplaceCategoryId: integer("worplace_category_id")
    .notNull()
    .references(() => workplaceCategory.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
