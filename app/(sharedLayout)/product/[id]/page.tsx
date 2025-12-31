import { getColor } from "@/lib/constants";
import { ProductButtons } from "@/components/porductButtons";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
interface Props {
    params: Promise<{id: Id<"shoes">}>
}
export default async function Product ({ params }: Props) {
    const {id} = await params
    const shoe = await fetchQuery(api.shoes.getShoeById, {shoeId: id})
    const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    if (!shoe) {
        return (
            <section className="h-screen bg-black flex justify-center items-center">
                <h1 className="text-white text-2xl">Product not found</h1>
            </section>
        )
    }
    
    return (
        <section className="h-[calc(100vh-2.5rem)] lg:h-[calc(100vh-3rem)] sm:h-[calc(150vh-3rem)]  lg:pt-12 pt-10 bg-black overflow-hidden">
            <div className="relative flex flex-col lg:flex-row justify-center items-center lg:gap-12 h-full">
                        <div className="relative aspect-square lg:h-96 lg:w-96  max-sm:w-full max-sm:h-auto shadow-sm overflow-hidden">
                            <Image  alt={shoe.name} fill className="object-cover object-center" src={shoe.imageUrl ?? '/assets/img/placeholder.png'} />
                        </div>
                <div className="flex flex-col lg:gap-4 gap-2 lg:w-1/4 w-full p-2">
                    <h1>{shoe.name}</h1>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">{shoe.description}</p>
                        <h4 className="text-white text-xl">{shoe.price}$</h4>
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">Colors:</p>
                        <div className="flex gap-1">
                            {shoe.colors && shoe.colors.map((color) => (
                                <span key={color} className="lg:w-6 lg:h-6 w-5 h-5 border border-black rounded-full" style={{ backgroundColor: getColor(color) }}></span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-0.5">
                        <p className="text-white/80">Sizes:</p>
                        <div className="flex gap-1 flex-wrap">
                            {sizes.map((size) => (
                               <button 
                                    key={size}
                                    className={`px-5 py-1 rounded-xl transition-colors bg-white text-black hover:bg-black hover:text-white`}
                                >
                                 <p>{size}</p>
                               </button> 
                            ))}
                        </div>
                    </div>
                    <ProductButtons shoeId={shoe._id} name={shoe.name} price={shoe.price} picId={shoe.picId ?? ""} />
                </div>
            </div>
        </section>
    )
}