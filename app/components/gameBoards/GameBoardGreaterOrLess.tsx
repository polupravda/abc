"use client";

import React, { useState, useEffect, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import Slider from "@/app/elements/Slider";

const GameBoardGreaterOrLess: React.FC = () => {
  const [problemKey, setProblemKey] = useState(0);
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

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
        addPoints(1);
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        scheduleSuccessSequence({
          onStartAnimation: () => setStartSuccessAnimation(true),
          onEndAnimation: () => setStartSuccessAnimation(false),
          onComplete: () => {
            setShowSuccessContainer(false);
            setStartSuccessAnimation(false);
            setProblemKey((k) => k + 1);
          },
        });
      } else {
        setShowFailure(true);
        scheduleFailureDismiss(3000, () => setShowFailure(false));
      }
    },
    [
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
    ]
  );

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const isFeedbackShowing = showSuccessContainer || showFailure;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

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
