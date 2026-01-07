"use client"
import Image from "next/image"
import cart from "@/public/assets/icons/cart.svg"
import {useTransition } from "react"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"
import { useMutation } from "convex/react"
import { motion, AnimatePresence } from 'motion/react'
import { useContexts } from "@/app/context/useContext"
import { PopupVariants,buttonVariants } from "@/lib/constants"


export function Cart(){
    const {cartOpen,setCartOpen,setFavOpen,setUserOpen,setShoe,setNavOpen,setSearchOpen} = useContexts()
    const user = useQuery(api.auth.getCurrentUser)
    const [isPending, startTransition] = useTransition()
    const cartItems = useQuery(api.cart.getCartItems)
    const increaseCart = useMutation(api.cart.increaseCart)
    const decreaseCart = useMutation(api.cart.decreaseCart)
    if(user){
        return(
            <>
            <button onClick={()=>{ 
                    setCartOpen(!cartOpen)
                    if(!cartOpen){
                        setFavOpen(false)
                        setUserOpen(false)
                        setShoe("")
                        setNavOpen(false)
                        setSearchOpen(false)
                    }
                    }} className="h-full">
                <Image width={20} height={20} src={cart} alt="Cart" />
            </button>
                <AnimatePresence>
                    {
                        cartOpen && (
                            <motion.div variants={PopupVariants} animate='visible' exit='hidden' initial='hidden' className="fixed lg:top-12 top-10 lg:right-5 right-0 lg:w-96 lg:h-[calc(70vh)] w-full h-[calc(100vh-2rem)] lg:rounded-lg shadow-lg bg-white flex flex-col items-start justify-start z-50">
                                <h1 className="text-black border-b border-neutral-300 p-2 w-full">Cart</h1>
                                <div className="flex flex-col items-start justify-start w-full flex-1 overflow-y-auto">
                                {
                                    cartItems === undefined?(
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 px-4 w-full">
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative size-20 rounded-lg bg-neutral-300 animate-pulse"/>
                                                            <div className="flex flex-col gap-0.5">
                                                                <div className="h-2 w-24 bg-neutral-300 animate-pulse"/>
                                                                <div className="h-2 w-20 bg-neutral-300 animate-pulse"/>
                                                                <div className="h-2 w-16 bg-neutral-300 animate-pulse"/>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-center justify-between p-1 bg-neutral-300 w-9 h-24 rounded-full animate-pulse "/>
                                            </div>
                                        ))
                                    )
                                    :
                                    cartItems.length > 0?
                                    cartItems.map(item=>{
                                        if(!item){
                                            return null
                                        }
                                        const shoe = item.shoeWithImage
                                        if(!shoe){
                                            return null
                                        }
                                        return(
                                            <Link  href={`/product/${shoe?._id}`} key={item._id} className="flex justify-between items-center hover:bg-neutral-200 py-2 px-4 w-full">
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative size-20 rounded-lg overflow-hidden">
                                                                <Image fill className="object-cover object-center" src={shoe?.imageUrl || '/assets/img/placeholder.png'} alt={shoe?.name} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <p className="text-black font-bold font-poppins">{shoe?.name.length>15?shoe?.name.slice(0,15)+'...':shoe?.name}</p>
                                                                <p className="text-black font-inter">Size: <span className="text-neutral-600">{item.size}</span></p>
                                                                <p className="text-black font-orbitron font-semibold">{shoe?.price * item.quantity}$<span className="text-neutral-600 text-sm">({shoe?.price}$ x {item.quantity})</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-center justify-between p-1 bg-neutral-300 w-9 h-24 rounded-full ">
                                                            <motion.div variants={buttonVariants} whileTap="whileTap" whileHover="whileHover" className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
                                                                <button onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                    startTransition(() => {
                                                                    decreaseCart({ cartItemId: item._id })
                                                                })
                                                            }} disabled={isPending} className={`bg-white px-3 py-1 rounded-full ${isPending && 'opacity-50'}`}>-</button>
                                                            </motion.div>
                                                            <p>{item.quantity}</p>
                                                            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1,opacity: 0.8 }} transition={{ type: 'spring', stiffness: 200 }} className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
                                                                <button onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                    startTransition(() => {
                                                                        increaseCart({ cartItemId: item._id })
                                                                    })
                                                                }} disabled={isPending} className={`${isPending && 'opacity-50'}`}>+</button>
                                                            </motion.div>
                                                        </div>  
                                            </Link>
                                        )
                                    }):
                                    <h2 className="text-neutral-600 font-inter m-auto">No items in cart</h2>
                                }
                                </div>
                                <div className="flex flex-col items-start justify-center gap-4 p-3 w-full border-t border-neutral-300">
                                    <h4 className="text-black text-3xl font-extrabold">{ cartItems ? cartItems.reduce((total, item) => total + (item?.shoeWithImage?.price || 0) * (item?.quantity || 1), 0) : 0}$</h4>
                                    <motion.button variants={buttonVariants} whileTap="whileTap" whileHover="whileHover" className='font-inter font-medium w-full shadow-lg bg-accent text-white py-2 px-4 rounded-lg'>Checkout</motion.button>
                                </div>
                            </motion.div>
                            
                        )
                    }
                </AnimatePresence>
        </>
    )
}
}