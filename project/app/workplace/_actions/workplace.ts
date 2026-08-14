"use server";

import { CreateWorkplaceFormData } from "../_schema/workplace";
import { revalidatePath } from "next/cache";

import { getUserFromSession } from "@/app/_helpers/session";
import { db } from "@/db";
import { workplace } from "@/db/schema";

export const createWorkplace = async (data: CreateWorkplaceFormData) => {
  console.log("from action server: ", data);

  const user = await getUserFromSession(); // check user authenticated

  if (!user) {
    return {
      error: "user not authenticated",
      success: false,
    };
  }

  const imageDefault = "/images/workplace.jpg";

  const payload = {
    name: data.name,
    street: data.street,
    city: data.city,
    postalCode: 56310,
    image: imageDefault,
    workplaceCategoryId: data.categoryId,
  };

  try {
    await db.insert(workplace).values(payload).returning();

    revalidatePath("/workplace");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    // permet de voir l'erreur sql
    console.error("Insert workplace failed: ", error);

    if (error instanceof Error && "cause" in error) {
      console.error("PostgresQL cause: ", error.cause);
    }

    return {
      success: false,
      error: "Impossible de créer l'établissement",
    };
  }
};
