"use client"
import Link from "next/link";
import Image from "next/image";
import { getColor, Shoe } from "@/lib/constants";
import { motion } from "motion/react";
import { useState } from "react";
import { useContexts } from "@/app/context/useContext";
export  function Card({shoe}: {shoe: Shoe}) {
    const {isMobile} = useContexts()
    const [hover,setHover] = useState<boolean>(false)
    let name:string = shoe.name
    if (name.length > 15) {
        name = name.slice(0, 15) + '...'
    }
    return (
           <Link onMouseEnter={()=>{
               if(isMobile){  
                return
            }
            setHover(true) }} onMouseLeave={()=>{
                if(isMobile){
                    return
                }
                setHover(false)
            }}  href={`/product/${shoe._id}`} className="relative w-full h-60 sm:h-72 lg:h-96 shadow-xl flex flex-col overflow-hidden origin-center hover:scale-105 transition-all duration-200">
                    <motion.div animate={hover?{scale:1.7,y:72,opacity:0.6}:{scale:1,y:0,opacity:1}} transition={{duration:0.2,ease:"easeIn"}} className="relative sm:h-3/5 h-1/2 w-full overflow-hidden">
                      <Image src={shoe.imageUrl ?? '/assets/img/placeholder.png'} alt={shoe.name} fill className='object-cover object-center' unoptimized />
                    </motion.div>
                    <motion.div animate={hover?{opacity:0,y:72}:{opacity:1,y:0}} transition={{duration:0.2,ease:"easeIn"}} 
                        className="sm:h-2/5 h-1/2 flex flex-col justify-baseline items-baseline gap-1 p-2 overflow-hidden"
                    >
                        <h3>{name}</h3>
                        <div className="flex justify-between items-center gap-2">
                            <p className='text-neutral-400'>colors:</p>
                            <div className="flex gap-1">
                                {shoe.colors &&
                                shoe.colors.map((color) => (
                                    <span key={color} className="sm:w-5 sm:h-5 w-4 h-4 rounded-full" style={{ backgroundColor: getColor(color) }}></span>
                                ))
                                }
                            </div>
                        </div>
                        <h4>{shoe.price}$</h4>
                    </motion.div>
            </Link>
    )
}