"use client"
import { useParams } from "next/navigation"
import Button from "./button"
import { useState, useTransition } from "react"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "react-toastify";
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
export function AddToCart() {
    const {id} = useParams()
    const [size, setSize] = useState<number>()
    const [error,setError] = useState(false)
    const [isPendingCart, startTransitionCart] = useTransition()
    const [isPendingFav, startTransitionFav] = useTransition()
    const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const addToCart = useMutation(api.cart.addToCart)
    const addToFavorite = useMutation(api.favorites.addToFavorite)
    const user = useQuery(api.auth.getCurrentUser)
    const favoriteItems = useQuery(api.favorites.getFavoriteItems)
    const itemExistsInFavorite =()=>{
        if(!favoriteItems){
            return false
        }
        return favoriteItems.some((item)=>item.shoeId === id)
    }
    const cartItems = useQuery(api.cart.getCartItems)
    const itemExistsInCart =()=>{
        if(!cartItems){
            return false
        }
        return cartItems.some((item)=>item.shoeId === id && item.size === size)
    }
    const handleAddToCart = async () => {
        if(!user){
            toast.error("Please login to add to cart")
            return null
        }
        if(!size){
            setError(true)
            return null
        }
        startTransitionCart(async () => {
            try {
                await addToCart({
                    shoeId: id as Id<'shoes'>,
                    size: size,
                })
                toast.success("Product added to cart")
                setError(false);
                setSize(undefined)
            } catch (error: unknown) {
                const errorMessage = (error as { data?: { message?: string }, message?: string })?.data?.message || (error as Error).message || "Failed to add to cart";
                toast.error(errorMessage)
            }
        })
    }
    const handleAddToFavorite = async () => {
        if(!user){
            toast.error("Please login to add to favorite")
            return null
        }
        startTransitionFav(async () => {
            try {
                const result = await addToFavorite({
                    shoeId: id as Id<'shoes'>,
                })
                if(result.status === 'removed'){
                    toast.success("Product removed from favorite")
                }else{
                    toast.success("Product added to favorite")
                }
            } catch (error: unknown) {
                const errorMessage = (error as { data?: { message?: string }, message?: string })?.data?.message || (error as Error).message || "Failed to add to favorite";
                toast.error(errorMessage)
            }
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
                                    <Button onClick={handleAddToCart} disabled={isPendingCart}>{isPendingCart ? "Loading..." : `${itemExistsInCart() ? "In Cart" : "Add to Cart"}`}</Button>
                                    <Button onClick={handleAddToFavorite} disabled={isPendingFav}>{isPendingFav ? "Loading..." : `${itemExistsInFavorite() ? "In Favorite" : "Add to Favorite"}`}</Button>
                    </div>
       </>
    )
}