import * as z from "zod";

export const registerSchema = z.object({
  email: z.email("Email invalide").trim(),
  password: z
    .string()
    .trim()
    .min(8, "Le mot de passe doit contenir au moins 8 caracteres"),
  name: z
    .string()
    .trim()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caracteres")
    .max(50, "Le nom d'utilisateur est trop long (max 50 caracteres"),
  image: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
