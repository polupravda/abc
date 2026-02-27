"use client";

import React, { useState } from "react";
import Link from "next/link";
import GameMenu from "@/app/components/GameMenu";
import RocketAnimation from "@/app/components/RocketAnimation";
import "@/app/components/RocketAnimation.css"; // Import CSS globally for the page
import "@/app/globals.css";
import FeedbackSuccessAnimation from "@/app/components/FeedbackSuccessAnimation";
import { useScore } from "@/app/contexts/ScoreContext";
export default function Home() {
  const [showCongrats, setShowCongrats] = useState(false);
  const { score } = useScore();
  return (
    <main className="rocket-animation-sky-background flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Jumbo Mode button - top left */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/games/jumbo-mode"
          className="px-5 py-3 rounded-2xl text-xl font-bold text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 transition-colors"
        >
          Jumbo Mode
        </Link>
      </div>
      {/* Test Congratulations button */}
      <div className="absolute top-4 left-52 z-20">
        <button
          onClick={() => setShowCongrats(true)}
          className="px-5 py-3 rounded-2xl text-xl font-bold text-white shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 transition-colors"
        >
          Show Congratulations
        </button>
      </div>
      {showCongrats && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/90">
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
            <div className="absolute inset-0 pointer-events-none">
              <FeedbackSuccessAnimation show={true} />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold text-emerald-600 mb-6">
              Congratulations!
            </div>
            <div className="text-3xl md:text-4xl font-bold text-sky-900 mb-10">
              Score: {score}
            </div>
            <button
              onClick={() => setShowCongrats(false)}
              className="px-8 py-4 rounded-2xl text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
