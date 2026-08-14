import { db } from "@/db";
import { workplaceCategory } from "@/db/schema";

export const getWorkplaceCategories = async () => {
  return db.select().from(workplaceCategory);
};
