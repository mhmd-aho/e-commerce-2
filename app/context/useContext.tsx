"use client"
import { useContext } from "react";
import { Context } from "./context";
export function useContexts() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useContexts must be used within a ContextProvider");
  }

  return context;
}