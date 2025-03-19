"use client";
import { useState, FormEvent } from "react"; // Import FormEvent
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, X } from "lucide-react"; // Import X icon
import Link from "next/link";
import ButtonScrollTop from "./ButtonScrollTop";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setMessage("Network error. Please check your internet connection and try again.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    await handleSubscribe();
  };

  return (
    <footer className="relative">
      {/* Curved top edge similar to hero banner */}
      <div
        className="absolute top-0 left-0 right-0 h-20 bg-white"
        style={{
          clipPath: "ellipse(75% 100% at 50% 0%)",
        }}
      />

      {/* Change background to black and update padding */}
      <div className="relative bg-black text-white pt-20 pb-12">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Newsletter section */}
          <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-3xl font-bold mb-3">Join the Vinceville Art Collections</h3>
            <p className="text-zinc-400 mb-8">
              Get 10% off your first purchase
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant={"secondary"} size={"default"} disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {message && <p className="text-sm mt-3 text-zinc-400">{message}</p>}
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">
                Help
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/contactus"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/exhbitions"
                    className="hover:text-white transition-colors"
                  >
                    Exhibitions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/basket"
                    className="hover:text-white transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aboutus"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">
                About Vinceville
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/aboutus"
                    className="hover:text-white transition-colors"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favorites"
                    className="hover:text-white transition-colors"
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contactus"
                    className="hover:text-white transition-colors"
                  >
                    Work With Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social icons with modern hover effect */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">
                Follow Us
              </h4>
              <div className="flex gap-5">
                <a
                  href="https://www.instagram.com/vinceville254/"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Vinceville254"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">X</span>
                  <X className="w-5 h-5" /> {/* Use X icon here */}
                </a>
              </div>
            </div>
          </div>

          <ButtonScrollTop />
          {/* Copyright with updated color */}
          <div className="text-center text-sm text-zinc-500">
  <p>
    © {new Date().getFullYear()} Vinceville. All rights reserved.
  </p>
  <p>
    Developed by <a href="https://my-portfolio-l9ukipofa-okellogeorgeokoths-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">George Okello </a>
  </p>
</div>
        </div>
      </div>
    </footer>
  );
}