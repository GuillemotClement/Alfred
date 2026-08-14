import * as z from "zod";

export const createWorkplaceSchema = z.object({
  name: z.string().trim().lowercase().min(1, "Le nom est obligatoire"),
  street: z.string().trim().toLowerCase().min(1, "L'adresse est obligatoire"),
  city: z.string().trim().lowercase().min(1, "La ville est obligatoire"),
  image: z.string().optional(),
  categoryId: z
    .number({
      error: "Veuillez sélectionner une catégorie",
    })
    .int()
    .positive(),
});

export type CreateWorkplaceFormData = z.infer<typeof createWorkplaceSchema>;

// TS schema
export type WorkplaceCategorie = {
  id: number;
  name: string;
};
