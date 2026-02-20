import { z } from 'zod'

export const waterReadingSchema = z.object({
  name: z.string(),
  number:z.string(),
  property_id: z.string(),
  house:z.string(),
  unit_id: z.string(),
  current_reading: z.number().int(),
  previous_reading: z.number().int()
})

export type WaterReading = z.infer<typeof waterReadingSchema>