"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ToggleProps {
  title: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  title,
  iconSrc,
  iconAlt,
  children,
  defaultOpen = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-5 py-5 px-6 rounded-xl bg-indigo-100 hover:bg-indigo-200 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-expanded={isOpen}
      >
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={80}
          height={80}
          className="shrink-0"
        />
        <span className="text-3xl font-bold text-slate-800">{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-auto w-5 h-5 text-slate-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div className="mt-2 pl-2 flex flex-col gap-2 border-l-2 border-indigo-200 ml-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default Toggle;
