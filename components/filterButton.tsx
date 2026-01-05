"use client"
import filterIcon from "@/public/assets/icons/filters.svg"
import Image from "next/image";
import { useContexts } from "@/app/context/useContext";
export  function FilterButton() {
    const {filterOpen,setFilterOpen} = useContexts()
    return (
        <button className="flex items-center gap-1 text-white font-inter" onClick={() => setFilterOpen(!filterOpen)}>
            {
                filterOpen?(
                    <span>Hide Filters</span>
                ):(
                    <span>Show Filters</span>
                )
            }
            <Image width={20} height={20} src={filterIcon} alt="filter" className="w-6 h-6" />
        </button>
    )
}