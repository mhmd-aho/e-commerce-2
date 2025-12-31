import Link from "next/link";
import Image from "next/image";
import arrowLeft from "@/public/assets/icons/arrow.svg";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return(
        <>
            <Link className="absolute top-4 left-4 text-white flex items-center gap-1" href="/"><Image src={arrowLeft} className="size-4 rotate-90" alt="Arrow Left"/>Back to Home</Link>
            {children}
          </>
    ) 
}