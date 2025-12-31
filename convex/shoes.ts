import { mutation, query } from "./_generated/server";
import { v,ConvexError } from "convex/values";
import { authComponent } from "./auth";
export const createShoe = mutation({
  args: { name: v.string(),description: v.string(),price: v.number(),colors: v.array(v.string()),gender: v.string(),picId: v.id('_storage')},
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError("You must be logged in to add a new shoe")
    }
   const newShoe = await ctx.db.insert("shoes",{
    name: args.name,
    description: args.description,
    price: args.price,
    authorId: user?._id,
    colors: args.colors,
    gender: args.gender,
    picId: args.picId,
   })
   return newShoe
  },
});
export const getShoes = query({
  args:{},
  handler: async (ctx) => {
    const shoes = await ctx.db.query("shoes").order('desc').collect()
    return await Promise.all(shoes.map(async (shoe) => {
      const reslovedImageUrl = shoe.picId !== undefined ? await ctx.storage.getUrl(shoe.picId) : null
      return {
        ...shoe,
        imageUrl: reslovedImageUrl
      }
    })) 
  },
})
export const generateImageUploadUrl = mutation({
  args:{},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if(!user){
      throw new ConvexError("You must be logged in to add a new shoe")
    }
    return await ctx.storage.generateUploadUrl()
  },
})
export const getShoeById = query({
  args: { 
    shoeId: v.id("shoes")
  },
  handler: async (ctx, args) => {
    const shoe = await ctx.db.get(args.shoeId);
    if(!shoe){
      return null
    }
    const resolvedImageUrl = shoe?.picId !== undefined ? await ctx.storage.getUrl(shoe.picId) : null;
    return {
      ...shoe,
      imageUrl: resolvedImageUrl
    }
  }
})