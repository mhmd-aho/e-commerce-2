"use client"
import {  useEffect, useState } from "react";
import { createContext } from "react";
export type FilterType = {
    type: string,
    value: string | {min: number,max: number} 
}
export type ContextType = {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  favOpen: boolean;
  setFavOpen: (open: boolean) => void;
  userOpen: boolean;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  setUserOpen: (open: boolean) => void;
  shoe: string;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setShoe: (shoe: string) => void;
  filters: FilterType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterType[]>>;
  isMobile: boolean;
  setIsMobile: (open: boolean) => void;
};

export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isMobile,setIsMobile] = useState(false);
  const [navOpen,setNavOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [shoe, setShoe] = useState("");
  const [filters,setFilters] = useState<FilterType[]>([])
  return (
    <Context.Provider value={{ filterOpen, setFilterOpen, cartOpen, setCartOpen, favOpen, setFavOpen, userOpen, setUserOpen, shoe, setShoe,filters,setFilters,isMobile,setIsMobile,searchOpen,setSearchOpen,navOpen,setNavOpen }}>
      {children}
    </Context.Provider>
  );
}

