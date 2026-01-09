import { mutation, query } from "./_generated/server";
import { v,ConvexError } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";
export const createShoe = mutation({
  args: { name: v.string(),description: v.string(),price: v.number(),colors: v.array(v.string()),gender: v.string(),picId: v.id('_storage')},
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if(user?.username !== 'admin'){
      throw new ConvexError("You must be admin to add a new shoe")
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
  handler: async (ctx) => {
    const shoes = await ctx.db.query("shoes").order('desc').collect()
    return await Promise.all(shoes.map(async (shoe) => {
          const reslovedImageUrl = shoe.picId ? await ctx.storage.getUrl(shoe.picId) : null
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
    if(user?.username !== 'admin'){
      throw new ConvexError("You must be admin to add a new shoe")
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
    const resolvedImageUrl = shoe.picId ? await ctx.storage.getUrl(shoe.picId) : null;
    return {
      ...shoe,
      imageUrl: resolvedImageUrl
    }
  }
})
interface searchShoesResult {
  _id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}
export const searchShoes = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const result: Array<searchShoesResult> = []
    const pushDocs = async (docs: Array<Doc<'shoes'>>) => {
      for(const doc of docs){
        const resolvedImageUrl = doc.picId ? await ctx.storage.getUrl(doc.picId) : null;
        result.push({
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          imageUrl : resolvedImageUrl
        })
      }
    }
    const titleMatches = await ctx.db.query('shoes').withSearchIndex('search_name',(q)=>q.search('name',args.query)).collect()
    await pushDocs(titleMatches)
    return result
  }
})