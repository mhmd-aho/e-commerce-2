"use client"
import { useTransition } from "react";
import Button from "./button";
import { addToCartAction } from "@/app/actions";

interface ProductButtonsProps {
    name: string;
    price: number;
    picId: string;
    shoeId: string;
}

export function ProductButtons({ name, price, picId,shoeId }: ProductButtonsProps) {
    const [isPending, startTransition] = useTransition()
    const handleAddToCart = async () => {
        startTransition(async () => {
            await addToCartAction({
            name,
            price,
            picId,
            shoeId
        })
    })
    }
    return(
        <div className="flex justify-start items-center lg:gap-4 gap-2">
                        <Button onClick={handleAddToCart} disabled={isPending}>{isPending ? "Loading..." : "Buy Now"}</Button>
                        <Button>Add to favorite</Button>
        </div>
    )
}