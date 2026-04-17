import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(128),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  phone: z.string().trim().min(5).max(30).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
