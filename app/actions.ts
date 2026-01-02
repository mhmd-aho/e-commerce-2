"use server"
import z from "zod";
import { shoeSchema } from "./schemas/shoe";
import { cartSchema } from "./schemas/cart";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
type FormValues = z.infer<typeof shoeSchema>;
type CartValues = z.infer<typeof cartSchema>;
export async function createShoeAction(data: FormValues) {
    try{
        const token = await getToken()
        const validatedData = shoeSchema.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        const imgUrl = await fetchMutation(api.shoes.generateImageUploadUrl,{}, {token})
        const uploadResult =  await fetch(imgUrl, {
            method: 'POST',
            headers: {
                'Content-Type': validatedData.data.image.type,
            },
            body: validatedData.data.image,
          });
          const {storageId} = await uploadResult.json()
          await fetchMutation(api.shoes.createShoe,{
              name: validatedData.data.name,
              description: validatedData.data.description,
              price: validatedData.data.price,
              colors: validatedData.data.colors,
              gender: validatedData.data.gender,
              picId: storageId,
          }, {token});
        } catch{
            return{
                error: 'Failed to upload image',
            }
        }
        revalidatePath('/shop')
        redirect('/shop')
}
export async function addToCartAction(data: CartValues) {
    const token = await getToken();

    if (!token) {
        redirect('/auth/signup');
    }

    try {
        const validatedData = cartSchema.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }

        await fetchMutation(api.cart.addToCart, {
            shoeId: validatedData.data.shoeId as Id<'shoes'>,
            size: validatedData.data.size,
        }, { token });
    } catch {
        return {
            error: 'Failed to add to cart',
        };
    }
}