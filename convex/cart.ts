import { mutation, query } from "./_generated/server";
import { v,ConvexError } from "convex/values";
import { authComponent } from "./auth";

export const getCartItems = query({
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if (!user) {
            return [];
        }
        const cartItems = await ctx.db.query('cart').filter(q => q.eq(q.field('userId'), user._id)).order('desc').collect()
        
        const itemsWithUrls = await Promise.all(cartItems.map(async (item) => {
            return {
                ...item,
                imageUrl: item.picId ? await ctx.storage.getUrl(item.picId) : null
            }
        }))

        return itemsWithUrls;
    }
})
export const addToCart = mutation({
    args:{
        shoeId: v.id('shoes'),
        name: v.string(),
        price: v.number(),
        picId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if(!user){
            throw new ConvexError("You must be logged in to add a new shoe")
        }
          const newShoeInCart = await ctx.db.insert("cart",{
            userId: user?._id,
            shoeId: args.shoeId,
            name: args.name,
            price: args.price,
            picId: args.picId,
   })
   return {newShoeInCart}
    }
})
