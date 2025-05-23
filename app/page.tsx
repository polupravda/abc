"use client";

import React from "react";
import GameMenu from "@/app/components/GameMenu";
import RocketAnimation from "@/app/components/RocketAnimation";
import "@/app/components/RocketAnimation.css"; // Import CSS globally for the page
import "@/app/globals.css";
export default function Home() {
  return (
    <main className="rocket-animation-sky-background flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute bottom-4 left-4" style={{ zIndex: 0 }}>
        <RocketAnimation />
      </div>
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ zIndex: 10 }} // Wrapper for GameMenu to ensure it's on top
      >
        <GameMenu />
      </div>
    </main>
  );
}
