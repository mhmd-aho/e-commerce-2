import { z } from "zod";
export const cartSchema = z.object({
    shoeId: z.string(),
    quantity: z.number(),
    size: z.number(),
})