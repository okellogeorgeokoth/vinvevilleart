"use client";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { User } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const UserProfileComponent = ({}) => {
  const user = useUser();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Skeleton className="size-9 opacity-10" />;
  }
  return (
    <div className="flex items-center justify-center size-9 ">
      <Suspense fallback={<Skeleton className="size-9 opacity-10" />}>
        <ClerkLoaded>
          {user.isSignedIn ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon" className="flex">
                <User className="size-4" />
                <span className="sr-only">Account</span>
              </Button>
            </SignInButton>
          )}
        </ClerkLoaded>
      </Suspense>
    </div>
  );
};

export default UserProfileComponent;
