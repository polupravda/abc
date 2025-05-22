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
    <Link href={href} className="p-6 bg-indigo-100 rounded-md">
      <div className="flex gap-4 items-center transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="flex-grow flex flex-col items-center justify-center rounded-full">
          {icon}
        </div>
        <h3
          className={`text-xl md:text-2xl font-bold text-slate-800 mt-3 group-hover:underline`}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default GameBadge;
