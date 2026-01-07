"use client"
import {colors} from "@/lib/constants"
import Image from "next/image";
import {motion,AnimatePresence} from "motion/react"
import { useContexts } from "@/app/context/useContext"
import type { FilterType } from "@/app/context/context"
export default function Filters() {
    const {isMobile} = useContexts()
    const variants = {
        open:{
            width: isMobile ? "100%" : "20%" as const,
            padding: "1rem" as const,
            opacity: 1,
            transition: {
                opacity: {
                    duration: 0.3,
                    ease: 'easeOut' as const,
                    delay: 0.2
                },
                width: {
                    duration: 0.3,
                    ease: 'easeOut' as const
                },
                padding: {
                    duration: 0.3,
                    ease: 'easeOut' as const
                },
            }
        },
        closed:{
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                opacity: {
                    duration: 0.3,
                    ease: 'easeOut' as const,
                },
                width: {
                    duration: 0.3,
                    ease: 'easeOut' as const,
                    delay: 0.2
                },
                padding: {
                    duration: 0.3,
                    ease: 'easeOut' as const,
                    delay: 0.2
                },
            }
        }
    }
    const {filterOpen} = useContexts()
    const {filters,setFilters} = useContexts()
    const isActive = (filter: FilterType) => {
        return filters.some(f => {
            if (f.type !== filter.type) return false;
            if (typeof f.value === 'object' && typeof filter.value === 'object') {
                return f.value.min === filter.value.min && f.value.max === filter.value.max;
            }
            return f.value === filter.value;
        });
    }

    const handleAddFilter = (filter: FilterType) => {
        setFilters((prevFilters) => {
            const isFilterActive = prevFilters.some(f => {
                if (f.type !== filter.type) return false;
                if (typeof f.value === 'object' && typeof filter.value === 'object') {
                    return f.value.min === filter.value.min && f.value.max === filter.value.max;
                }
                return f.value === filter.value;
            });

            if (isFilterActive) {
                return prevFilters.filter(f => {
                    if (f.type !== filter.type) return true;
                    if (typeof f.value === 'object' && typeof filter.value === 'object') {
                        return !(f.value.min === filter.value.min && f.value.max === filter.value.max);
                    }
                    return f.value !== filter.value;
                });
            } else {
                if (['sort', 'gender', 'price','color'].includes(filter.type)) {
                    const others = prevFilters.filter(f => f.type !== filter.type);
                    return [...others, filter];
                }
                return [...prevFilters, filter];
            }
        });
    };

    return (
            <AnimatePresence>
            <motion.div initial={false} variants={variants} animate={filterOpen ? 'open' : 'closed'} className="flex flex-col gap-3 h-full px-4 pr-0">
                <div className="flex justify-between items-center">
                <h2>Filters</h2>
                <button onClick={() => setFilters([])} className="font-inter text-white/80 text-sm">Clear</button>
                </div>
                <div className="flex flex-col gap-2 pl-4">
                    <div>
                    <h3 className="text-white flex justify-between items-center gap-2">Sort by <button  ><Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow"  /></button></h3>
                                <ul
                                className="flex flex-col gap-1 font-inter text-sm text-neutral-300 overflow-hidden"
                                >
                                <li
                                    className={`h-6 p-1 ${isActive({type:'sort',value:'priceLowToHigh'}) ? 'bg-neutral-800' : ''}`}
                                >
                                    <button onClick={() => handleAddFilter({type:'sort',value:'priceLowToHigh'})}>
                                    Price: Low to High
                                    </button>
                                </li>

                                <li
                                    className={`h-6 p-1 ${isActive({type:'sort',value:'priceHighToLow'}) ? 'bg-neutral-800' : ''}`}
                                >
                                    <button onClick={() => handleAddFilter({type:'sort',value:'priceHighToLow'})}>
                                    Price: High to Low
                                    </button>
                                </li>
                                </ul>
                    </div>
                    <div>
                    <h3 className="text-white flex justify-between items-center gap-2">Gender <button><Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow" /></button></h3>
                            <ul
                            className="flex flex-col gap-1 font-inter text-sm text-neutral-300 overflow-hidden"
                            style={{ willChange: 'transform, opacity' }}
                            >
                            <li
                            className={`h-6 p-1 ${isActive({type:'gender',value:'men'}) ? 'bg-neutral-800' : ''}`}
                            >
                                <button onClick={() => handleAddFilter({type:'gender',value:'men'})}>Men</button>
                            </li>
                            <li
                                className={`h-6 p-1 ${isActive({type:'gender',value:'women'}) ? 'bg-neutral-800' : ''}`}
                            >
                                <button onClick={() => handleAddFilter({type:'gender',value:'women'})}>Women</button>
                            </li>
                            <li
                                className={`h-6 p-1 ${isActive({type:'gender',value:'both'}) ? 'bg-neutral-800' : ''}`}
                            >
                                <button onClick={() => handleAddFilter({type:'gender',value:'both'})}>Unisex</button>
                            </li>
                            </ul>
                    </div>
                    <div>
                    <h3 className="text-white flex justify-between items-center gap-2">Colors <Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow" /></h3>
                                <ul
                                className="flex flex-wrap gap-2 w-3/4"
                                >
                                {
                                    colors.map((color) =>(
                                        <button
                                        onClick={() => handleAddFilter({type:'color',value:color.key})}
                                            key={color.key}
                                            style={{ backgroundColor: color.css }}
                                            className={`h-5 w-5 rounded-full ${isActive({type:'color',value:color.key}) ? 'border-4 border-accent': ''}`}/>
                                    ))
                                }
                                </ul>
                    </div>
                    <div>
                        <h3 className="text-white flex justify-between items-center gap-2">Price range</h3>
        
                                    <ul
                                        className="flex flex-col gap-1 font-inter text-sm text-neutral-300"
                                    >
                                    <li className={`h-6 p-1 ${isActive({type:'price',value:{min:0,max:50}}) ? 'bg-neutral-800' : ''}`}><button onClick={() => handleAddFilter({type:'price',value:{min:0,max:50}})}>Price: $0 - $50</button></li>
                                    <li className={`h-6 p-1 ${isActive({type:'price',value:{min:50,max:100}}) ? 'bg-neutral-800' : ''}`}><button onClick={() => handleAddFilter({type:'price',value:{min:50,max:100}})}>Price: $50 - $100</button></li>
                                    <li className={`h-6 p-1 ${isActive({type:'price',value:{min:100,max:150}}) ? 'bg-neutral-800' : ''}`}><button onClick={() => handleAddFilter({type:'price',value:{min:100,max:150}})}>Price: $100 - $150</button></li>
                                    <li className={`h-6 p-1 ${isActive({type:'price',value:{min:150,max:200}}) ? 'bg-neutral-800' : ''}`}><button onClick={() => handleAddFilter({type:'price',value:{min:150,max:200}})}>Price: $150 - $200</button></li>
                                    </ul>
                </div>
                </div>
            </motion.div>
            </AnimatePresence>
    )
}
