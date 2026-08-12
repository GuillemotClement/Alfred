import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
