"use client"; // Ensure this is at the top for client-side functionality

import { useState } from "react";
import { Heart, Search, ShoppingCart, UserCircle2, Menu, X } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-sm font-bold">BOOK VAULT</h1>
      </Link>

      {/* Desktop and Mobile Menu (Visible for both) */}
    

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2 items-center font-semibold">
        {menuList.map((item) => (
          <Link key={item.name} href={item.link}>
            <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Action Buttons (Desktop) */}
      <div className="flex items-center gap-1">
        <Link href="/search">
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <Search size={14} />
          </button>
        </Link>
      
       
        
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href="/account">
          <button
            title="My Account"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <UserCircle2 size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
          <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      </div>
      
      {/* Mobile Menu Overlay (for mobile sidebar) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-start py-4 px-6 space-y-2 z-40 md:hidden">
          {menuList.map((item) => (
            <Link key={item.name} href={item.link}>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm px-4 py-2 w-full text-left hover:bg-gray-50 rounded-lg"
              >
                {item.name}
              </button>
            </Link>
          ))}
          
          {/* Admin Button in Sidebar */}
          <AuthContextProvider>
            <AdminButton />
          </AuthContextProvider>

          {/* Mobile Action Buttons (Search, Favorites, Cart, My Account, Logout) */}
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/search">
              <button
                title="Search Products"
                className="flex items-center gap-2 w-full text-sm hover:bg-gray-50 py-2 px-4 rounded-lg"
              >
                <Search size={14} />
                Search
              </button>
            </Link>
            <Link href="/favorites">
              <button
                title="Favorites"
                className="flex items-center gap-2 w-full text-sm hover:bg-gray-50 py-2 px-4 rounded-lg"
              >
                <Heart size={14} />
                Favorites
              </button>
            </Link>
            <Link href="/cart">
              <button
                title="Shopping Cart"
                className="flex items-center gap-2 w-full text-sm hover:bg-gray-50 py-2 px-4 rounded-lg"
              >
                <ShoppingCart size={14} />
                Cart
              </button>
            </Link>
            <Link href="/account">
              <button
                title="My Account"
                className="flex items-center gap-2 w-full text-sm hover:bg-gray-50 py-2 px-4 rounded-lg"
              >
                <UserCircle2 size={14} />
                My Account
              </button>
            </Link>
            <AuthContextProvider>
              <LogoutButton />
            </AuthContextProvider>
          </div>
        </div>
      )}
    </nav>
  );
}
