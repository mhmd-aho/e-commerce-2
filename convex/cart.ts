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
        
        const item = await Promise.all(cartItems.map(async (item) => {
            const shoe = await ctx.db.get(item.shoeId)
            if(!shoe){
                return null
            }
            const reslovedImageUrl = shoe.picId !== undefined ? await ctx.storage.getUrl(shoe.picId) : null
            const shoeWithImage = {
                ...shoe,
                imageUrl: reslovedImageUrl
            }
            return {
                ...item,
                shoeWithImage,
            }
        }))

        return item;
    }
})
export const addToCart = mutation({
    args:{
        shoeId: v.id('shoes'),
        size:v.number(),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if(!user){
            throw new ConvexError("You must be logged in to add a new shoe")
        }
        const cartItem = await ctx.db.query('cart').filter(q => q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('shoeId'), args.shoeId), q.eq(q.field('size'), args.size))).first()
        if(cartItem){
            await ctx.db.patch(cartItem._id, {
                quantity: cartItem.quantity + 1
            })
            return cartItem._id
        }
          const newShoeInCart = await ctx.db.insert("cart",{
            userId: user._id,
            shoeId: args.shoeId,
            quantity: 1,
            size: args.size,
   })
   return newShoeInCart
    }
})
