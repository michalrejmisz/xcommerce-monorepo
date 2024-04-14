"use client";

import { useState } from "react";
import Link from "next/link";

export const Sidebar = () => {
  const menuItems = [
    {
      icon: "Test",
      text: "Kategorie",
      notification: 0,
      link: "/categories",
    },
  ];

  return (
    <div className="bg-muted/95 bg-red border-opacity-1 border-border w-64 border-2 border-b">
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
              className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              {text}
            </Link>
          ))}
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            {/* <Home className="h-4 w-4" /> */}
            Dashboard
          </Link>
          <Link
            href="colors"
            className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            {/* <ShoppingCart className="h-4 w-4" /> */}
            Colors
            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
            6{/* </Badge> */}
          </Link>
          <Link
            href="#"
            className="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            {/* <Package className="h-4 w-4" /> */}
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            {/* <Users className="h-4 w-4" /> */}
            Customers
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            {/* <LineChart className="h-4 w-4" /> */}
            Analytics
          </Link>
        </nav>
      </div>
    </div>
  );
};
