import { z } from "zod";
export const cartSchema = z.object({
    shoeId: z.string(),
    name: z.string(),
    price: z.number(),
    picId: z.string(),
})