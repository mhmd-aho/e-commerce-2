"use client"
import { useContexts } from "@/app/context/useContext";
import { AddShoe } from "./addShoes";
import Link from "next/link";
import menu from '@/public/assets/icons/humber.svg';
import Image from 'next/image'
import { motion } from "motion/react";
import { PopupVariants } from "@/lib/constants";
import { usePathname } from "next/navigation";
export function Navbar() {
    const pathName = usePathname() 
    const {isMobile,navOpen,setNavOpen,setFavOpen,setUserOpen,setShoe,setSearchOpen,setCartOpen} = useContexts()
    if(!isMobile){
        return (
            <nav aria-label="main navigation" className="flex space-x-6">
                <Link href="/" className={`px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathName === "/" ? "bg-accent rounded-full" : ""}`}>Home</Link>
                <Link href="/shop" className={`px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathName === "/shop" ? "bg-accent rounded-full" : ""}`}>Shop</Link>
                <Link href="/about" className={`px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathName === "/about" ? "bg-accent rounded-full" : ""}`}>About</Link>
                <AddShoe/>
            </nav>
        )
    }else{
        return(
            <>
            <div className="absolute right-1 size-5">
                <button className="relative size-5  " onClick={()=>{ 
                        setNavOpen(!navOpen)
                        if(!navOpen){
                            setFavOpen(false)
                            setUserOpen(false)
                            setShoe("")
                            setSearchOpen(false)
                            setCartOpen(false)
                        }
                        }}>
                    <Image fill src={menu} alt="menu" />
                </button>

            </div>
            {
                navOpen && (
                    <motion.nav variants={PopupVariants} animate='visible' exit='hidden' initial='hidden' className="fixed lg:top-12 top-10 lg:right-5 right-0 lg:w-96 lg:h-[calc(70vh)] w-full h-[calc(100vh-2rem)] lg:rounded-lg shadow-lg bg-white flex flex-col items-start justify-start z-50">
                        <Link onClick={()=>setNavOpen(false)} href="/" className={`px-4 py-1 rounded-full font-inter  transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl ${pathName === "/" ? "text-accent" : "text-black"}`}>Home</Link>
                        <Link onClick={()=>setNavOpen(false)} href="/shop" className={`px-4 py-1 rounded-full font-inter  transition-all duration-200  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl ${pathName === "/shop" ? "text-accent" : "text-black"}`}>Shop</Link>
                        <Link onClick={()=>setNavOpen(false)} href="/about" className={`px-4 py-1 rounded-full font-inter  transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-2xl ${pathName === "/about" ? "text-accent" : "text-black"}`}>About</Link>
                        <AddShoe/>
                    </motion.nav>
                )
            }
        </>)
}
}