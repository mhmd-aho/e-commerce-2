'use client'
import { api } from "@/convex/_generated/api"
import { ShoesSkeleton } from "./ShoesSkeleton"
import { ShoesGrid } from "./shoesGrid"
import { Shoe } from "@/lib/constants"
import { usePaginatedQuery } from "convex/react";

export default function ShoesDisplay() {
    const {results,status,loadMore} = usePaginatedQuery(api.shoes.getShoes,{},{initialNumItems:10})
    if(status === 'LoadingFirstPage'){
        return(
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 pb-4 overflow-x-hidden w-full">
                {
                    Array.from({length:6}).map((_, index) => (
                        <ShoesSkeleton key={index}/>
                    ))
                }
            </div>
        )
    }
    return(
        <ShoesGrid shoes={results as Shoe[]} status={status} loadMore={loadMore}/>
    )
}
