import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
});

export type RoleFormData = z.infer<typeof roleSchema>;
