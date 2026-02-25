"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import { LetterCard } from "../../elements/LetterCard";
import { Button } from "../../elements/Button";
import { SpeakerIcon } from "../../icons/SpeakerIcon";

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

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

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
      }
      const audio = new Audio(soundSrc);
      audioRefToUse.current = audio;
      audio.onended = () => {
        if (audioRefToUse.current === audio) audioRefToUse.current = null;
      };
      audio.onerror = (event) => {
        console.error(`Audio element error for ${soundSrc}:`, event);
        if (audioRefToUse.current === audio) audioRefToUse.current = null;
      };
      audio.play().catch((error) => {
        if (error.name === "AbortError") {
          // This is an expected interruption, e.g., user clicked play again quickly.
          // console.log(`Play attempt on ${soundSrc} was aborted (interrupted).`); // Optional: for debugging
        } else {
          // This is an unexpected error.
          console.error(`Error starting sound ${soundSrc}:`, error);
        }
        if (audioRefToUse.current === audio) {
          audioRefToUse.current = null;
        }
      });
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
    const phonicAudio = currentPhonicAudioRef.current;
    generateProblem();
    return () => {
      if (phonicAudio) phonicAudio.pause();
    };
  }, [generateProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

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
        addPoints(1);
        setFeedbackText("Correct!");
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        scheduleSuccessSequence({
          onStartAnimation: () => setStartSuccessAnimation(true),
          onEndAnimation: () => setStartSuccessAnimation(false),
          onComplete: generateProblem,
        });
      } else {
        addPoints(-1);
        setFeedbackText("Try again!");
        setShowFailure(true);
        scheduleFailureDismiss(3000, () => {
          setShowFailure(false);
          setIsGameActive(true);
          setFeedbackText("");
        });
      }
    },
    [
      isGameActive,
      correctLetter,
      generateProblem,
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
    ]
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
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

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
              icon={SpeakerIcon}
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
