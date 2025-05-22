"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const ConditionalHomeButton: React.FC = () => {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/api")) {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-50 rounded-full"
      aria-label="Go to homepage"
      title="Home"
    >
      <Image
        src="/images/shootingStar.svg"
        alt="Home"
        width={80}
        height={80}
        className="drop-shadow-lg/20 h-16 w-16 sm:h-20 sm:w-20 transition-all duration-300 ease-in-out transform hover:scale-110"
        priority
      />
    </Link>
  );
};

export default ConditionalHomeButton;
