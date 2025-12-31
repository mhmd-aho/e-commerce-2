import Link from "next/link";
import Button from "@/components/button";
import {Card} from "@/components/card";
import { Suspense } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Shoe } from "@/lib/constants";
import { ShoesSkeleton } from "@/components/ShoesSkeleton";
export const dynamic = 'force-static';
export default function Home() {
  return (
        <section className="bg-black min-h-screen w-full flex flex-col gap-6 ">
      <div style={{ backgroundImage: 'url(/assets/img/background.webp)' }} className="sm:h-[calc(100vh-3rem)] sm:mt-12 h-screen mt-10 flex flex-col justify-center items-center text-white sm:gap-6 gap-2 bg-fit bg-center bg-no-repeat">
        <h1 className="text-center">Experience Nike Like <br /> Never Before</h1>
        <div className="flex gap-2">
          <Link href="/product/air-jordan-1-mid"><Button>Buy Now</Button></Link>
          <Link href="/shop"><Button>Explore</Button></Link>
        </div>
    </div>
     <div className="h-fit flex flex-col justify-center gap-3 sm:justify-around items-baseline pb-5 sm:px-3 px-2 ">
      <h2 className="text-white">Feauters</h2>
       <div className="grid grid-cols-2 sm:grid-cols-4 lg:gap-6 gap-4 lg:w-3/4 w-full self-center" >
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
  </section>
  );
}
async function BestShoes(){
  const shoes = await fetchQuery(api.shoes.getShoes)
  if(shoes.length === 0){
    return(
            <p className="text-neutral-400">No shoes found</p>
    )
  }
  return(
    <>
      <Card shoe={shoes[0] as Shoe} />
      <Card shoe={shoes[1] as Shoe} />
      <Card shoe={shoes[2] as Shoe} />
      <Card shoe={shoes[3] as Shoe} />
    </>
  )
}