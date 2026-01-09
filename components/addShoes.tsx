"use client"
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useContexts } from "@/app/context/useContext";
import { usePathname } from "next/navigation";
export function AddShoe(){
    const {setNavOpen} = useContexts()
    const pathName = usePathname()
    const user = useQuery(api.auth.getCurrentUser)
    
    if(user?.username !== 'admin') return null

    return(
        <Link className={`px-4 py-1 rounded-full font-inter lg:text-white max-sm:text-2xl text-black transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathName === "/addShoe" ? "lg:bg-accent lg:rounded-full max-sm:text-accent " : ""}`} href="/addShoe" onClick={()=>setNavOpen(false)}>Add shoe</Link>    
    )
}