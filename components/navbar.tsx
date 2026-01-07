"use client"
import { useContexts } from "@/app/context/useContext";
import { AddShoe } from "./addShoes";
import Link from "next/link";
import menu from '@/public/assets/icons/humber.svg';
import Image from 'next/image'
import { motion } from "motion/react";
import { PopupVariants } from "@/lib/constants";
export function Navbar() {
    const {isMobile,navOpen,setNavOpen,setFavOpen,setUserOpen,setShoe,setSearchOpen,setCartOpen} = useContexts()
    if(!isMobile){
        return (
            <nav aria-label="main navigation" className="flex space-x-6">
                <Link href="/" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">Home</Link>
                <Link href="/shop" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">Shop</Link>
                <Link href="/about" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">About</Link>
                <AddShoe/>
            </nav>
        )
    }else{
        return(
            <>
            <button className="absolute right-0 h-full  " onClick={()=>{ 
                    setNavOpen(!navOpen)
                    if(!navOpen){
                        setFavOpen(false)
                        setUserOpen(false)
                        setShoe("")
                        setSearchOpen(false)
                        setCartOpen(false)
                    }
                    }}>
                <Image width={20} height={20}  src={menu} alt="menu" />
            </button>
            {
                navOpen && (
                    <motion.nav variants={PopupVariants} animate='visible' exit='hidden' initial='hidden' className="fixed lg:top-12 top-10 lg:right-5 right-0 lg:w-96 lg:h-[calc(70vh)] w-full h-[calc(100vh-2rem)] lg:rounded-lg shadow-lg bg-white flex flex-col items-start justify-start z-50">
                        <Link onClick={()=>setNavOpen(false)} href="/" className="px-4 py-1 rounded-full font-inter text-black transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl">Home</Link>
                        <Link onClick={()=>setNavOpen(false)} href="/shop" className="px-4 py-1 rounded-full font-inter text-black transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl">Shop</Link>
                        <Link onClick={()=>setNavOpen(false)} href="/about" className="px-4 py-1 rounded-full font-inter text-black transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl">About</Link>
                        <AddShoe/>
                    </motion.nav>
                )
            }
        </>)
}
}