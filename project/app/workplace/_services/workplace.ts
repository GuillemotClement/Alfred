import { db } from "@/db";
import { workplace, workplaceCategory } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getWorkplaceCategories = async () => {
  return db.select().from(workplaceCategory);
};

export const getWorkplace = async () => {
  return db
    .select({
      id: workplace.id,
      name: workplace.name,
      street: workplace.street,
      city: workplace.city,
      categoryId: workplaceCategory.id,
      categoryName: workplaceCategory.name,
    })
    .from(workplace)
    .leftJoin(
      workplaceCategory,
      eq(workplace.workplaceCategoryId, workplaceCategory.id),
    );
};

export const deleteWorkplaceService = async (workplaceId: number) => {
  const [deletedWorkplace] = await db
    .delete(workplace)
    .where(eq(workplace.id, workplaceId))
    .returning();

  if (!deletedWorkplace) {
    throw new Error("Etablissement introuvable");
  }
  return deletedWorkplace;
};
