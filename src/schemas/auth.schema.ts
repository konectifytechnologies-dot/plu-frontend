// schemas/auth.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  number: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})



export type LoginInput = z.infer<typeof loginSchema>