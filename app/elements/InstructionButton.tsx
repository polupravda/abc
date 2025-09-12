"use client";

import { useRef } from "react";
import LoudspeakerIcon from "../icons/LoudspeakerIcon";
import { ButtonIcon } from "./ButtonIcon";

export const InstructionButton = ({
  instructions,
}: {
  instructions: string;
}) => {
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playInstructions = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;

    // Stop anything currently speaking and ensure not paused
    try {
      synth.cancel();
      if ((synth as any).paused) synth.resume();
    } catch (_) {}

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

    const pickVoice = (voices: SpeechSynthesisVoice[]) => {
      const lower = (s: string | undefined) => (s || "").toLowerCase();
      const nameHas = (v: SpeechSynthesisVoice, needle: string) =>
        lower(v.name).includes(needle);

      // Preferred high-quality English voices across browsers/OS
      const preferredByName = [
        // Chrome (if present)
        "google us english",
        "google uk english female",
        // macOS voices commonly available in Firefox/Safari
        "samantha",
        "victoria",
        "karen",
        "moira",
        "serena",
        // Windows voices
        "aria",
        "jenny",
        "zira",
      ];

      for (const pref of preferredByName) {
        const found = voices.find((v) => nameHas(v, pref));
        if (found) return found;
      }

      // Otherwise prefer en-US female if available
      let v = voices.find(
        (vv) => vv.lang === "en-US" && lower(vv.name).includes("female")
      );
      if (!v) v = voices.find((vv) => vv.lang === "en-US");
      if (!v) v = voices.find((vv) => vv.lang && vv.lang.startsWith("en"));
      return v || null;
    };

    const speakNow = (voice: SpeechSynthesisVoice | null) => {
      if (voice) utterance.voice = voice;
      try {
        synth.speak(utterance);
      } catch (_) {
        // As a fallback, try once more on next tick
        setTimeout(() => synth.speak(utterance), 0);
      }
    };

    // Chrome often returns [] until voices load; wait if needed
    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      speakNow(pickVoice(voices));
    } else {
      const onVoices = () => {
        const loaded = synth.getVoices();
        synth.removeEventListener("voiceschanged", onVoices);
        speakNow(pickVoice(loaded));
      };
      synth.addEventListener("voiceschanged", onVoices);
      // Fallback in case event never fires; speak with default voice soon
      setTimeout(() => {
        try {
          synth.removeEventListener("voiceschanged", onVoices);
        } catch (_) {}
        if (!synth.speaking) speakNow(null);
      }, 500);
    }
  };

  return (
    <ButtonIcon
      onClick={playInstructions}
      icon={LoudspeakerIcon}
      title="Play Instructions"
    />
  );
};
