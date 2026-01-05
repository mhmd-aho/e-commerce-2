"use client"
import {  useState } from "react";
import { createContext } from "react";

export type ContextType = {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  favOpen: boolean;
  setFavOpen: (open: boolean) => void;
  userOpen: boolean;
  setUserOpen: (open: boolean) => void;
};

export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [filterOpen, setFilterOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <Context.Provider value={{ filterOpen, setFilterOpen, cartOpen, setCartOpen, favOpen, setFavOpen, userOpen, setUserOpen }}>
      {children}
    </Context.Provider>
  );
}

