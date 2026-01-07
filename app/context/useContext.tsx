"use client"
import { useContext, useEffect } from "react";
import { Context } from "./context";
export function useContexts() {
  const context = useContext(Context);
  useEffect(()=>{
    const checkIsMobile = () =>{
      context?.setIsMobile(window.innerWidth < 1024)
      context?.setFilterOpen(window.innerWidth < 1024?false:true)
    }
    checkIsMobile()
    window.addEventListener('resize',checkIsMobile)
    return () => {
      window.removeEventListener('resize',checkIsMobile)
    }
  },[])
  if (context === undefined) {
    throw new Error("useContexts must be used within a ContextProvider");
  }

  return context;
}