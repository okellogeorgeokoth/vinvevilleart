"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Category } from "@/sanity.types";
import { ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface OrderByProps {
  categories: Category[];
}

export function OrderBy({ categories }: OrderByProps) {
  const slug = useParams().slug;
  const router = useRouter();
  const initialValue = categories.find(
    (category) => category.slug?.current === slug,
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(initialValue);
  const [lowPrice, setLowPrice] = useState<string>("");
  const [highPrice, setHighPrice] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLowPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLowPrice(event.target.value);
  };

  const handleHighPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighPrice(event.target.value);
  };

  const handleFilterByPriceRange = () => {
    if (!lowPrice && !highPrice) {
      // If no price range is entered, remove the price filter
      router.push(`/categories/${selectedCategory?.slug?.current}`);
    } else {
      // Filter by the entered price range
      router.push(
        `/categories/${selectedCategory?.slug?.current}?lowPrice=${lowPrice}&highPrice=${highPrice}`,
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
      {/* Filter by Price Section (on the left) */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <input
          type="number"
          placeholder="Low price"
          value={lowPrice}
          onChange={handleLowPriceChange}
          className="border border-zinc-200 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
        />
        <input
          type="number"
          placeholder="High price"
          value={highPrice}
          onChange={handleHighPriceChange}
          className="border border-zinc-200 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
        />
        <Button
          onClick={handleFilterByPriceRange}
          className="w-full sm:w-auto"
        >
          Filter by Price Range
        </Button>
      </div>

      {/* Category Filter Dropdown (on the right) */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} asChild>
            <div className="text-xs md:text-sm font-normal md:font-semibold text-gray-700">
              {selectedCategory !== undefined && <span>ORDER BY CATEGORY:</span>}
              <div className="flex items-center gap-3">
                <span className="text-gray-600 group-hover:text-white text-xs md:text-sm transition-colors uppercase font-normal md:font-semibold">
                  {selectedCategory?.title || "ORDER BY CATEGORY"}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-zinc-400 group-hover:text-white transition-all duration-200",
                    isOpen && "transform rotate-180",
                  )}
                />
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 max-h-[400px] overflow-auto rounded-lg border border-zinc-200 bg-white p-1 shadow-lg"
          align="start"
        >
          {categories.map((category) => (
            <DropdownMenuItem
              key={category._id}
              className={cn(
                "text-sm cursor-pointer rounded-md transition-colors px-3 py-2",
                "text-zinc-600 hover:text-black hover:bg-zinc-100",
                "focus:text-black focus:bg-zinc-100 focus:outline-none",
                selectedCategory?._id === category._id &&
                  "bg-zinc-100 text-black font-medium",
              )}
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false);
                router.push(`/categories/${category.slug?.current}`);
              }}
            >
              {category.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}