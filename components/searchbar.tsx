"use client"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import searchW from '@/public/assets/icons/search.svg';
import searchB from '@/public/assets/icons/search-black.svg'
import { useEffect} from "react";
import { useContexts } from "@/app/context/useContext";
import { motion } from "motion/react";
import { PopupVariants } from "@/lib/constants";

export function Searchbar() {
  const {searchOpen,setSearchOpen,setNavOpen} = useContexts()
  const {setCartOpen,setFavOpen,setUserOpen,shoe,setShoe,isMobile} = useContexts()
   const searchResult = useQuery(api.shoes.searchShoes,shoe.length > 2? {query:shoe}: 'skip')
   useEffect(() => {
    if(shoe.length > 0 || searchOpen){
      setCartOpen(false)
      setFavOpen(false)
      setUserOpen(false)
      setNavOpen(false)
    }
   }, [shoe,searchOpen])
   if(!isMobile){
     return(
       <div className="relative bg-white flex justify-between items-center rounded-3xl h-full w-52 p-2 px-6">
         <Image
           width={20}
           height={20}
           src={searchB}
           alt="Search Icon"
           className="h-full w-auto"
         />
         <input
           type="text"
           placeholder="Search for shoes..."
           value={shoe}
           onChange={(e) => setShoe(e.target.value)}
           className="w-5/6 active:border-none focus:outline-none text-sm font-inter"/>
           {shoe.length > 0 && (
             <div className="absolute top-10 -left-24 h-96 w-96 bg-white rounded-lg p-1">
               <div className="w-full h-full overflow-y-auto">
                 {
                   searchResult === undefined? (
                     <h3 className="text-center text-black/50 mt-12">Searching...</h3>
                   ):
                   searchResult.length === 0 ? (
                     <h3 className="text-center text-black/50 mt-12">No results found</h3>
                   ) : (     
                     searchResult.map((s) => (
                       <Link href={`/product/${s._id}`} key={s._id} className="relative flex justify-start items-center gap-2 py-2 px-4 w-full hover:bg-neutral-200">
                         <div className="relative size-20 rounded-lg overflow-hidden">
                             <Image fill className="object-cover object-center" src={s.imageUrl || '/assets/img/placeholder.png'} alt={s.name} />
                         </div>
                         <div className="flex justify-between items-center flex-1">
                             <div className="flex flex-col gap-0.5" >
                                 <p className="text-black font-bold font-poppins">{s.name.length>15?s.name.slice(0,15)+'...':s.name}</p>
                                 <p className="text-black font-orbitron font-semibold">{s.price}$</p>
                             </div>
                         </div>
                       </Link>
                   ))
                 )}
               </div>
             </div>
           )}
       </div>
     );
   }else{
    return(
      <>
      <button onClick={
        () => {
          setSearchOpen(!searchOpen)
        }
      } className=" h-full">
      <Image
           width={20}
           height={20}
           src={searchW}
           alt="Search Icon"
           className="h-full w-auto"
         />
      </button>
      {
        searchOpen && (
          <motion.div variants={PopupVariants} animate='visible' exit='hidden' initial='hidden' className="fixed top-10 right-0 lg:w-96 w-full h-[calc(100vh-2rem)] bg-white flex flex-col items-start justify-start z-50">
            <div className="border-b border-neutral-300 flex flex-col items-center justify-center w-full p-2">
                <h1 className="text-black">Search</h1>
                <input
              type="text"
              placeholder="Search for shoes..."
              value={shoe}
              onChange={(e) => setShoe(e.target.value)}
              className="w-5/6 p-2 rounded-full text-white active:border-none focus:outline-none text-sm font-inter bg-black"/>
            </div>
            {
                   searchResult === undefined? (
                     <h3 className="m-auto text-black/50 mt-12">Searching...</h3>
                   ):
                   searchResult.length === 0 ? (
                     <h3 className="m-auto text-black/50 mt-12">No results found</h3>
                   ) : (     
                     searchResult.map((s) => (
                       <Link href={`/product/${s._id}`} key={s._id} className="relative flex justify-start items-center gap-2 py-2 px-4 w-full hover:bg-neutral-200">
                         <div className="relative size-20 rounded-lg overflow-hidden">
                             <Image fill className="object-cover object-center" src={s.imageUrl || '/assets/img/placeholder.png'} alt={s.name} />
                         </div>
                         <div className="flex justify-between items-center flex-1">
                             <div className="flex flex-col gap-0.5" >
                                 <p className="text-black font-bold font-poppins">{s.name.length>15?s.name.slice(0,15)+'...':s.name}</p>
                                 <p className="text-black font-orbitron font-semibold">{s.price}$</p>
                             </div>
                         </div>
                       </Link>
                   ))
                 )}
          </motion.div>
        )
      }
      </>
    )
   }
}
