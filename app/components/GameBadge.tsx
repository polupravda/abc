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
    <Link
      href={href}
      className="p-6 bg-indigo-100 flex gap-4 items-center rounded-md"
    >
      <div className="flex-grow flex flex-col items-center justify-center rounded-full border-6 border-slate-800">
        {icon}
      </div>
      <h3
        className={`text-xl md:text-2xl font-bold text-slate-800 mt-3 group-hover:underline`}
      >
        {title}
      </h3>
    </Link>
  );
};

export default GameBadge;
