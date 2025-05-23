"use client";

import React, { useState, useRef, useEffect } from "react";
import { CardLight } from "../elements/Card";
import { HeadlineInstruction } from "../elements/HeadlineInstruction";
import { LetterCard } from "../elements/LetterCard";

const GameBoardPhonics: React.FC = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isSpeakingPhonic, setIsSpeakingPhonic] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

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
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <div className="h-auto max-h-[80vh] mb-10">
        <HeadlineInstruction
          headlineText="Click on the letters to hear how they sound"
          className="pt-12 md:pt-0"
          instructionText="Click on the letters to hear how they sound"
        />
        <CardLight>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
            {letters.map((letter) => (
              <LetterCard
                key={letter}
                letter={letter}
                size="S"
                onClick={() => playPhonicSound(letter)}
                disabled={isSpeakingPhonic && selectedLetter !== letter}
                isSelected={selectedLetter === letter && isSpeakingPhonic}
              />
            ))}
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardPhonics;
