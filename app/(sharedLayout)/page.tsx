import Link from "next/link";
import {Card} from "@/components/card";
import { Suspense } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ShoesSkeleton } from "@/components/ShoesSkeleton";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { ContextProvider } from "../context/context";
export const metadata: Metadata = {
    title: 'Home | Nike e-commerce',
    description: 'welcome to nike e-commerce clone',
}
export default function Home() {
  return (
    <ContextProvider>
      <section className="h-screen w-full overflow-y-scroll">
        <div className="min-h-screen flex flex-col gap-6  bg-black ">
          <div style={{ backgroundImage: 'url(/assets/img/background.webp)' }} className="sm:h-[calc(100vh-3rem)] sm:mt-12 h-screen mt-10 flex flex-col justify-center items-center text-white sm:gap-6 gap-2 bg-fit bg-center bg-no-repeat">
            <h1 className="text-center">Experience Nike Like <br /> Never Before</h1>
            <div className="flex gap-2">
              <Link href="/product/j979def4pnvcx135prt6zw85ys7y4tta" className='font-inter font-medium shadow-lg bg-accent text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300 active:scale-90' >Buy Now</Link>
              <Link href="/shop" className='font-inter font-medium shadow-lg bg-accent text-white py-2 px-5 rounded-lg hover:scale-105 transition-all duration-300 active:scale-90'>Explore</Link>
            </div>
        </div>
          <div className="h-fit flex flex-col justify-center gap-3 sm:justify-around items-baseline pb-5 sm:px-3 px-2 ">
          <h2 className="text-white">Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:gap-4 gap-2 lg:w-5/6   w-full self-center" >
                <Suspense fallback={
                  <>
                  {
                    Array.from({length:4}).map((_, index) => (
                      <ShoesSkeleton key={index}/>
                    ))
                  }
                  </>
                }>
                    <BestShoes/>
                </Suspense>
        </div>
        </div>

        </div>
    </section>

    </ContextProvider>
  );
}
async function BestShoes(){
  'use cache'
  cacheLife('days')
  const shoes = await fetchQuery(api.shoes.getShoes)
  if(shoes.length === 0){
    return(
            <p className="text-neutral-400">No shoes found</p>
    )
  }
  const BestShoes = shoes.slice(0,4)
  return(
    <>
    {
      BestShoes.map((shoe) => (
        <Card key={shoe._id} shoe={shoe}/>
      ))
    }
    </>
  )
}