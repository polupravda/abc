"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

const CheckIcon = ({ className }: { className?: string }) => (
  <FontAwesomeIcon icon={faCheck} className={className} />
);

export interface ReadyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Called when user clicks the button or presses Enter in the associated input. */
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Unified "verify my answer" control: button with checkmark + "I am ready", and hint "Or press Enter button".
 * Use wherever the user confirms their problem solution (math answers, slider check, etc.).
 */
export const ReadyButton: React.FC<ReadyButtonProps> = ({
  onClick,
  disabled,
  className,
  ...rest
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        text="I am ready"
        icon={CheckIcon}
        onClick={onClick}
        disabled={disabled}
        className={className}
        aria-label="I am ready to check my answer"
        {...rest}
      />
      <p className="text-center text-sm text-slate-600">
        Or press Enter button
      </p>
    </div>
  );
};
