"use client";

import React, { useState, useCallback, useEffect } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { ReadyButton } from "@/app/elements/ReadyButton";
import { NumberInput } from "@/app/elements/NumberInput";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const MAX_SECTIONS = 10;
const MIN_KIDS = 2;
const MAX_KIDS = 10;

const KID_COLORS = [
  "#dc2626",
  "#2563eb",
  "#16a34a",
  "#ca8a04",
  "#9333ea",
  "#ea580c",
  "#0d9488",
  "#db2777",
  "#4f46e5",
  "#65a30d",
];

function generateProblem(): { numKids: number; sections: number } {
  const numKids = MIN_KIDS + Math.floor(Math.random() * (MAX_KIDS - MIN_KIDS + 1));
  const allMultiples: number[] = [];
  for (let s = numKids; s <= MAX_SECTIONS; s += numKids) allMultiples.push(s);
  // Prefer scenarios where each kid gets more than 1 piece (sections >= 2 * numKids)
  const preferred = allMultiples.filter((s) => s >= 2 * numKids);
  const candidates = preferred.length > 0 ? preferred : allMultiples;
  const sections = candidates[Math.floor(Math.random() * candidates.length)] ?? numKids;
  return { numKids, sections };
}

const GameBoardDivideChocolateBar: React.FC = () => {
  const [numKids, setNumKids] = useState(2);
  const [sections, setSections] = useState(2);
  const [nums, setNums] = useState<number[]>([0, 0]);
  const [drafts, setDrafts] = useState<string[]>(["0", "0"]);
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailureMonster, setShowFailureMonster] = useState(false);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

  const initProblem = useCallback(() => {
    const { numKids: k, sections: s } = generateProblem();
    setNumKids(k);
    setSections(s);
    setNums(Array(k).fill(0));
    setDrafts(Array(k).fill("0"));
  }, []);

  useEffect(() => {
    initProblem();
  }, [initProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const piecesPerKid = sections / numKids;

  const handleNumChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      if (raw === "") {
        setDrafts((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }
      const parsed = parseInt(raw, 10);
      const value = clamp(isNaN(parsed) ? nums[index] : parsed, 0, sections);
      setNums((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      setDrafts((prev) => {
        const next = [...prev];
        next[index] = String(value);
        return next;
      });
    },
    [nums, sections]
  );

  const handleNumBlur = useCallback(
    (index: number) => () => {
      const raw = drafts[index];
      if (raw === "") {
        setDrafts((prev) => {
          const next = [...prev];
          next[index] = String(nums[index]);
          return next;
        });
        return;
      }
      const parsed = parseInt(raw, 10);
      const value = clamp(isNaN(parsed) ? nums[index] : parsed, 0, sections);
      setNums((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      setDrafts((prev) => {
        const next = [...prev];
        next[index] = String(value);
        return next;
      });
    },
    [drafts, nums, sections]
  );

  const handleCheckAnswer = () => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailureMonster(false);

    const total = nums.reduce((a, b) => a + b, 0);
    if (total !== sections) {
      setShowFailureMonster(true);
      addPoints(-1);
      scheduleFailureDismiss(2500, () => setShowFailureMonster(false));
      return;
    }
    const correct = nums.every((n) => n === piecesPerKid);
    if (correct) {
      addPoints(1);
      setShowSuccessContainer(true);
      setStartSuccessAnimation(false);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: initProblem,
      });
    } else {
      setShowFailureMonster(true);
      addPoints(-1);
      scheduleFailureDismiss(2500, () => setShowFailureMonster(false));
    }
  };

  const segmentToKidIndex = (segmentIndex: number): number => {
    let cum = 0;
    for (let i = 0; i < numKids; i++) {
      cum += nums[i] ?? 0;
      if (segmentIndex < cum) return i;
    }
    return -1;
  };

  const isFeedbackShowing =
    (showSuccessContainer && startSuccessAnimation) || showFailureMonster;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailureMonster && <FailureOverlay />}

      <div
        className={`h-auto max-h-[80vh] mb-10 w-full max-w-7xl px-10 mx-auto transition-opacity duration-300 ${isFeedbackShowing ? "opacity-0" : "opacity-100"}`}
      >
        <HeadlineInstruction
          headlineText="Share the chocolate bar among kids. Each kid should get the same number of pieces."
          instructionText="Share the chocolate bar among kids. Each kid should get the same number of pieces."
          className="mb-6"
        />
        <CardLight className="flex flex-col items-center gap-8">
          {/* Chocolate bar: fraction on left + brown rectangle with sections and KidMarks */}
          <div className="w-full flex flex-row items-stretch gap-3">
            <div
              className="flex flex-col items-center justify-center leading-none font-bold shrink-0 py-2"
              style={{ color: "#4a3728" }}
              aria-hidden
            >
              <span className="text-xl tabular-nums">{sections}</span>
              <span className="w-6 border-t-2 my-0.5" style={{ borderColor: "#4a3728" }} />
              <span className="text-xl tabular-nums">{sections}</span>
            </div>
            <div
              className="flex flex-row flex-1 min-w-0 rounded-lg overflow-visible border-4"
              style={{ minHeight: "4.5rem", backgroundColor: "#6b5344", borderColor: "#4a3728" }}
              role="img"
              aria-label={`Chocolate bar with ${sections} pieces`}
            >
              {Array.from({ length: sections }).map((_, i) => {
                const kidIdx = segmentToKidIndex(i);
                return (
                  <div
                    key={i}
                    className="flex-1 min-w-0 border-r-4 last:border-r-0 flex items-center justify-center relative"
                    style={{ borderColor: "#4a3728" }}
                  >
                    {kidIdx >= 0 && (
                      <span
                        className="absolute w-6 h-6 rounded-full shrink-0"
                        style={{ backgroundColor: KID_COLORS[kidIdx] }}
                        aria-hidden
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kids: KidMark + fraction; kid SVG at bottom of each container (top half visible) */}
          <div className="w-full flex flex-wrap justify-center gap-4">
            {Array.from({ length: numKids }, (_, idx) => (
              <div
                key={`kid-${idx}`}
                className="flex flex-col items-center gap-2 p-0 rounded-xl bg-amber-50/80 border border-amber-200 overflow-hidden"
              >
                <div
                  className="flex flex-col items-center gap-0 mt-3 mx-3"
                  role="group"
                  aria-label={`Fraction for kid ${idx + 1}`}
                >
                  <NumberInput
                    size="S"
                    min={0}
                    max={sections}
                    value={drafts[idx] ?? ""}
                    onChange={handleNumChange(idx)}
                    onBlur={handleNumBlur(idx)}
                    aria-label={`Pieces for kid ${idx + 1}`}
                  />
                  <span className="w-8 border-t-2 border-sky-700 my-1 shrink-0" aria-hidden />
                  <span className="text-2xl tabular-nums text-sky-900 font-bold leading-none">
                    {sections}
                  </span>
                </div>
                {/* Kid SVG at bottom; KidMark absolutely over it, top-right */}
                <div className="relative w-full mt-auto">
                  <div
                    className="w-full overflow-hidden rounded-b-lg"
                    style={{ height: "5rem" }}
                    aria-hidden
                  >
                    <div className="w-full" style={{ height: "200%" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/kid-${idx + 1}.svg`}
                        alt={`Kid ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <span
                    className="absolute top-1 right-1 w-6 h-6 rounded-full shrink-0 z-10"
                    style={{ backgroundColor: KID_COLORS[idx] }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>

          <ReadyButton onClick={handleCheckAnswer} disabled={isFeedbackShowing} />
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardDivideChocolateBar;
