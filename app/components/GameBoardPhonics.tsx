"use client";

import React, { useState, useRef, useEffect } from "react";

// Loudspeaker Icon SVG Component
const LoudspeakerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.903A9.7 9.7 0 0 0 1.5 12c0 .898.121 1.768.35 2.597.343 1.24 1.518 1.903 2.66 1.903h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.555-2.25-4.685a.75.75 0 0 0-.916 1.192A2.99 2.99 0 0 1 16.084 12a2.99 2.99 0 0 1-1.666 2.493.75.75 0 0 0 .916 1.192C17.714 15.555 18.584 13.857 18.584 12Z" />
    <path d="M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z" />
  </svg>
);

const GameBoardPhonics: React.FC = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isSpeakingPhonic, setIsSpeakingPhonic] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playInstructions = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Click on the letters to hear how they sound"
      );
      instructionUtteranceRef.current = utterance;
      const voices = window.speechSynthesis.getVoices();
      let preferredVoice = voices.find(
        (v) => v.lang === "en-US" && v.name.toLowerCase().includes("female")
      );
      if (!preferredVoice)
        preferredVoice = voices.find((v) => v.lang === "en-US");
      if (!preferredVoice)
        preferredVoice = voices.find((v) => v.lang.startsWith("en"));
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.onend = () => {
        instructionUtteranceRef.current = null;
      };
      utterance.onerror = () => {
        instructionUtteranceRef.current = null;
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const playPhonicSound = (letter: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop instructions if they are speaking
    }
    if (isSpeakingPhonic) return;

    setSelectedLetter(letter);
    setIsSpeakingPhonic(true);

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    const soundFile = `/sounds/phonics/${letter.toLowerCase()}.m4a`;
    const audio = new Audio(soundFile);
    currentAudioRef.current = audio;

    audio.play().catch((error) => {
      console.error(`Error playing sound ${soundFile}:`, error);
      setIsSpeakingPhonic(false);
      setSelectedLetter(null);
    });

    audio.onended = () => {
      setIsSpeakingPhonic(false);
      setSelectedLetter(null);
      currentAudioRef.current = null;
    };
    audio.onerror = (event) => {
      console.error(`Error with audio element for ${soundFile}:`, event);
      setIsSpeakingPhonic(false);
      setSelectedLetter(null);
      currentAudioRef.current = null;
    };
  };

  return (
    <div className="p-6 md:p-10 bg-neutral-800 rounded-xl shadow-2xl text-center max-w-4xl mx-auto border-2 border-sky-500 relative">
      <div className="absolute top-4 left-4">
        <button
          onClick={playInstructions}
          title="Play Instructions"
          className="p-2 text-sky-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-sky-500 transition-colors"
        >
          <LoudspeakerIcon className="w-5 h-5" />
        </button>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-sky-400 mb-8 pt-12 md:pt-0">
        Learn Your Letters!
      </h1>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => playPhonicSound(letter)}
            disabled={isSpeakingPhonic && selectedLetter !== letter}
            className={`
              p-3 md:p-4 aspect-square flex flex-row items-center justify-center
              text-2xl md:text-3xl font-bold rounded-lg
              transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-4
              ${
                selectedLetter === letter && isSpeakingPhonic
                  ? "bg-pink-600 text-white ring-pink-400 animate-pulse"
                  : "bg-teal-600 hover:bg-teal-500 text-neutral-100 focus:ring-teal-400"
              }
              ${
                isSpeakingPhonic && selectedLetter !== letter
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {letter}
            <span className="ml-1">{letter.toLowerCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoardPhonics;
