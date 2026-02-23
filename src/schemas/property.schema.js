import { z } from 'zod';
export const propertySchema = z.object({
    name: z.string('is Invalid'),
    picture: z.string('is Invalid'),
    units: z.int('is Invalid'),
    location: z.string('is Invalid'),
    water_cost: z.int('is Invalid'),
    property_type: z.string('is Invalid'),
    has_service_charge: z.boolean('is Invalid'),
    service_charge: z.int('is Invalid').optional(),
    landlord_id: z.string('is Invalid'),
    landlord: z.string('is Invalid')
});
