"use client"
import Image from "next/image"
import favorites from "@/public/assets/icons/mdi_heart-outline.svg"
import { useState } from "react"

export function Favorites(){
    const [open, setOpen] = useState(false)
    return(
        <>
            <Image onClick={() => setOpen(!open)} src={favorites} alt="Favorites" className="h-full w-auto" />
            {
                open && (
                    <div className="fixed top-12 right-5 w-96 h-96 rounded-lg shadow-lg bg-white flex flex-col items-start justify-start p-2 z-50">
                        <h1 className="text-black border-b border-neutral-300 pb-2 w-full">Favorites</h1>
                        <div className="flex flex-col items-start justify-start w-full flex-1 overflow-y-auto">
                            <div className="flex items-center justify-between w-full p-2 border-b border-neutral-300">
                                <div>
                                    <p>Product</p>
                                    <p>Price</p>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full p-2 border-b border-neutral-300">
                                <div>
                                    <p>Product</p>
                                    <p>Price</p>
                                </div>
                                <div>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full p-2 border-b border-neutral-300">
                                <div>
                                    <p>Product</p>
                                    <p>Price</p>
                                </div>
                                <div>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full p-2 border-b border-neutral-300">
                                <div>
                                    <p>Product</p>
                                    <p>Price</p>
                                </div>
                                <div>
                                    <p>Quantity</p>
                                    <p>Total</p>
                                </div>
                            </div>
                            </div>
                        </div>
                )
            }
        </>
    )
}