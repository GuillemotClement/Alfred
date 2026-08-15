import * as z from "zod";

export const createWorkplaceSchema = z.object({
  name: z.string().trim().min(1, "Le nom est obligatoire"),
  street: z.string().trim().min(1, "L'adresse est obligatoire"),
  city: z.string().trim().min(1, "La ville est obligatoire"),
  image: z.string().optional(),
  description: z.string().trim().optional(),
  note: z.number().int().positive(),
  categoryId: z
    .number({
      error: "Veuillez sélectionner une catégorie",
    })
    .int()
    .min(0)
    .max(10)
    .positive(),
});

export type CreateWorkplaceFormData = z.infer<typeof createWorkplaceSchema>;

// TS schema
export type WorkplaceCategorie = {
  id: number;
  name: string;
};

export type WorkplaceListing = {
  id: number;
  name: string;
  street: string;
  city: string;
  categoryId: number | null;
  categoryName: string | null;
  description: string | null;
  note: number;
  image: string;
};

export type WorkplaceDetail = {
  id: number;
  name: string;
  street: string;
  city: string;
  categoryId: number | null;
  categoryName: string | null;
  image: string | null;
};
