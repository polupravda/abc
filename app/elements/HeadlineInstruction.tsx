import React from "react";
import { InstructionButton } from "./InstructionButton";

interface HeadlineInstructionProps {
  headlineText: string;
  instructionText?: string; // Optional: for the button
  children?: React.ReactNode;
  className?: string; // Allow passing additional classes to the main div
}

export const HeadlineInstruction: React.FC<HeadlineInstructionProps> = ({
  headlineText,
  instructionText,
  children,
  className,
}) => {
  return (
    <div className={`w-full flex gap-3 items-center mb-4 ${className || ""}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-sky-950">
        {headlineText}
      </h1>
      {instructionText && (
        <div>
          {" "}
          {/* Added margin bottom to match original h1 margin if button is present */}
          <InstructionButton instructions={instructionText} />
        </div>
      )}
      {children}
    </div>
  );
};
