import { z } from 'zod'

export const tenantSchema = z.object({
  name: z.string('is invalid'),
  number:z.string('is Invalid'),
  email: z.string().optional(),
  property_id: z.string('is Invalid'),
  unit_id:z.string(),
  house:z.string('is Invalid'),
  house_number:z.string(),

}) 

export type TenantFormValues = z.infer<typeof tenantSchema>