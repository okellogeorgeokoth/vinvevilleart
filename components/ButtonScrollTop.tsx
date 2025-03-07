"use client";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";

const ButtonScrollTop = ({}): ReactElement => {
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        " hidden fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg hover:bg-zinc-200 transition-colors",
        isTop && "block",
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ButtonScrollTop;
