import { z } from 'zod'

export const unitSchema = z.object({
  name: z.string('is invalid'),
  bedrooms:z.int('is Invalid'),
  rent:z.int('is Invalid'),
  property_id: z.string('is Invalid'),
  property:z.string('is Invalid')

})

export type Unit = z.infer<typeof unitSchema>