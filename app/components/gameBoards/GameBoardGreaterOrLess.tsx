"use client";

import React from "react";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import Slider from "@/app/elements/Slider";
import VerticalSlider from "@/app/elements/VerticalSlider";

const GameBoardGreaterOrLess: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <HeadlineInstruction
        headlineText="Greater or Less?"
        instructionText="Game content coming soon!"
      />
      <div className="flex flex-col items-center justify-center">
        <Slider />
        {/* <VerticalSlider value={0} onChange={() => console.log("changed")} /> */}
      </div>
    </div>
  );
};

export default GameBoardGreaterOrLess;
