"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export type FeedbackType = "correct" | "incorrect" | null;

interface FeedbackAnimationProps {
  type: FeedbackType;
  message: string;
  onComplete?: () => void;
}

const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({
  type,
  message,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(true);

      // Hide the animation after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [type, onComplete]);

  if (!isVisible) return null;

  // Determine which image to show based on the feedback type
  const imageSrc =
    type === "correct" ? "/images/happy-bear.svg" : "/images/upset-tiger.svg";

  const bgColor = type === "correct" ? "bg-green-50" : "bg-red-50";

  const textColor = type === "correct" ? "text-green-600" : "text-red-600";

  const borderColor =
    type === "correct" ? "border-green-200" : "border-red-200";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm bg-black/10">
      <div
        className={`flex flex-col items-center p-8 rounded-2xl shadow-2xl ${bgColor} border-4 ${borderColor} animate-fade-in-down max-w-md`}
      >
        <div className="relative w-64 h-64 mb-6">
          <Image
            src={imageSrc}
            alt={type === "correct" ? "Happy polar bear" : "Upset tiger"}
            fill
            className="object-contain animate-bounce-gentle"
          />
        </div>

        <h2 className={`text-2xl font-bold ${textColor} mb-2`}>
          {type === "correct" ? "Great job!" : "Try again!"}
        </h2>

        <p className={`text-xl ${textColor} text-center`}>{message}</p>
      </div>
    </div>
  );
};

export default FeedbackAnimation;
