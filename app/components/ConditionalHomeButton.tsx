"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "./HomeIcon";

const ConditionalHomeButton = () => {
  const pathname = usePathname();

  // Don't show on the start page ("/") or any API routes
  if (pathname === "/" || pathname.startsWith("/api")) {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-50 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full shadow-lg transition-all duration-200 ease-in-out group"
      aria-label="Go to Home Page"
    >
      <HomeIcon className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 group-hover:scale-105 transition-transform duration-200 ease-in-out" />
    </Link>
  );
};

export default ConditionalHomeButton;
