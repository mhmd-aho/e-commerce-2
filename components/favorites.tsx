"use client"
import favorites from "@/public/assets/icons/mdi_heart-outline.svg"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import trash from "@/public/assets/icons/trash.svg"
import Link from "next/link";
const PopupVariants = {
    hidden:{
        opacity:0,
        y:-500
    },
    visible:{
        opacity:1,
        y:0
    }
}
export function Favorites(){
    const [open, setOpen] = useState(false)
     const user = useQuery(api.auth.getCurrentUser)
    const favoriteItems = useQuery(api.favorites.getFavoriteItems)
    const removeFromFavorite = useMutation(api.favorites.removeFromFavorite).withOptimisticUpdate((localStore, args) => {
        const existingFavorites = localStore.getQuery(api.favorites.getFavoriteItems);
        if (existingFavorites) {
            localStore.setQuery(api.favorites.getFavoriteItems, {}, existingFavorites.filter((item) => item?._id !== args.favoriteId));
        }
    });
    if(user){
        return(
            <>
                <Image onClick={() => setOpen(!open)} src={favorites} alt="Favorites" className="h-full w-auto" />
                <AnimatePresence>
                {
                    open && (
                        <motion.div variants={PopupVariants} animate='visible' exit='hidden' initial='hidden' className="fixed top-12 right-5 w-96 h-96 rounded-lg shadow-lg bg-white flex flex-col items-start justify-start z-50">
                            <h1 className="text-black border-b border-neutral-300 p-2 w-full">Favorites</h1>
                            <div className="flex flex-col items-start justify-start w-full flex-1 overflow-y-auto">
                                 {
                                        favoriteItems === undefined?(
                                            Array.from({ length: 3 }).map((_, index) => (
                                                <div key={index} className="flex justify-start items-center gap-2 py-2 px-4 w-full">
                                                                <div className="relative size-20 rounded-lg bg-neutral-800 animate-pulse"/>
                                                                <div className="flex flex-col gap-0.5">
                                                                    <div className="h-2 w-24 bg-neutral-800 animate-pulse"/>
                                                                    <div className="h-2 w-20 bg-neutral-800 animate-pulse"/>
                                                                </div>
                                                </div>
                                            ))
                                        )
                                        :
                                        favoriteItems.length > 0?
                                        favoriteItems.map(item=>{
                                            if(!item){
                                                return null
                                            }
                                            const shoe = item.shoeWithImage
                                            if(!shoe){
                                                return null
                                            }
                                            return(
                                                 <Link href={`/product/${shoe._id}`} key={item._id} className="relative flex justify-start items-center gap-2 py-2 px-4 w-full hover:bg-neutral-200">
                                                                <div className="relative size-20 rounded-lg overflow-hidden">
                                                                    <Image fill className="object-cover object-center" src={shoe?.imageUrl || '/assets/img/placeholder.png'} alt={shoe?.name} />
                                                                </div>
                                                                <div className="flex justify-between items-center flex-1">
                                                                    <div className="flex flex-col gap-0.5" >
                                                                        <p className="text-black font-bold font-poppins">{shoe?.name.length>15?shoe?.name.slice(0,15)+'...':shoe?.name}</p>
                                                                        <p className="text-black font-orbitron font-semibold">{shoe?.price}$</p>
                                                                    </div>
                                                                <button className="h-5 w-5 relative cursor-pointer" 
                                                                onClick={(e)=>{
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                        removeFromFavorite({favoriteId:item._id})
                                                                    }}
                                                                ><Image src={trash} alt="Trash" fill /></button>
                                                                </div>
                                                </Link>
                                            )
                                        }):
                                        <h2 className="text-neutral-600 font-inter m-auto">No items in cart</h2>
                                    }
                                    </div>
                                </motion.div>
                            )
                        }
                </AnimatePresence>
            </>
        )
    }
}