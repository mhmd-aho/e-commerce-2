"use client"
import Image from "next/image";
import { useMemo, useState} from "react";
export function Searchbar() {
   const [shoe, setShoe] = useState<string>("");
    
  return(
    <div className="relative bg-white flex justify-between items-center rounded-3xl h-full w-52 p-2 px-6">
      <Image
        width={20}
        height={20}
        src="/assets/icons/search-black.svg"
        alt="Search Icon"
        className="h-full w-auto"
      />
      <input
        type="text"
        placeholder="Search for shoes..."
        value={shoe}
        onChange={(e) => setShoe(e.target.value)}
        className="w-5/6 active:border-none focus:outline-none text-sm font-inter"/>
        {/* {shoe.length > 0 && (
          <div className="absolute top-12 -left-12 h-80 w-80 bg-white rounded-lg p-1">
            <div className="w-full h-full overflow-y-scroll">
              {searchResult.length === 0 ? (
                <p>No results found</p>
              ) : (     
                searchResult.map((s) => (
                  <div key={s.id} className="flex items-center p-2">
                    <Image
                      width={50}
                      height={50}
                      src={s.src}
                      alt={s.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <p className="ml-2">{s.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )} */}
    </div>
  );
}
