import {Card} from "@/components/card"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Suspense } from "react"
import { Shoe } from "@/lib/constants"
import { ShoesSkeleton } from "./ShoesSkeleton"

export default function ShoesDisplay() {

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
            <ShoesGrid/>
        </Suspense>
    )
}
async function ShoesGrid() {
    const shoes = await fetchQuery(api.shoes.getShoes)
    if(shoes.length === 0){
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-4 gap-2 pb-4 overflow-x-hidden w-full">
                <h1 className="col-span-2 sm:col-span-3 text-center">No shoes found</h1>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-4 gap-2 pb-4 overflow-x-hidden w-full">
        {
            shoes.map((shoe) => (
                    <Card key={shoe._id} shoe={shoe as Shoe} />
        
        ))
        }
       </div>
    )
}