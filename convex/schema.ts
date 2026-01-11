import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    shoes: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        colors: v.array(v.string()),
        gender: v.string(),
        picId:  v.optional(v.id('_storage')),
        authorId:v.optional(v.string()),
    }).searchIndex('search_name',{
        searchField: 'name',
    }),
    cart: defineTable({
        userId:v.string(),
        shoeId:v.id('shoes'),
        quantity:v.number(),
        size:v.number(),
    }).index('user_cart', {
        fields: ['userId'],
    }),
    favorite: defineTable({
        userId:v.string(),
        shoeId:v.id('shoes'),
    }).index('user_favorite', {
        fields: ['userId'],
    })
})
