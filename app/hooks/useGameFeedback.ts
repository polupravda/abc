"use client";

import { useCallback, useRef, useEffect } from "react";
import { SUCCESS_SOUND_FILES } from "../lib/sounds";

export function useGameFeedback() {
  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current) {
      clearTimeout(successAppearTimeoutRef.current);
      successAppearTimeoutRef.current = null;
    }
    if (successDurationTimeoutRef.current) {
      clearTimeout(successDurationTimeoutRef.current);
      successDurationTimeoutRef.current = null;
    }
    if (successHideTimeoutRef.current) {
      clearTimeout(successHideTimeoutRef.current);
      successHideTimeoutRef.current = null;
    }
    if (failureTimeoutRef.current) {
      clearTimeout(failureTimeoutRef.current);
      failureTimeoutRef.current = null;
    }
    if (currentFeedbackAudioRef.current) {
      currentFeedbackAudioRef.current.pause();
      currentFeedbackAudioRef.current.onended = null;
      currentFeedbackAudioRef.current = null;
    }
  }, []);

  const playSuccessSound = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentFeedbackAudioRef.current) {
      currentFeedbackAudioRef.current.pause();
      currentFeedbackAudioRef.current.onended = null;
    }
    const src =
      SUCCESS_SOUND_FILES[Math.floor(Math.random() * SUCCESS_SOUND_FILES.length)];
    const audio = new Audio(src);
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

  const scheduleSuccessSequence = useCallback(
    (config: {
      onStartAnimation: () => void;
      onEndAnimation: () => void;
      onComplete: () => void;
    }) => {
      clearAllTimeouts();
      successAppearTimeoutRef.current = setTimeout(config.onStartAnimation, 50);
      successDurationTimeoutRef.current = setTimeout(
        config.onEndAnimation,
        3050
      );
      successHideTimeoutRef.current = setTimeout(() => {
        try {
          config.onComplete();
        } finally {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("abc-game-success-complete"));
          }
        }
      }, 3050 + 300);
    },
    [clearAllTimeouts]
  );

  const scheduleFailureDismiss = useCallback(
    (delayMs: number, onDismiss: () => void) => {
      if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
      failureTimeoutRef.current = setTimeout(() => {
        failureTimeoutRef.current = null;
        onDismiss();
      }, delayMs);
    },
    []
  );

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearAllTimeouts]);

  return {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  };
}
