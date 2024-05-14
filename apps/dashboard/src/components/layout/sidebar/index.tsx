"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      icon: "Test",
      text: "Kategorie",
      notification: 0,
      link: "/product-categories",
    },
    {
      icon: "Test",
      text: "Kolory",
      notification: 0,
      link: "/colors",
    },
    {
      icon: "Test",
      text: "Produkty",
      notification: 0,
      link: "/products",
    },
    {
      icon: "Test",
      text: "Specyfikacja",
      notification: 0,
      link: "/product-specifications",
    },
  ];

  return (
    <div className="bg-background/70 border-opacity-1 border-border w-64 border-2 border-b bg-blend-color-burn">
      <Link
        href="/"
        className="text-primary mb-5 flex h-16 items-center justify-between px-4 py-2"
      >
        xCommerce
      </Link>
      <div className=" flex-1">
        <nav className="lg:px- grid items-start border px-2 text-sm font-medium">
          {menuItems.map(({ icon: Icon, text, notification, link }, index) => (
            <Link
              key={index}
              href={link}
              className={cn(
                "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                { "bg-muted text-primary": pathname === link },
              )}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
