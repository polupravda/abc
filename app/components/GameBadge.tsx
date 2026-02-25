"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "./Tag";
import DifficultyIndicator, { type DifficultyLevel } from "../elements/DifficultyIndicator";

export type ActivityVariant = "game" | "learn";

interface GameBadgeProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  /** "learn" = introduction/exploration, no correct answer; "game" = practice with answers (default) */
  variant?: ActivityVariant;
  /** 1 = easiest (1 dot filled), 3 = hardest (3 dots filled). Shown on the right of the card. */
  difficulty?: DifficultyLevel;
  textColor?: string;
  badgeBackgroundColor?: string;
}

const GameBadge: React.FC<GameBadgeProps> = ({
  title,
  href,
  icon,
  variant = "game",
  difficulty,
}) => {
  const isLearn = variant === "learn";
  return (
    <Link
      href={href}
      className="p-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-sky-50"
    >
      <div className="flex gap-3 items-center">
        <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center [&>*]:scale-[0.6] [&>*]:origin-center">
          {icon}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {isLearn && (
            <Tag variant="learn">Learn</Tag>
          )}
          <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:underline">
            {title}
          </h3>
        </div>
        {difficulty != null && !isLearn && (
          <DifficultyIndicator level={difficulty} />
        )}
      </div>
    </Link>
  );
};

export default GameBadge;
