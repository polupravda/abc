"use client";

import React from "react";
import FeedbackFailure from "./FeedbackFailure";

interface FailureOverlayProps {
  message?: string;
  className?: string;
  feedbackClassName?: string;
}

const FailureOverlay: React.FC<FailureOverlayProps> = ({
  message = "Try again!",
  className = "",
  feedbackClassName = "w-48 h-48 md:w-64 md:h-64",
}) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl ${className}`}
    >
      <FeedbackFailure className={feedbackClassName} />
      <p className="text-4xl font-bold text-red-400 mt-4">{message}</p>
    </div>
  );
};

export default FailureOverlay;
