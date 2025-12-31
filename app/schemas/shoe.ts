import { z } from "zod";
export const shoeSchema = z.object({
    name: z.string().min(3).max(30),
    description: z.string().min(10).max(200),
    price: z.coerce.number().min(1),
    colors: z.array(z.string()),
    gender: z.string(),
    image: z.instanceof(File),
})