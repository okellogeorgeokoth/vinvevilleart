"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    text: "Use code VINCEVILLE for 25% off",
    highlight: "VINCEVILLE25",
  },
  {
    id: 2,
    text: "Free shipping on orders over $1000",
    highlight: "Free shipping",
  },
  {
    id: 3,
    text: "New collection available - Shop now",
    highlight: "New collection",
  },
  {
    id: 4,
    text: "Email us: vinceville254@gmail.com",
    highlight: "Email Us",
  },
  
];

export function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === announcements.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setCurrentIndex((current) =>
      current === announcements.length - 1 ? 0 : current + 1,
    );
  };

  const previous = () => {
    setCurrentIndex((current) =>
      current === 0 ? announcements.length - 1 : current - 1,
    );
  };

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
        <button
          onClick={previous}
          className="absolute left-4 p-1 hover:text-zinc-400 transition-colors"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center overflow-hidden">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`transition-all duration-500 ${
                index === currentIndex
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 absolute top-0 left-0 right-0 transform -translate-y-full"
              }`}
            >
              <p className="text-sm font-medium">
                {announcement.text
                  .split(announcement.highlight)
                  .map((part, i, arr) =>
                    i === arr.length - 1 ? (
                      part
                    ) : (
                      <span key={part}>
                        {part}
                        <span className="font-bold tracking-wider">
                          {announcement.highlight}
                        </span>
                      </span>
                    ),
                  )}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className="absolute right-4 p-1 hover:text-zinc-400 transition-colors"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
