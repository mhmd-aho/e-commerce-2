'use client'
import { useContexts } from "@/app/context/useContext"
import { Shoe } from "@/lib/constants"
import {Card} from "@/components/card"
import { useEffect } from "react"
export function ShoesGrid({shoes,status,loadMore}: {shoes: Shoe[],status: string,loadMore: (numItems: number) => void}) {
    const {filters} = useContexts()
    let displayedShoes = [...shoes]
    if(filters.length > 0){
        filters.forEach((filter) => {
            if(typeof filter.value === 'object'){
                displayedShoes = displayedShoes.filter((shoe) => {
                    const value = filter.value as {min: number, max: number}
                    return shoe.price >= value.min && shoe.price <= value.max
                })
            }
            if(filter.type === 'sort'){
                displayedShoes.sort((a, b) => {
                    if(filter.value === 'priceLowToHigh'){
                        return a.price - b.price
                    }
                    return b.price - a.price
                })
            }
            if(filter.type === 'gender'){
                if(filter.value === 'men'){
                    displayedShoes = displayedShoes.filter((shoe) => shoe.gender === 'men' || shoe.gender === 'both')
                } else if(filter.value === 'women'){
                    displayedShoes = displayedShoes.filter((shoe) => shoe.gender === 'women' || shoe.gender === 'both')
                } else{
                    displayedShoes = displayedShoes.filter((shoe) => shoe.gender === filter.value)
                }
            }
            if(filter.type === 'color'){
                displayedShoes = displayedShoes.filter((shoe) => shoe.colors.includes(filter.value as string))
            }
        })
    }
    useEffect(()=>{
        if(displayedShoes.length === 0 && status === 'CanLoadMore'){
            loadMore(10)
        }
    },[displayedShoes.length,status,loadMore])
    if(displayedShoes.length === 0){
        return (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 pb-4 overflow-x-hidden w-full">
                <h1 className="col-span-2 lg:col-span-3 text-center">No shoes found</h1>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 pb-4 overflow-x-hidden w-full">
        {
            displayedShoes.map((shoe) => (
                    <Card key={shoe._id} shoe={shoe} />
        
        ))
        }
        {
            status === 'CanLoadMore' && (
                    <button className='col-span-2 lg:col-span-3 row-span-1 font-inter font-medium p-4 text-neutral-400 hover:text-white transition-all duration-200' onClick={()=>loadMore(10)}>Load More</button>
            )
        }
       </div>
    )
}