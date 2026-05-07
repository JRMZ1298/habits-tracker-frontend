import { z } from "zod";

export const identitySchema = z.object({
  displayName: z.string().min(1, "Nombre requerido"),
  email: z.string().min(1, "Correo requerido").email("Correo inválido"),
});

export type IdentityFormData = z.infer<typeof identitySchema>;
