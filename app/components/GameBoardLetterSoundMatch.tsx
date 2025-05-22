"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccess from "./FeedbackSuccess";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);

  const currentPhonicAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playInstructions = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Which letter makes the sound? Click on the letter or find it on the keyboard!"
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

  const playSound = useCallback(
    (soundSrc: string, isPhonicSound: boolean = false) => {
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const audioRef = isPhonicSound
        ? currentPhonicAudioRef
        : currentFeedbackAudioRef;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current = null;
      }
      const audio = new Audio(soundSrc);
      audioRef.current = audio;
      audio
        .play()
        .then(() => {})
        .catch((error) => {
          if (error.name === "AbortError") {
            // console.log(`Playback aborted: ${soundSrc}`);
          } else {
            console.error(`Error playing sound ${soundSrc}:`, error);
            if (isPhonicSound)
              setFeedbackText("Error playing sound. Please try refreshing.");
          }
          if (audioRef.current === audio) audioRef.current = null;
        });
      audio.onended = () => {
        if (audioRef.current === audio) audioRef.current = null;
      };
      audio.onerror = (event) => {
        console.error(`Audio element error for ${soundSrc}:`, event);
        if (audioRef.current === audio) audioRef.current = null;
      };
    },
    []
  );

  const playCorrectLetterSound = useCallback(() => {
    if (correctLetter) {
      playSound(`/sounds/phonics/${correctLetter.toLowerCase()}.m4a`, true);
    }
  }, [correctLetter, playSound]);

  const generateProblem = useCallback(() => {
    setShowSuccess(false);
    setShowFailure(false);
    setIsGameActive(true);
    setFeedbackText("");
    clearAllTimeouts();

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
          true
        );
      }
    }, 100);
  }, [playSound]);

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
  }, [generateProblem]);

  const handleAnswer = useCallback(
    (chosenLetter: string) => {
      if (!isGameActive || !correctLetter) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsGameActive(false);
      if (chosenLetter.toUpperCase() === correctLetter.toUpperCase()) {
        setFeedbackText("Correct!");
        setShowSuccess(true);
        const randomSuccessSound =
          successSoundFiles[
            Math.floor(Math.random() * successSoundFiles.length)
          ];
        playSound(randomSuccessSound);
        successTimeoutRef.current = setTimeout(() => {
          generateProblem();
        }, 3500);
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
    [isGameActive, correctLetter, successSoundFiles, playSound, generateProblem]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGameActive || showSuccess || showFailure) return;
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
  }, [letter1, letter2, isGameActive, showSuccess, showFailure, handleAnswer]);

  const clearAllTimeouts = () => {
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
  };

  if (!letter1 || !letter2 || !correctLetter) {
    return <div>Loading game...</div>;
  }

  const displayLetters = [letter1, letter2].sort();

  return (
    <CardLight>
      {showSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackSuccess className="animate-bounce-gentle w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-green-400 mt-4">Correct!</p>
        </div>
      )}
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

      <HeadlineInstruction
        headlineText="Which letter makes this sound?"
        instructionText="Which letter makes this sound?"
        className={`transition-opacity duration-300 ${
          showSuccess || showFailure ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="flex flex-col items-center justify-center gap-6">
        <Button
          onClick={playCorrectLetterSound}
          disabled={showSuccess || showFailure}
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
                disabled={!isGameActive || showSuccess || showFailure}
              />
            ))}
          </div>
        </div>
      </div>
      {feedbackText && !showSuccess && !showFailure && (
        <p className="mt-6 text-2xl font-semibold text-yellow-400">
          {feedbackText}
        </p>
      )}
    </CardLight>
  );
};

export default GameBoardLetterSoundMatch;
