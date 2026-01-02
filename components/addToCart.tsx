"use client"
import { useParams } from "next/navigation"
import Button from "./button"
import { useState, useTransition } from "react"
import { addToCartAction } from "@/app/actions"
import { Id } from "@/convex/_generated/dataModel"

export function AddToCart() {
    const {id} = useParams()
    const [size, setSize] = useState<number>()
    const [popUp,setPopUp] = useState(false)
    const [error,setError] = useState(false)
    const [isPending, startTransition] = useTransition()
    const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const handleAddToCart = async () => {
        if(!size){
            setError(true)
            return null
        }
        startTransition(async () => {
            await addToCartAction({
                shoeId: id as Id<'shoes'>,
                size: size,
                quantity: 1,
            })
        setError(false);
        setSize(undefined)
        setPopUp(true)
    })
    }
    return (
       <>
       <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">Sizes:</p>
                        <div className="flex gap-1 flex-wrap">
                            {sizes.map((s) => (
                               <button 
                                    key={s}
                                    className={`px-5 py-1 rounded-xl transition-colors  hover:bg-black hover:text-white ${s === size ? 'bg-accent text-white' : 'bg-white text-black'}`}
                                    onClick={() => setSize(s)}
                                >
                                 <p>{s}</p>
                               </button> 
                            ))}
                        </div>
                        {error && <p className="text-red-500">Please select a size</p>}
                    </div>
                    <div className="flex justify-start items-center lg:gap-4 gap-2">
                                    <Button onClick={handleAddToCart} disabled={isPending}>{isPending ? "Loading..." : "Buy Now"}</Button>
                                    <Button>Add to favorite</Button>
                    </div>
                    {
                        popUp &&
                            <div className="fixed bottom-5 right-5 w-96 h-20 flex items-center justify-center z-50 bg-neutral-800 rounded">
                                <div onClick={()=>setPopUp(false)} className="absolute -top-2 left-2 h-5 w-5 bg-neutral-800 rounded-full flex justify-center items-center overflow-hidden border border-black">
                                    <button  className='text-sm text-neutral-400'>x</button>
                                </div>
                                <h3>Product added to cart</h3>
                            </div>
            }  
       </>
    )
}