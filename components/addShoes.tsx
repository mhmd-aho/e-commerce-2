"use client"
import Link from "next/link";
import { useConvexAuth } from "convex/react";
export function AddShoe(){
    const {isAuthenticated,isLoading} = useConvexAuth()
    return(
        !isLoading &&
        isAuthenticated &&(
            <Link className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black" href="/add-shoe">Add shoe</Link>    
        )

    )
}