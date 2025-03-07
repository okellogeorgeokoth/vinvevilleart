"use client";

import useBasketStore from "@/store";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import Form from "next/form";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Search } from "lucide-react";

const Header = (): ReactElement => {
  const { user } = useUser();

  const [isClient, setIsClient] = useState<boolean>(false);
  //const [isLoading, setIsLoading] = useState<boolean>(true);

  // State
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return (
      <header className="flex flex-wrap justify-between items-center px-4 md:px-10 2xl:px-16 py-6">
        <div className="flex w-full flex-wrap justify-between items-center">
          {/* Logo Skeleton */}
          <Skeleton className="h-8 w-24" />

          {/* Search Bar Skeleton */}
          <div className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
            <Skeleton className="h-10 w-full max-w-[55rem]" />
          </div>

          {/* Right Side Actions Skeleton */}
          <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            {/* Basket Button Skeleton */}
            <Skeleton className="h-10 w-24 sm:w-32" />
            {/* Orders Button Skeleton */}
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </header>
    );
  }
  const createClerkPasskey = async () => {
    try {
      await user?.createPasskey();
    } catch (error) {
      console.log("Error creating passkey:", error);
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 md:px-10 2xl:px-16 py-6">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 "
        >
          Vinceville
        </Link>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <div className="relative">
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="bg-gray-100/30 text-gray-800 pl-9 pr-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-30 border w-full max-w-4xl
              placeholder:text-base placeholder:font-normal placeholder:opacity-60
              "
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-30" />
          </div>
        </Form>
        <div className="flex items-center space-x-2  sm:space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href={"/basket"}
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-1 sm:space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-1.5 sm:px-4 rounded "
          >
            <TrolleyIcon className="w-6 h-6" />
            {/* Span item count once global state is implemented */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span className="text-xs  sm:text-sm">My Cart</span>
          </Link>
          {/* User area */}
          <ClerkLoading>
            <Skeleton className="h-10 w-20" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={"/orders"}
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-1 sm:space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-1.5 sm:px-4 rounded "
              >
                <PackageIcon className="w-6 h-6" />
                <span className="text-xs sm:text-sm">My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant={"outline"}
                  className="py-5 font-bold text-xs sm:text-sm"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}

            {user?.passkeys?.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-1.5  sm:px-4 rounded border-blue-300 border text-xs  sm:text-sm"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
