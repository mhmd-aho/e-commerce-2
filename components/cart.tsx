"use client"
import Image from "next/image"
import cart from "@/public/assets/icons/cart.svg"
import { useState } from "react"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"

export function Cart(){
    const [open, setOpen] = useState(false)
    const cartItems = useQuery(api.cart.getCartItems)
    return(
        <>
            <Image onClick={() => setOpen(!open)} src={cart} alt="Cart" className="h-full w-auto" />
            {
                open && (
                    <div className="fixed top-12 right-5 w-96 h-96 rounded-lg shadow-lg bg-white flex flex-col items-start justify-start z-50">
                        <h1 className="text-black border-b border-neutral-300 p-2 w-full">Cart</h1>
                        <div className="flex flex-col items-start justify-start w-full flex-1 overflow-y-auto">
                           {
                            cartItems && cartItems.length > 0?
                            cartItems.map(item=>{
                                return(
                                    <Link  href={`/product/${item.shoeId}`} key={item._id} className="flex justify-between hover:bg-neutral-200 p-2 w-full">
                                        <div className="relative size-20 rounded-lg overflow-hidden">
                                            <Image fill className="object-cover object-center" src={item.imageUrl || '/assets/img/placeholder.png'} alt={item.name} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-black">{item.name}</h2>
                                            <h4 className="text-neutral-600">{item.price}$</h4>
                                        </div>
                                    </Link>
                                )
                            }):
                            <h2 className="text-neutral-600 font-inter m-auto">No items in cart</h2>
                           }
                        </div>
                    </div>
                )
            }
        </>
    )
}