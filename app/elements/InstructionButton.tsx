"use client";

import { useRef } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { SpeakerIcon } from "../icons/SpeakerIcon";
import { getInstructionVoice } from "../lib/speech";

export const InstructionButton = ({
  instructions,
}: {
  instructions: string;
}) => {
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playInstructions = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;

    try {
      synth.cancel();
      if ("paused" in synth && (synth as SpeechSynthesis & { paused?: boolean }).paused) {
        synth.resume();
      }
    } catch {
      // ignore
    }

    const utterance = new SpeechSynthesisUtterance(instructions);
    instructionUtteranceRef.current = utterance;
    utterance.pitch = 1;
    utterance.rate = 0.8;
    utterance.lang = "en-US";
    utterance.onend = () => {
      instructionUtteranceRef.current = null;
    };
    utterance.onerror = () => {
      instructionUtteranceRef.current = null;
    };

    const speakNow = (voice: SpeechSynthesisVoice | null) => {
      if (voice) utterance.voice = voice;
      try {
        synth.speak(utterance);
      } catch {
        setTimeout(() => synth.speak(utterance), 0);
      }
    };

    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      speakNow(getInstructionVoice(voices));
    } else {
      const onVoices = () => {
        const loaded = synth.getVoices();
        synth.removeEventListener("voiceschanged", onVoices);
        speakNow(getInstructionVoice(loaded));
      };
      synth.addEventListener("voiceschanged", onVoices);
      setTimeout(() => {
        try {
          synth.removeEventListener("voiceschanged", onVoices);
        } catch {
          // ignore
        }
        if (!synth.speaking) speakNow(null);
      }, 500);
    }
  };

  return (
    <ButtonIcon
      onClick={playInstructions}
      icon={SpeakerIcon}
      title="Play Instructions"
    />
  );
};
