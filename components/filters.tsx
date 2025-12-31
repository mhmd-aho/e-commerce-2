// import {colors} from "@/lib/constants"
import Image from "next/image";
export default function Filters() {

    return (
        <div className="flex flex-col gap-3 h-full w-full px-4 pr-0">
            <div className="flex justify-between items-center">
               <h2>Filters</h2>
               <button className="font-inter text-white/80 text-sm">Clear</button>
            </div>
            <div className="flex flex-col gap-2 pl-4">
                <div>
                <h3 className="text-white flex justify-between items-center gap-2">Sort by <button  ><Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow"  /></button></h3>
                            <ul
                            className="flex flex-col gap-1 font-inter text-sm text-white/80 overflow-hidden"
                            >
                            <li
                                className={`h-6 p-1`}
                            >
                                <button >
                                Price: Low to High
                                </button>
                            </li>

                            <li
                                className={`h-6 p-1`}
                            >
                                <button>
                                Price: High to Low
                                </button>
                            </li>
                            </ul>
                </div>
                <div>
                <h3 className="text-white flex justify-between items-center gap-2">Gender <button><Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow" /></button></h3>
                        <ul
                        className="flex flex-col gap-1 font-inter text-sm text-white/80 overflow-hidden"
                        style={{ willChange: 'transform, opacity' }}
                        >
                        <li
                           className="h-6 p-1"
                        >
                            <button>Men</button>
                        </li>
                        <li
                            className="h-6 p-1"
                        >
                            <button>Women</button>
                        </li>
                        <li
                            className="h-6 p-1"
                        >
                            <button>Unisex</button>
                        </li>
                        </ul>
                </div>
                <div>
                <h3 className="text-white flex justify-between items-center gap-2">Colors <Image width={10} height={10} src="/assets/icons/arrow.svg" alt="arrow" /></h3>
                            <ul
                            className="flex flex-wrap gap-2 w-3/4"
                            >
                            {/* {
                                colors.map((color) =>(
                                    <button
                                        key={color}
                                        style={{ backgroundColor: color }}
                                        className={`h-5 w-5 rounded-full`}/>
                                ))
                            } */}
                            </ul>
                </div>
                <div>
                    <h3 className="text-white flex justify-between items-center gap-2">Price range</h3>
    
                                <ul
                                    className="flex flex-col gap-1 font-inter text-sm text-white/80"
                                >
                                <li className={`h-6 p-1`}><button>Price: $0 - $50</button></li>
                                <li className={`h-6 p-1`}><button>Price: $50 - $100</button></li>
                                <li className={`h-6 p-1`}><button>Price: $100 - $150</button></li>
                                <li className={`h-6 p-1`}><button>Price: $150 - $200</button></li>
                                </ul>
            </div>
            </div>
        </div>
    )
}
