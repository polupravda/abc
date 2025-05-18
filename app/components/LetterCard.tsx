"use client";

import React from "react";

interface LetterCardProps {
  letter: string;
  example: string;
  isActive: boolean;
  onClick: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({
  letter,
  example,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`
        p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300
        flex flex-col items-center justify-center
        ${
          isActive
            ? "bg-blue-500 text-white scale-105 shadow-lg"
            : "bg-white hover:bg-blue-100"
        }
      `}
      onClick={onClick}
    >
      <div className="text-7xl font-bold mb-4">{letter.toUpperCase()}</div>
      <div className="text-3xl font-semibold mb-2">{letter.toLowerCase()}</div>
      <div className="text-xl">{example}</div>
    </div>
  );
};

export default LetterCard;
