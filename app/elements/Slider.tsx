import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "./Button";

interface SliderProps {
  /** When provided, check result is reported here and visual feedback is handled by parent (e.g. FeedbackSuccess/Failure). Voice feedback is not used. */
  onCheck?: (correct: boolean) => void;
  /** When provided, the equation and button are wrapped by this render function (e.g. in CardLight). Slider track stays outside. */
  renderCard?: (content: React.ReactNode) => React.ReactNode;
  /** When provided, the entire right column (e.g. Headline + CardLight) is rendered by this function. Overrides renderCard. */
  renderRightColumn?: (content: React.ReactNode) => React.ReactNode;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ onCheck, renderCard, renderRightColumn, className }) => {
  const min = -10;
  const max = 10;
  const range = max - min;

  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  // Game state
  const [numberToCompare, setNumberToCompare] = useState<number>(0);
  const [symbol, setSymbol] = useState<">" | "<" | "=">(">");
  const [message, setMessage] = useState<string>("");
  const [showNextProblemButton, setShowNextProblemButton] =
    useState<boolean>(false);

  const getRandomInt = (minVal: number, maxVal: number): number => {
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  };

  const getRandomSymbol = (): ">" | "<" | "=" => {
    const symbols: (">" | "<" | "=")[] = [">", "<", "="];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const generateNewProblem = useCallback(() => {
    setNumberToCompare(getRandomInt(min, max));
    setSymbol(getRandomSymbol());
    setValue(0); // Reset slider to 0 for new problem
    setMessage("");
    setShowNextProblemButton(false);
  }, [min, max]); // Add min, max to dependencies

  useEffect(() => {
    generateNewProblem();
  }, [generateNewProblem]);

  const getValueFromPosition = useCallback(
    (clientY: number) => {
      const track = trackRef.current;
      if (!track) return 0;
      const { top, height } = track.getBoundingClientRect();
      let ratio = (clientY - top) / height;
      ratio = Math.max(0, Math.min(1, ratio));
      const raw = max - ratio * range;
      return Math.round(raw);
    },
    [max, range]
  );

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setValue(getValueFromPosition(clientY));
    },
    [getValueFromPosition]
  );

  const stopDrag = useCallback(() => {
    document.removeEventListener(
      "mousemove",
      handlePointerMove as EventListener
    );
    document.removeEventListener(
      "touchmove",
      handlePointerMove as EventListener
    );
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  }, [handlePointerMove]);

  const startDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      document.addEventListener(
        "mousemove",
        handlePointerMove as EventListener
      );
      document.addEventListener(
        "touchmove",
        handlePointerMove as EventListener
      );
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);
      const clientY =
        "touches" in e
          ? (e as React.TouchEvent).touches[0].clientY
          : (e as React.MouseEvent).clientY;
      setValue(getValueFromPosition(clientY));
    },
    [getValueFromPosition, handlePointerMove, stopDrag]
  );

  useEffect(() => stopDrag, [stopDrag]);

  const getSpokenComparison = (sym: ">" | "<" | "="): string => {
    switch (sym) {
      case ">":
        return "is greater than";
      case "<":
        return "is less than";
      case "=":
        return "is equal to";
      default:
        return "";
    }
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    let correct = false;
    switch (symbol) {
      case ">":
        correct = value > numberToCompare;
        break;
      case "<":
        correct = value < numberToCompare;
        break;
      case "=":
        correct = value === numberToCompare;
        break;
    }

    if (onCheck) {
      onCheck(correct);
      return;
    }

    const equationString = `${value} ${getSpokenComparison(
      symbol
    )} ${numberToCompare}`;
    speak(equationString);

    if (correct) {
      setMessage("Correct!");
      speak("Correct!");
      setShowNextProblemButton(true);
    } else {
      let correctRelationSymbol: ">" | "<" | "=";
      if (value > numberToCompare) {
        correctRelationSymbol = ">";
      } else if (value < numberToCompare) {
        correctRelationSymbol = "<";
      } else {
        correctRelationSymbol = "=";
      }

      const detailedFeedback = `Try again! ${value} is not ${getSpokenComparison(
        symbol
      )} ${numberToCompare}, it ${getSpokenComparison(
        correctRelationSymbol
      )} ${numberToCompare}.`;
      setMessage("Try Again!"); // Keep UI message simple
      speak(detailedFeedback);
    }
  };

  const pointerPosPercent = ((max - value) / range) * 100;

  const equationAndButton = (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 font-bold text-sky-950">
        <div className="rounded-md border border-sky-200 bg-white px-4 py-3 text-4xl md:text-5xl shadow-sm min-w-[4rem] text-center">
          {value}
        </div>
        <div className="text-3xl md:text-4xl text-sky-700">{symbol}</div>
        <div className="rounded-md border border-sky-200 bg-white px-4 py-3 text-4xl md:text-5xl shadow-sm min-w-[4rem] text-center">
          {numberToCompare}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {!showNextProblemButton ? (
          onCheck ? (
            <Button
              text="Check Answer"
              onClick={handleCheck}
              disabled={message === "Correct!"}
            />
          ) : (
            <button
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-md text-xl font-semibold shadow-lg transition-colors disabled:bg-gray-400"
              onClick={handleCheck}
              disabled={message === "Correct!"}
            >
              Check Answer
            </button>
          )
        ) : (
          onCheck ? (
            <Button text="Next Problem" onClick={generateNewProblem} />
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-xl font-semibold shadow-lg transition-colors"
              onClick={generateNewProblem}
            >
              Next Problem
            </button>
          )
        )}
        {message && (
          <p
            className={`text-xl font-medium ${
              message === "Correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );

  const trackElement = (
    <div
      className="relative flex items-center shrink-0 select-none h-full min-h-[280px]"
      style={{ width: "4rem" }}
    >
      <div
        ref={trackRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 shadow-lg/30"
        style={{
          width: "16px",
          top: "0",
          height: "100%",
          borderRadius: "8px",
          background:
            "linear-gradient(to bottom, #06b6d4 0%, #06b6d4 50%, #ef4444 50%, #ef4444 100%)",
        }}
      />
      {Array.from({ length: range + 1 }, (_, i) => max - i).map((num) => {
        const pos = ((max - num) / range) * 100;
        return (
          <div
            key={`dot-${num}`}
            className="absolute bg-gray-200 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors"
            style={{
              width: "0.4rem",
              height: "0.4rem",
              left: "50%",
              top: `${pos}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
            onClick={() => setValue(num)}
          />
        );
      })}
      {Array.from({ length: range + 1 }, (_, i) => max - i).map((num) => {
        const pos = ((max - num) / range) * 100;
        return (
          <span
            key={`label-${num}`}
            className={`absolute font-bold text-lg ${
              num >= 0 ? "text-cyan-800" : "text-red-800"
            }`}
            style={{
              top: `${pos}%`,
              left: "4rem",
              transform: "translateY(-50%)",
            }}
          >
            {num}
          </span>
        );
      })}
      <div
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="absolute flex items-center justify-center cursor-grab"
        style={{
          top: `${pointerPosPercent}%`,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "2rem",
          height: "2rem",
          zIndex: 10,
        }}
      >
        <div className="absolute w-full h-full rounded-full bg-purple-700 shadow-lg/30" />
        <div className="absolute w-3/5 h-3/5 rounded-full bg-purple-300 shadow-lg/30" />
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderTop: "0.5rem solid transparent",
            borderBottom: "0.5rem solid transparent",
            borderLeft: "0.75rem solid #7e22ce",
            right: "-0.75rem",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className={`flex flex-row items-stretch justify-center gap-12 w-full h-full min-h-0 select-none p-4 overflow-visible ${className ?? ""}`}>
      <div
        className="flex flex-col items-center justify-center p-4 shrink-0 min-h-0 my-6 self-center"
        style={{ height: "calc(100% - 20px)", maxHeight: "calc(100% - 20px)" }}
      >
        {trackElement}
      </div>
      <div className="shrink-0 flex flex-col gap-4">
        {renderRightColumn
          ? renderRightColumn(equationAndButton)
          : renderCard
            ? renderCard(equationAndButton)
            : equationAndButton}
      </div>
    </div>
  );
};

export default Slider;
