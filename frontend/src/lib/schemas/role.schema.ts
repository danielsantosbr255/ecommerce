import { z } from "zod";

export const roleUpdateSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  description: z.string().optional(),
  permissions: z.array(z.number().int().positive("ID de permissão inválido")).optional(),
  users: z.array(z.string().uuid("ID de usuário inválido")).optional(),
});

export type RoleUpdateFormValues = z.infer<typeof roleUpdateSchema>;
