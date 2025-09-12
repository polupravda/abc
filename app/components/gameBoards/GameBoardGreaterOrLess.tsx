"use client";

import React from "react";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import Slider from "@/app/elements/Slider";

const GameBoardGreaterOrLess: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <HeadlineInstruction
        headlineText="Greater or Less?"
        instructionText="Game content coming soon!"
      />
      <div className="flex flex-col items-center justify-center">
        <Slider />
      </div>
    </div>
  );
};

export default GameBoardGreaterOrLess;
