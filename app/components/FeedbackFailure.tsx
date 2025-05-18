"use client";

import React from "react";

interface FeedbackFailureProps {
  className?: string;
}

const FeedbackFailure: React.FC<FeedbackFailureProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 150 150" // Adjusted viewBox for a more square/round monster
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 h-32 md:w-40 md:h-40 ${className || ""}`}
    >
      {/* Body - textured green might be complex, using solid green with a slight gradient or pattern if simple */}
      <defs>
        <radialGradient
          id="monsterBodyGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" style={{ stopColor: "#A8E063", stopOpacity: 1 }} />{" "}
          {/* Lighter green */}
          <stop
            offset="100%"
            style={{ stopColor: "#56AB2F", stopOpacity: 1 }}
          />{" "}
          {/* Darker green */}
        </radialGradient>
        {/* Simple speckle pattern */}
        <pattern
          id="speckles"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.8" fill="rgba(0,0,0,0.1)" />
          <circle cx="7" cy="7" r="0.6" fill="rgba(0,0,0,0.05)" />
        </pattern>
      </defs>
      <circle cx="75" cy="75" r="60" fill="url(#monsterBodyGradient)" />
      <circle cx="75" cy="75" r="60" fill="url(#speckles)" opacity="0.7" />
      {/* Eye - Large and central */}
      <circle
        cx="75"
        cy="70"
        r="30"
        fill="white"
        stroke="#444"
        strokeWidth="2"
      />
      <circle cx="75" cy="70" r="18" fill="#FFA500" /> {/* Orange iris */}
      <circle cx="75" cy="70" r="8" fill="black" /> {/* Pupil */}
      <circle cx="82" cy="62" r="4" fill="rgba(255,255,255,0.7)" />{" "}
      {/* Eye highlight */}
      {/* Limbs/Tentacles - simple curved paths */}
      {/* Top-left limb */}
      <path
        d="M 40 40 Q 20 20, 30 60 C 35 70, 45 65, 40 40 Z"
        fill="#76C893"
        stroke="#56AB2F"
        strokeWidth="2"
      />
      {/* Top-right limb */}
      <path
        d="M 110 40 Q 130 20, 120 60 C 115 70, 105 65, 110 40 Z"
        fill="#76C893"
        stroke="#56AB2F"
        strokeWidth="2"
      />
      {/* Bottom-left limb */}
      <path
        d="M 45 115 Q 25 135, 50 125 C 60 120, 55 110, 45 115 Z"
        fill="#76C893"
        stroke="#56AB2F"
        strokeWidth="2"
      />
      {/* Bottom-right limb */}
      <path
        d="M 105 115 Q 125 135, 100 125 C 90 120, 95 110, 105 115 Z"
        fill="#76C893"
        stroke="#56AB2F"
        strokeWidth="2"
      />
      {/* Optional: Sad mouth or expression */}
      <path
        d="M 60 95 Q 75 85, 90 95"
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FeedbackFailure;
