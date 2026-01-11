'use client'
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { ShoesSkeleton } from "./ShoesSkeleton";
import { Card } from "./card";
import { ContextProvider } from "@/app/context/context";

export function BestShoes(){
    const {results,status} = usePaginatedQuery(api.shoes.getShoes,{},{initialNumItems:4})
    if(status === 'LoadingFirstPage'){
        return(
            <>
                {
                    Array.from({length:4}).map((_, index) => (
                        <ShoesSkeleton key={index}/>
                    ))
                }
            </>

        )

    }
    return(
        <ContextProvider>
            {
                results.map((shoe)=>(
                    <Card key={shoe._id} shoe={shoe}/>
                ))
            }
        </ContextProvider>
    )
}