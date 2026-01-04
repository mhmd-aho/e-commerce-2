import { mutation, query } from "./_generated/server";
import { v,ConvexError } from "convex/values";
import { authComponent } from "./auth";
export const getFavoriteItems = query({
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if (!user) {
            return [];
        }
        const favoriteItems = await ctx.db.query('favorite').filter(q => q.eq(q.field('userId'), user._id)).order('desc').collect()
        
        const item = await Promise.all(favoriteItems.map(async (item) => {
            const shoe = await ctx.db.get(item.shoeId)
            if(!shoe){
                return null
            }
            const resolvedImageUrl = shoe.picId !== undefined ? await ctx.storage.getUrl(shoe.picId) : null
            const shoeWithImage = {
                ...shoe,
                imageUrl: resolvedImageUrl
            }
            return {
                ...item,
                shoeWithImage,
            }
        }))

        return item.filter((i) => i !== null);
    }
})
export const addToFavorite = mutation({
    args:{
        shoeId: v.id('shoes'),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if(!user){
            throw new ConvexError("You must be logged in to add a new shoe")
        }
        const favoriteItem = await ctx.db.query('favorite').filter(q => q.and(q.eq(q.field('userId'), user._id), q.eq(q.field('shoeId'), args.shoeId))).first()
        if(favoriteItem){
            await ctx.db.delete(favoriteItem._id)
            return { status: 'removed', id: favoriteItem._id }
        }
        const newShoeInFavorite = await ctx.db.insert("favorite",{
            userId: user._id,
            shoeId: args.shoeId,
        })
        return { status: 'added', id: newShoeInFavorite }
    }
})
export const removeFromFavorite = mutation({
    args:{
        favoriteId: v.id('favorite'),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if(!user){
            throw new ConvexError("You must be logged in to remove a favorite")
        }
        const favoriteItem = await ctx.db.get(args.favoriteId)
        if(!favoriteItem){
            throw new ConvexError("Favorite not found")
        }
        await ctx.db.delete(args.favoriteId)
    }
})