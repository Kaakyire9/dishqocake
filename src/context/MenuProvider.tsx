"use client";

import React, { createContext, useContext, useState } from "react";

type MenuContextType = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggle: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen((s) => !s);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, toggle }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}

export default MenuProvider;
