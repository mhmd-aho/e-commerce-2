
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Suspense } from "react"
import { ShoesSkeleton } from "./ShoesSkeleton"
import { cacheLife, cacheTag } from "next/cache"
import { ShoesGrid } from "./shoesGrid"
import { Shoe } from "@/lib/constants"


export default async function ShoesDisplay() {
    'use cache'
    cacheLife('hours')
    cacheTag('shoes')
    const shoes = await fetchQuery(api.shoes.getShoes)
    return (
        <Suspense fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-4 gap-2 pb-4 overflow-x-hidden w-full">
                {
                    Array.from({length:6}).map((_, index) => (
                        <ShoesSkeleton key={index}/>
                    ))
                }
            </div>
        }>
            <ShoesGrid shoes={shoes as Shoe[]}/>
        </Suspense>
    )
}
