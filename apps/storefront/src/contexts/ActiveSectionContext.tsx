"use client";

import React, { createContext, useContext, useState } from "react";

const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}>({ activeSection: "", setActiveSection: () => {} });

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = useState("");

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => useContext(ActiveSectionContext);
