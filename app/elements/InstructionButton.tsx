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
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(instructions);
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

  return (
    <ButtonIcon
      onClick={playInstructions}
      icon={LoudspeakerIcon}
      title="Play Instructions"
    />
  );
};
