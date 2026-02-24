"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FeedbackFailure from "../FeedbackFailure";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import Slider from "@/app/elements/Slider";

const GameBoardGreaterOrLess: React.FC = () => {
  const [problemKey, setProblemKey] = useState(0);
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playSound = useCallback((soundSrc: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentFeedbackAudioRef.current) {
      currentFeedbackAudioRef.current.pause();
      currentFeedbackAudioRef.current.onended = null;
    }
    const audio = new Audio(soundSrc);
    currentFeedbackAudioRef.current = audio;
    audio.onended = () => {
      if (currentFeedbackAudioRef.current === audio)
        currentFeedbackAudioRef.current = null;
    };
    audio.play().catch(() => {
      if (currentFeedbackAudioRef.current === audio)
        currentFeedbackAudioRef.current = null;
    });
  }, []);

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current)
      clearTimeout(successAppearTimeoutRef.current);
    if (successDurationTimeoutRef.current)
      clearTimeout(successDurationTimeoutRef.current);
    if (successHideTimeoutRef.current)
      clearTimeout(successHideTimeoutRef.current);
    if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
  }, []);

  const handleCheckFromSlider = useCallback(
    (correct: boolean) => {
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);

      if (correct) {
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);

        successAppearTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(true);
        }, 50);

        successDurationTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(false);
        }, 3050);

        successHideTimeoutRef.current = setTimeout(() => {
          setShowSuccessContainer(false);
          setStartSuccessAnimation(false);
          setProblemKey((k) => k + 1);
        }, 3050 + 300);
      } else {
        setShowFailure(true);
        failureTimeoutRef.current = setTimeout(() => {
          setShowFailure(false);
        }, 3000);
      }
    },
    [clearAllTimeouts]
  );

  useEffect(() => {
    if (startSuccessAnimation) {
      const randomSuccessSound =
        successSoundFiles[Math.floor(Math.random() * successSoundFiles.length)];
      playSound(randomSuccessSound);
    }
  }, [startSuccessAnimation, successSoundFiles, playSound]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (currentFeedbackAudioRef.current)
        currentFeedbackAudioRef.current.pause();
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearAllTimeouts]);

  const isFeedbackShowing = showSuccessContainer || showFailure;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

      <div
        className={`flex flex-col flex-1 min-h-0 w-full max-w-2xl transition-opacity duration-300 ${
          isFeedbackShowing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-row items-stretch justify-center flex-1 min-h-0 w-full">
          <Slider
            key={problemKey}
            onCheck={handleCheckFromSlider}
            className="flex-1 min-h-0 min-w-0"
            renderRightColumn={(content) => (
              <div className="flex flex-col items-center justify-center h-stretch ml-[10vw]">
                <HeadlineInstruction
                  headlineText="Greater or Less?"
                  instructionText="Greater or Less?"
                />
                <CardLight>{content}</CardLight>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoardGreaterOrLess;
