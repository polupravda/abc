import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ComponentType<{ className?: string }>; // Icon is a component type that accepts className
  // You can add more props to customize icon styles if needed, e.g., iconSize, iconColor
}

export const Button: React.FC<ButtonProps> = ({
  text,
  icon: IconComponent, // Renaming prop for clarity
  className, // For custom styling of the button element itself
  ...props
}) => {
  // Square wrapper so rounded-full renders as a circle; margin 4px
  const iconWrapperClasses =
    "flex items-center justify-center size-10 m-1 shrink-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-1 shadow-md/20";
  const iconClasses = "text-base text-white drop-shadow-md/20"; // font-size: medium

  return (
    <button
      className={`py-3 pr-6 pl-3 flex items-center gap-2 shadow-lg/20 text-purple-300 bg-gradient-to-br from-purple-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded-full focus:outline-none transition-colors ${
        className || ""
      }`}
      {...props}
    >
      {IconComponent && (
        <div className={iconWrapperClasses}>
          <IconComponent className={iconClasses} />
        </div>
      )}
      <span className="font-bold text-lg text-white drop-shadow-md/30">
        {text}
      </span>
    </button>
  );
};

// Example: import { SpeakerIcon } from '../icons/SpeakerIcon'; then icon={SpeakerIcon}
