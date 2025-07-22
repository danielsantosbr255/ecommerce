import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  permissions: z.array(z.number()).optional(),
  users: z.array(z.string().uuid({ message: "ID inválido! ID deve ser um UUID" })).optional(),
});

export type RoleFormData = z.infer<typeof roleSchema>;
