import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>; // Icon is a component type that accepts className
  // You can add more props to customize icon styles if needed, e.g., iconSize, iconColor
}

export const ButtonIcon: React.FC<ButtonProps> = ({
  icon: IconComponent, // Renaming prop for clarity
  className, // For custom styling of the button element itself
  ...props
}) => {
  // Define the classes for the icon and its wrapper as seen in your InstructionButton
  const iconWrapperClasses =
    "flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-1 shadow-md/20";
  const iconClasses = "w-8 h-8 fill-white drop-shadow-md/20"; // Default classes for the icon

  return (
    <button
      className={`py-3 px-3 flex items-center gap-2 shadow-lg/20 text-purple-300 bg-gradient-to-br from-purple-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 rounded-full focus:outline-none transition-colors ${
        className || ""
      }`}
      {...props}
    >
      {IconComponent && (
        <div className={iconWrapperClasses}>
          <IconComponent className={iconClasses} />
        </div>
      )}
    </button>
  );
};

// Example of how to use this Button component:
// import LoudspeakerIcon from '../icons/LoudspeakerIcon';
//
// const MyPageComponent = () => {
//   return (
//     <Button
//       text="My Action"
//       icon={LoudspeakerIcon}
//       onClick={() => console.log('Button clicked!')}
//     />
//   );
// };
