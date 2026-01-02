import Link from "next/link";
import Image from "next/image";
import {Searchbar} from "./searchbar";
import logo from '@/public/assets/icons/favicon.svg';
import { Profile } from "./user";
import { AddShoe } from "./addShoes";
import {Favorites} from "./favorites";
import { Cart } from "./cart";
export function Header() {

    return (
        <div className="fixed top-0 left-0 w-full bg-black flex items-center justify-between p-2 sm:h-12 h-10 z-50">
            <Link href="/" className="w-1/5 h-full py-1">
                <Image  src={logo} className="h-full w-auto" alt="Nike Logo" />
            </Link>
            <nav aria-label="main navigation" className="flex space-x-6">
                <Link href="/" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">Home</Link>
                <Link href="/shop" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">Shop</Link>
                <Link href="/about" className="px-4 py-1 rounded-full font-inter text-white transition-all duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black">About</Link>
                <AddShoe/>
            </nav>

            <div className="flex items-center sm:gap-4 gap-2 h-full">
                <Searchbar/>
                <div className="flex items-center gap-2 h-full py-1">
                    <Favorites/>
                    <Cart/>
                    <Profile/>
                </div>
            </div>
        </div>
    )
}
