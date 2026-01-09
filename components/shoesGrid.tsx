'use client'
import { useContexts } from "@/app/context/useContext"
import { Shoe } from "@/lib/constants"
import {Card} from "@/components/card"
export function ShoesGrid({shoes}: {shoes: Shoe[]}) {
    const {filters} = useContexts()
    let displayedShoes = shoes
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
                }
                if(filter.value === 'women'){
                    displayedShoes = displayedShoes.filter((shoe) => shoe.gender === 'women' || shoe.gender === 'both')
                }else{
                    displayedShoes = displayedShoes.filter((shoe) => shoe.gender === filter.value)
                }
            }
            if(filter.type === 'color'){
                displayedShoes = displayedShoes.filter((shoe) => shoe.colors.includes(filter.value as string))
            }
        })
    }
    if(displayedShoes.length === 0){
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-4 gap-2 pb-4 overflow-x-hidden w-full">
                <h1 className="col-span-2 sm:col-span-3 text-center">No shoes found</h1>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-4 gap-2 pb-4 overflow-x-hidden w-full">
        {
            displayedShoes.map((shoe) => (
                    <Card key={shoe._id} shoe={shoe} />
        
        ))
        }
       </div>
    )
}