"use client";

import React from "react";

interface FeedbackSuccessProps {
  // Renamed interface
  className?: string;
}

const FeedbackSuccess: React.FC<FeedbackSuccessProps> = ({ className }) => {
  // Renamed component
  return (
    <svg
      viewBox="0 0 150 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 h-40 md:w-40 md:h-52 ${className || ""}`}
    >
      {/* Helmet Outer Glass */}
      <ellipse
        cx="75"
        cy="60"
        rx="55"
        ry="50"
        fill="rgba(200, 220, 255, 0.3)"
        stroke="#AFC8FF"
        strokeWidth="3"
      />
      {/* Head */}
      <ellipse cx="75" cy="70" rx="30" ry="32" fill="#FFDFC4" />{" "}
      {/* Skin tone */}
      {/* Hair */}
      <path
        d="M 50 55 Q 75 30, 100 55 Q 95 65, 75 60 Q 55 65, 50 55 Z"
        fill="#FF8C00"
      />{" "}
      {/* Orange hair */}
      {/* Eyes */}
      <circle cx="65" cy="70" r="7" fill="white" />
      <circle cx="65" cy="70" r="3" fill="black" />
      <circle cx="85" cy="70" r="7" fill="white" />
      <circle cx="85" cy="70" r="3" fill="black" />
      {/* Mouth */}
      <path
        d="M 68 85 Q 75 90, 82 85"
        stroke="black"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body */}
      <rect
        x="55"
        y="100"
        width="40"
        height="50"
        rx="10"
        fill="#F0F0F0"
        stroke="#A0A0A0"
        strokeWidth="1.5"
      />
      {/* Blue trim on body */}
      <rect x="53" y="105" width="44" height="10" fill="#5A83F5" />
      <rect x="53" y="135" width="44" height="10" fill="#5A83F5" />
      {/* Control Panel */}
      <rect x="65" y="118" width="20" height="10" fill="#D0D0D0" rx="2" />
      <circle cx="70" cy="123" r="2" fill="#FF3047" /> {/* Red */}
      <circle cx="75" cy="123" r="2" fill="#FFD700" />{" "}
      {/* Yellow (using gold as placeholder) */}
      <circle cx="80" cy="123" r="2" fill="#007A00" /> {/* Green */}
      {/* Arms */}
      <line
        x1="55"
        y1="110"
        x2="35"
        y2="125"
        stroke="#A0A0A0"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="110"
        x2="115"
        y2="125"
        stroke="#A0A0A0"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle
        cx="32"
        cy="128"
        r="6"
        fill="#F0F0F0"
        stroke="#A0A0A0"
        strokeWidth="1.5"
      />{" "}
      {/* Hands */}
      <circle
        cx="118"
        cy="128"
        r="6"
        fill="#F0F0F0"
        stroke="#A0A0A0"
        strokeWidth="1.5"
      />
      {/* Legs */}
      <line
        x1="65"
        y1="150"
        x2="60"
        y2="175"
        stroke="#A0A0A0"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1="150"
        x2="90"
        y2="175"
        stroke="#A0A0A0"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="52" y="172" width="16" height="8" rx="2" fill="#5A83F5" />{" "}
      {/* Boots */}
      <rect x="82" y="172" width="16" height="8" rx="2" fill="#5A83F5" />
      {/* Helmet Inner Glass Sheen */}
      <path
        d="M 40 50 Q 50 40, 60 45 Q 50 55, 40 50 Z"
        fill="rgba(255, 255, 255, 0.5)"
      />
    </svg>
  );
};

export default FeedbackSuccess; // Renamed default export
