import React from "react";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className || "w-16 h-16"} // Default size, can be overridden
  >
    {/* Earth body */}
    <circle cx="50" cy="50" r="40" fill="#60A5FA" />{" "}
    {/* Brighter Blue for Earth */}
    {/* Simple land masses (green) */}
    <path
      d="M40,25 C20,30 25,60 40,70 Q50,65 60,70 C75,60 80,30 60,25 Q50,30 40,25 Z"
      fill="#34D399"
      opacity="0.7"
    />
    <circle cx="65" cy="35" r="10" fill="#34D399" opacity="0.6" />
    <circle cx="30" cy="60" r="8" fill="#34D399" opacity="0.6" />
    {/* Clouds - simplified for cartoon look */}
    <ellipse cx="35" cy="35" rx="15" ry="10" fill="white" opacity="0.9" />
    <ellipse cx="65" cy="60" rx="18" ry="12" fill="white" opacity="0.9" />
    <ellipse cx="50" cy="70" rx="20" ry="10" fill="white" opacity="0.85" />
    <ellipse cx="70" cy="30" rx="12" ry="8" fill="white" opacity="0.9" />
    {/* Text "Home" */}
    <text
      x="50"
      y="52" // Adjusted for vertical centering
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="18"
      fontWeight="bold"
      fill="#FFFFFF" // White text
      stroke="#374151" // Dark gray stroke for readability
      strokeWidth="1"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      Home
    </text>
  </svg>
);

export default HomeIcon;
