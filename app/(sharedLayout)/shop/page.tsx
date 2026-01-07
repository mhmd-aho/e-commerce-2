import Filters from "@/components/filters";
import ShoesDisplay from "@/components/shoesDisplay";
import { Metadata } from "next";
import { ContextProvider } from "@/app/context/context";
import {FilterButton} from "@/components/filterButton";
export const metadata: Metadata = {
    title: 'Shop | Nike e-commerce',
    description: 'discover the latest collection of shoes',
}

export default function Shop() {
    return (
        <ContextProvider>
            <section 
                className="h-screen bg-black overflow-hidden"
            >
                <div className="h-full flex flex-col pt-12 lg:px-4 px-3">
                <div className="shrink-0 flex justify-between items-center pb-4">
                    <h1>Collection</h1>
                    <FilterButton />
                </div>
                <div className='flex-1 flex sm:gap-2 overflow-hidden'>
                        <Filters />
                    <div className='flex-1 overflow-y-auto'>
                        <ShoesDisplay />
                    </div>
                </div>
            </div>
        </section>
        </ContextProvider>
    )
}