import React, { useRef, useState, useEffect, useCallback } from "react";

const Slider: React.FC = () => {
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

  return (
    <div className="flex flex-col items-center select-none p-4 space-y-4">
      <div className="flex items-start">
        {/* Slider track and pointer */}
        <div
          className="relative flex items-center mr-[6rem] mt-4"
          style={{ height: "70vh", width: "4rem" }} // Adjusted height slightly
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 shadow-lg/30"
            style={{
              width: "16px",
              top: "-2.5%",
              height: "105%",
              borderRadius: "8px",
              background:
                "linear-gradient(to bottom, #06b6d4 0%, #06b6d4 50%, #ef4444 50%, #ef4444 100%)",
            }}
          />

          {/* Step dots */}
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

          {/* Step labels */}
          {Array.from({ length: range + 1 }, (_, i) => max - i).map((num) => {
            const pos = ((max - num) / range) * 100;
            return (
              <span
                key={num}
                className={`absolute font-bold text-lg ${
                  // Slightly smaller labels
                  num >= 0 ? "text-cyan-800" : "text-red-800"
                }`}
                style={{
                  top: `${pos}%`,
                  left: "4rem", // Adjusted label position
                  transform: "translateY(-50%)",
                }}
              >
                {num}
              </span>
            );
          })}

          {/* Draggable Pointer */}
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
        {/* Equation display */}
        <div className="flex items-center space-y-2 ml-8 text-6xl md:text-8xl font-bold">
          <div className="text-fuchsia-700 h-[8rem] w-[12rem] flex items-center justify-center border-4 border-fuchsia-300 rounded-xl p-2">
            {value}
          </div>
          <div className="text-gray-600 h-[8rem] w-[12rem] flex items-center justify-center">
            {symbol}
          </div>
          <div className="text-blue-600 h-[8rem] w-[12rem] flex items-center justify-center border-4 border-blue-300 rounded-xl p-2">
            {numberToCompare}
          </div>
        </div>
      </div>

      {/* Controls and Message */}
      <div className="mt-6 flex flex-col items-center space-y-3">
        {!showNextProblemButton ? (
          <button
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-md text-xl font-semibold shadow-lg transition-colors disabled:bg-gray-400"
            onClick={handleCheck}
            disabled={message === "Correct!"} // Disable if already correct before next problem
          >
            Check Answer
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-xl font-semibold shadow-lg transition-colors"
            onClick={generateNewProblem}
          >
            Next Problem
          </button>
        )}
        {message && (
          <p
            className={`text-2xl font-medium ${
              message === "Correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Slider;
