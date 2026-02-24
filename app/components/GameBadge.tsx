"use client";

import React from "react";
import Link from "next/link";

interface GameBadgeProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  textColor?: string;
  badgeBackgroundColor?: string;
}

const GameBadge: React.FC<GameBadgeProps> = ({ title, href, icon }) => {
  return (
    <Link href={href} className="p-4 bg-indigo-100 rounded-md">
      <div className="flex gap-3 items-center transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center [&>*]:scale-[0.6] [&>*]:origin-center">
          {icon}
        </div>
        <h3
          className={`text-lg md:text-xl font-bold text-slate-800 group-hover:underline`}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default GameBadge;
