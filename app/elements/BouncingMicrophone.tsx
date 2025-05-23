"use client";

import React from "react";
import Image from "next/image";

interface BouncingMicrophoneProps {
  isVisible: boolean;
}

const BouncingMicrophone: React.FC<BouncingMicrophoneProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full p-8 shadow-xl animate-bounce-custom relative">
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
          <Image
            src="/images/microphone.svg"
            alt="Microphone"
            width={80}
            height={80}
            className="relative z-10 pulse-mic text-red-500"
            style={{ filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" }}
          />
        </div>
        <div className="mt-8 bg-white px-8 py-4 rounded-full shadow-lg">
          <p className="text-xl font-bold text-blue-600">
            I&apos;m listening...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BouncingMicrophone;
