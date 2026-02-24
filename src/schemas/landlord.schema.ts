import { z } from 'zod'


export const landlordSchema = z.object({
  name: z.string('inavlid name'),
  number:z.string(),
  email: z.string().optional(),
  additional_data: z.any(),
})

export type Landlord = z.infer<typeof landlordSchema>