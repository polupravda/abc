"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import BouncingMicrophone from "../../elements/BouncingMicrophone";
import { threeLetterWords } from "../../const/words";
import MicrophoneIcon from "@/app/icons/MicrophoneIcon";
import { ButtonSpeak } from "@/app/elements/ButtonSpeak";
// We might need a MicrophoneIcon for the button itself later. For now, text.

// Type declarations for Web Speech API

// Define the instance interface first
interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
  // Add other methods/properties as needed from the Web Speech API spec
}

// Define the constructor interface
interface SpeechRecognitionStatic {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic; // Use the same static type
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

const GameBoardBlending: React.FC = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [lettersOfCurrentWord, setLettersOfCurrentWord] = useState<string[]>(
    []
  );
  const [isListening, setIsListening] = useState(false);
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);

  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const successSoundAudioRef = useRef<HTMLAudioElement | null>(null);
  const letterSoundAudioRef = useRef<HTMLAudioElement | null>(null); // Ref for letter sounds
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current)
      clearTimeout(successAppearTimeoutRef.current);
    if (successDurationTimeoutRef.current)
      clearTimeout(successDurationTimeoutRef.current);
    if (successHideTimeoutRef.current)
      clearTimeout(successHideTimeoutRef.current);
  }, []);

  const playSuccessSound = useCallback(() => {
    // Ensure other sounds are stopped
    if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause();
    if (successSoundAudioRef.current) successSoundAudioRef.current.pause();

    const randomIndex = Math.floor(Math.random() * successSoundFiles.length);
    const soundToPlay = successSoundFiles[randomIndex];
    const audio = new Audio(soundToPlay);
    successSoundAudioRef.current = audio;
    audio
      .play()
      .catch((err) => console.error("Error playing success sound:", err));
    audio.onended = () => {
      if (successSoundAudioRef.current === audio)
        successSoundAudioRef.current = null;
    };
    audio.onerror = () => {
      if (successSoundAudioRef.current === audio)
        successSoundAudioRef.current = null;
    };
  }, [successSoundFiles]);

  const playLetterSound = useCallback((letter: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (successSoundAudioRef.current) successSoundAudioRef.current.pause(); // Stop success sound if playing

    const soundSrc = `/sounds/phonics/${letter.toLowerCase()}.m4a`;
    const audioRefToUse = letterSoundAudioRef;

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
        // console.log(`Play attempt on ${soundSrc} was aborted.`);
      } else {
        console.error(`Error starting sound ${soundSrc}:`, error);
      }
      if (audioRefToUse.current === audio) {
        audioRefToUse.current = null;
      }
    });
  }, []);

  const generateNewWord = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setIsListening(false);

    const randomIndex = Math.floor(Math.random() * threeLetterWords.length);
    const newWord = threeLetterWords[randomIndex];
    setCurrentWord(newWord);
    setLettersOfCurrentWord(newWord.split(""));
  }, [clearAllTimeouts]);

  const speakWord = useCallback(
    (wordToSpeak: string) => {
      if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Stop letter sound
      if (successSoundAudioRef.current) successSoundAudioRef.current.pause(); // Stop success sound

      if (typeof window !== "undefined" && window.speechSynthesis) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(wordToSpeak);
        instructionUtteranceRef.current = utterance;
        const voices = window.speechSynthesis.getVoices();
        let preferredVoice = voices.find(
          (v) => v.lang === "en-US" && v.name.toLowerCase().includes("female")
        );
        if (!preferredVoice)
          preferredVoice = voices.find((v) => v.lang === "en-US");
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
          instructionUtteranceRef.current = null;
          setTimeout(() => generateNewWord(), 100);
        };
        utterance.onerror = (event: Event) => {
          console.error("SpeechSynthesis Error:", event);
          instructionUtteranceRef.current = null;
          setTimeout(() => generateNewWord(), 100);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => generateNewWord(), 100);
      }
    },
    [generateNewWord]
  );

  const handleSpeechRecognition = useCallback(() => {
    if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Stop letter sound before listening

    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      console.warn("Speech Recognition API is not supported in this browser.");
      speakWord(currentWord);
      return;
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }

    const recognition: SpeechRecognitionInstance = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.trim().toUpperCase();
      setIsListening(false);
      if (recognitionRef.current === recognition) recognitionRef.current = null;

      if (transcript.includes(currentWord)) {
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        playSuccessSound(); // This already stops letter sounds

        successAppearTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(true);
        }, 50);
        successDurationTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(false);
        }, 3050);
        successHideTimeoutRef.current = setTimeout(() => {
          generateNewWord();
        }, 3050 + 300);
      } else {
        speakWord(currentWord); // This already stops letter sounds
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      if (recognitionRef.current === recognition) recognitionRef.current = null;
      console.error("Speech Recognition Error:", event.error, event.message);
      if (
        event.error === "no-speech" ||
        event.error === "audio-capture" ||
        event.error === "not-allowed"
      ) {
        speakWord(currentWord);
      } else {
        speakWord(currentWord);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        setIsListening(false);
      }
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    recognition.start();
  }, [currentWord, playSuccessSound, generateNewWord, speakWord, isListening]);

  const triggerListen = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.speechSynthesis &&
      window.speechSynthesis.speaking
    ) {
      window.speechSynthesis.cancel();
    }
    if (letterSoundAudioRef.current) letterSoundAudioRef.current.pause(); // Ensure letter sound stops
    handleSpeechRecognition();
  }, [handleSpeechRecognition]);

  useEffect(() => {
    generateNewWord();

    const currentRec = recognitionRef.current;
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    const utterance = instructionUtteranceRef.current;
    const successAudio = successSoundAudioRef.current;
    const letterAudio = letterSoundAudioRef.current; // Capture for cleanup

    return () => {
      clearAllTimeouts();
      if (currentRec) {
        currentRec.abort();
      }
      if (
        synth &&
        synth.speaking &&
        utterance === instructionUtteranceRef.current
      ) {
        synth.cancel();
      }
      if (successAudio) {
        successAudio.pause();
      }
      if (letterAudio) {
        letterAudio.pause();
      }
    };
  }, [generateNewWord, clearAllTimeouts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (!isListening && !showSuccessContainer) {
          triggerListen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerListen, isListening, showSuccessContainer]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <BouncingMicrophone
        isVisible={isListening}
        stopListening={() => {
          if (recognitionRef.current) recognitionRef.current.stop();
          setIsListening(false);
        }}
      />
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}

      <div className="h-auto max-h-[80vh] mb-10 flex flex-col items-center">
        <HeadlineInstruction
          headlineText="Blend the sounds to make a word!"
          instructionText="Click letters to hear their sounds. Blend them to make a word. Click the button or press Space to speak."
          className={`transition-opacity duration-300 ${
            isListening || (showSuccessContainer && startSuccessAnimation)
              ? "opacity-0"
              : "opacity-100"
          }`}
        />
        <CardLight className={`transition-opacity duration-300`}>
          <div className="flex justify-center items-center space-x-2 md:space-x-4 my-8 px-4">
            {lettersOfCurrentWord.map((letter, index) => (
              <button
                className="text-[12rem] leading-none font-bold text-fuchsia-950 focus:outline-none rounded-lg p-2 transition-transform hover:scale-105 active:scale-95"
                key={`${currentWord}-${index}`}
                onClick={() => playLetterSound(letter)}
                aria-label={`Play sound for letter ${letter}`}
              >
                {index === 0 ? letter : letter.toLowerCase()}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <ButtonSpeak
              onClick={triggerListen}
              disabled={isListening || showSuccessContainer}
              text="Speak Word"
              aria-label="Speak the word"
              className="px-8 py-4 text-xl font-semibold"
              icon={MicrophoneIcon}
            />
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardBlending;
