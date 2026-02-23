import { z } from "zod";
export const repairItemSchema = z.object({
    name: z.string().min(1, "Item name is required"),
    cost: z.coerce.number().min(0, "Cost must be 0 or more"),
});
export const repairsSchema = z.object({
    description: z.string().optional(),
    property_id: z.string(),
    house: z.string(),
    unit: z.string(),
    unit_id: z.string().optional(),
    items: z.array(repairItemSchema).min(1),
});
