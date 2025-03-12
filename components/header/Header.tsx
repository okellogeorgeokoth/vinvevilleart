"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useBasketStore from "@/store";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import UserProfileComponent from "./UserProfile";
import Image from "next/image"; // Import the Image component
import { AnnouncementBanner } from "./announcement-banner";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/aboutus" },
  { name: "Artists", href: "/artists" },
  { name: "Exhibitions", href: "/exhbitions" },
  { name: "Contact Us", href: "/contactus" },
];

const menuItems = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/aboutus" },
  { title: "Artists", href: "/artists" },
  { title: "Exhibitions", href: "/exhbitions" },
  { title: "Contact Us", href: "/contactus" },
];

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to manage sheet open/close
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 bg-white">
      <AnnouncementBanner />
      <div className="border-b">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px]"
                onMouseLeave={() => setIsSheetOpen(false)} // Close the sheet when mouse leaves
              >
                <div className="w-full mx-auto bg-white overflow-hidden">
                  {/* Logo in Mobile Menu */}
                  <div className="p-4 flex items-center justify-center border-b">
                    <Link href="/">
                      <Image
                        src={"/logo/logo.jpg?${Date.now()}"} // Path to your logo image
                        alt="Vinceville Logo"
                        width={120} // Adjust width for your logo
                        height={80} // Adjust height for your logo
                        className="object-cover" // Ensures the image is cropped and fits within the specified dimensions
                        priority // Prioritize loading the logo
                      />
                    </Link>
                  </div>
                  {/* Mobile Navigation Links */}
                  <nav>
                    <ul className="text-sm">
                      {menuItems.map((item) => (
                        <li key={item.title} className="border-b last:border-b-0">
                          <Link
                            href={item.href}
                            className="block p-4 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="font-normal text-gray-600">{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
            >
              <Image
                src={"/logo/logo.jpg?${Date.now()}"} // Path to your logo image
                alt="Vinceville Logo"
                width={80} // Adjust width for your logo
                height={50} // Adjust height for your logo
                className="object-cover" // Ensures the image is cropped and fits within the specified dimensions
                priority // Prioritize loading the logo
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex lg:gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-zinc-600 transition-colors hover:border-2 hover:border-opacity-50 hover:border-[#ff3a33] rounded-full px-4 py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center md:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span className="sr-only">Search</span>
              </Button>

              <UserProfileComponent />

              <Link href={"/basket"}>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${showSearch ? "max-h-16 opacity-100 mb-4" : "max-h-0 opacity-0"}
            `}
          >
            <div className="relative">
              <Form action="/search" className="w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  type="search"
                  name="query"
                  placeholder="Search for your product here?"
                  className="w-full pl-10 py-6 text-lg bg-zinc-50 border-zinc-300 focus:border-zinc-400 rounded-xl"
                />
              </Form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}