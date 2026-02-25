"use client";

import React from "react";

export interface GameCardIconBackground {
  image: string;
  position: string;
  size: number;
}

interface GameCardIconProps {
  background: GameCardIconBackground;
  children: React.ReactNode;
  className?: string;
}

const GameCardIcon: React.FC<GameCardIconProps> = ({
  background,
  children,
  className = "",
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${background.image}')`,
          backgroundPosition: background.position,
          backgroundSize: `${background.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      />
      <div className="relative z-10 h-20 w-20 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GameCardIcon;
