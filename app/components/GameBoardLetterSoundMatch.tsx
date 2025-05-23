"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "./FeedbackSuccessAnimation";
import FeedbackFailure from "./FeedbackFailure";
import { HeadlineInstruction } from "../elements/HeadlineInstruction";
import { CardLight } from "../elements/Card";
import { LetterCard } from "../elements/LetterCard";
import { Button } from "../elements/Button";
import LoudspeakerIcon from "../icons/LoudspeakerIcon";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const GameBoardLetterSoundMatch: React.FC = () => {
  const [letter1, setLetter1] = useState<string | null>(null);
  const [letter2, setLetter2] = useState<string | null>(null);
  const [correctLetter, setCorrectLetter] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);

  const currentPhonicAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playSound = useCallback(
    (
      soundSrc: string,
      audioRefToUse: React.MutableRefObject<HTMLAudioElement | null>
    ) => {
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      if (audioRefToUse.current) {
        audioRefToUse.current.pause();
        audioRefToUse.current.onended = null;
        audioRefToUse.current.onerror = null;
        audioRefToUse.current = null;
      }
      const audio = new Audio(soundSrc);
      audioRefToUse.current = audio;
      audio.play().catch((error) => {
        console.error(`Error playing sound ${soundSrc}:`, error);
        if (audioRefToUse.current === audio) audioRefToUse.current = null;
      });
      audio.onended = () => {
        if (audioRefToUse.current === audio) audioRefToUse.current = null;
      };
      audio.onerror = (event) => {
        console.error(`Audio element error for ${soundSrc}:`, event);
        if (audioRefToUse.current === audio) audioRefToUse.current = null;
      };
    },
    []
  );

  const playCorrectLetterSound = useCallback(() => {
    if (correctLetter) {
      playSound(
        `/sounds/phonics/${correctLetter.toLowerCase()}.m4a`,
        currentPhonicAudioRef
      );
    }
  }, [correctLetter, playSound]);

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current)
      clearTimeout(successAppearTimeoutRef.current);
    if (successDurationTimeoutRef.current)
      clearTimeout(successDurationTimeoutRef.current);
    if (successHideTimeoutRef.current)
      clearTimeout(successHideTimeoutRef.current);
    if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
  }, []);

  const generateProblem = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsGameActive(true);
    setFeedbackText("");

    const l1Index = Math.floor(Math.random() * ALPHABET.length);
    let l2Index = Math.floor(Math.random() * ALPHABET.length);
    while (l2Index === l1Index) {
      l2Index = Math.floor(Math.random() * ALPHABET.length);
    }

    const newLetter1 = ALPHABET[l1Index];
    const newLetter2 = ALPHABET[l2Index];
    const newCorrectLetter = Math.random() < 0.5 ? newLetter1 : newLetter2;

    setLetter1(newLetter1);
    setLetter2(newLetter2);
    setCorrectLetter(newCorrectLetter);

    setTimeout(() => {
      if (newCorrectLetter) {
        playSound(
          `/sounds/phonics/${newCorrectLetter.toLowerCase()}.m4a`,
          currentPhonicAudioRef
        );
      }
    }, 100);
  }, [playSound, clearAllTimeouts]);

  useEffect(() => {
    generateProblem();
    return () => {
      clearAllTimeouts();
      if (currentPhonicAudioRef.current) currentPhonicAudioRef.current.pause();
      if (currentFeedbackAudioRef.current)
        currentFeedbackAudioRef.current.pause();
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [generateProblem, clearAllTimeouts]);

  useEffect(() => {
    if (startSuccessAnimation) {
      const randomSuccessSound =
        successSoundFiles[Math.floor(Math.random() * successSoundFiles.length)];
      playSound(randomSuccessSound, currentFeedbackAudioRef);
    }
  }, [startSuccessAnimation, successSoundFiles, playSound]);

  const handleAnswer = useCallback(
    (chosenLetter: string) => {
      if (!isGameActive || !correctLetter) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);
      setIsGameActive(false);

      if (chosenLetter.toUpperCase() === correctLetter.toUpperCase()) {
        setFeedbackText("Correct!");
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);

        successAppearTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(true);
        }, 50);

        successDurationTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(false);
        }, 3050);

        successHideTimeoutRef.current = setTimeout(() => {
          generateProblem();
        }, 3050 + 300);
      } else {
        setFeedbackText("Try again!");
        setShowFailure(true);
        failureTimeoutRef.current = setTimeout(() => {
          setShowFailure(false);
          setIsGameActive(true);
          setFeedbackText("");
        }, 3000);
      }
    },
    [isGameActive, correctLetter, generateProblem, clearAllTimeouts]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGameActive || showSuccessContainer || showFailure) return;
      const keyPressed = event.key.toUpperCase();
      if (letter1 && keyPressed === letter1.toUpperCase()) {
        handleAnswer(letter1);
      } else if (letter2 && keyPressed === letter2.toUpperCase()) {
        handleAnswer(letter2);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    letter1,
    letter2,
    isGameActive,
    showSuccessContainer,
    showFailure,
    handleAnswer,
  ]);

  if (!letter1 || !letter2 || !correctLetter) {
    return <div>Loading game...</div>;
  }

  const displayLetters = [letter1, letter2].sort();
  const isFeedbackShowing =
    (showSuccessContainer && startSuccessAnimation) || showFailure;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

      <div className="h-auto max-h-[80vh] mb-10">
        <HeadlineInstruction
          headlineText="Which letter makes this sound?"
          instructionText="Which letter makes this sound?"
          className={`transition-opacity duration-300 ${
            isFeedbackShowing ? "opacity-0" : "opacity-100"
          }`}
        />
        <CardLight>
          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              onClick={playCorrectLetterSound}
              disabled={isFeedbackShowing}
              aria-label="Play sound again"
              text="Play Sound Again"
              icon={LoudspeakerIcon}
            >
              Play Sound Again
            </Button>
            <div className="flex flex-row items-center justify-center">
              <div className="flex justify-around w-full max-w-md gap-4">
                {displayLetters.map((letterChoice) => (
                  <LetterCard
                    key={letterChoice}
                    letter={letterChoice}
                    size="L"
                    onClick={() => handleAnswer(letterChoice)}
                    disabled={!isGameActive || isFeedbackShowing}
                  />
                ))}
              </div>
            </div>
          </div>
          {feedbackText && !showSuccessContainer && !showFailure && (
            <p className="mt-6 text-2xl font-semibold text-yellow-400">
              {feedbackText}
            </p>
          )}
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardLetterSoundMatch;
