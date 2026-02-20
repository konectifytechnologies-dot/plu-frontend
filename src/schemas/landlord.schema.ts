import { z } from 'zod'
const landlordTypeEnum = z.enum(['individual', 'company', ''])
const landlordAdditionalDataSchema = z.object({
  landlord_type: landlordTypeEnum,
}, 'invalid landlord type')
export const landlordSchema = z.object({
  name: z.string('inavlid name'),
  number:z.string(),
  email: z.string().optional(),
  additional_data: z.any(),
})

export type Landlord = z.infer<typeof landlordSchema>