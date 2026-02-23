import { z } from 'zod';
export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    number: z.string(),
    email: z.string().email(),
    role: z.string(),
});
