"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faCar,
  faPlane,
  faFish,
  faMusic,
  faLeaf,
  faSun,
  faAppleWhole,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

type Relation = "lt" | "gt" | "eq";

const MIN_COUNT = 1;
const MAX_COUNT = 9;
const SHAPE_SIZE_PX = 56;
const CELL_GAP_PX = 12;
const BOX_PX = 300;
const INNER_PADDING_PX = 16;
const COLOR_CLASSES = [
  "text-red-500",
  "text-blue-500",
  "text-emerald-500",
  "text-amber-500",
  "text-violet-500",
  "text-rose-500",
  "text-cyan-500",
  "text-sky-500",
  "text-lime-500",
];
const ICONS: IconDefinition[] = [
  faStar,
  faHeart,
  faCar,
  faPlane,
  faFish,
  faMusic,
  faLeaf,
  faSun,
  faAppleWhole,
];

function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const GameBoardFewerMoreSame: React.FC = () => {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [leftIcon, setLeftIcon] = useState<IconDefinition>(faStar);
  const [rightIcon, setRightIcon] = useState<IconDefinition>(faHeart);

  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

  const generateProblem = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsGameActive(true);

    // Ensure a mix of relations over time: choose target relation then numbers accordingly
    const targetRel: Relation = pick(["lt", "gt", "eq"]);
    let l = randomInt(MIN_COUNT, MAX_COUNT);
    let r = randomInt(MIN_COUNT, MAX_COUNT);
    if (targetRel === "eq") {
      l = randomInt(MIN_COUNT, MAX_COUNT);
      r = l;
    } else if (targetRel === "lt") {
      l = randomInt(MIN_COUNT, MAX_COUNT - 1);
      r = randomInt(l + 1, MAX_COUNT);
    } else {
      r = randomInt(MIN_COUNT, MAX_COUNT - 1);
      l = randomInt(r + 1, MAX_COUNT);
    }

    setLeftCount(l);
    setRightCount(r);
    setLeftIcon(pick(ICONS));
    setRightIcon(pick(ICONS));
  }, [clearAllTimeouts]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const correctRelation: Relation = useMemo(() => {
    if (leftCount < rightCount) return "lt";
    if (leftCount > rightCount) return "gt";
    return "eq";
  }, [leftCount, rightCount]);

  const handleChoose = useCallback(
    (choice: Relation) => {
      if (!isGameActive) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);
      setIsGameActive(false);

      if (choice === correctRelation) {
        addPoints(1);
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        scheduleSuccessSequence({
          onStartAnimation: () => setStartSuccessAnimation(true),
          onEndAnimation: () => setStartSuccessAnimation(false),
          onComplete: generateProblem,
        });
      } else {
        addPoints(-1);
        setShowFailure(true);
        scheduleFailureDismiss(2500, () => {
          setShowFailure(false);
          setIsGameActive(true);
        });
      }
    },
    [
      isGameActive,
      correctRelation,
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
      generateProblem,
    ]
  );

  const isFeedbackShowing = showSuccessContainer || showFailure;

  const renderGroup = (count: number, icon: IconDefinition) => {
    // Scatter shapes within a square box on a coarse grid to avoid overlap
    const cellSize = SHAPE_SIZE_PX + CELL_GAP_PX;
    const usable = BOX_PX - 2 * INNER_PADDING_PX;
    const cols = Math.max(1, Math.floor(usable / cellSize));
    const rows = Math.max(1, Math.floor(usable / cellSize));
    const cells: Array<{ left: number; top: number }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = INNER_PADDING_PX + c * cellSize + cellSize / 2;
        const cy = INNER_PADDING_PX + r * cellSize + cellSize / 2;
        cells.push({
          left: Math.round(cx - SHAPE_SIZE_PX / 2),
          top: Math.round(cy - SHAPE_SIZE_PX / 2),
        });
      }
    }
    // Shuffle cells
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j]!, cells[i]!];
    }
    const positions = cells.slice(0, Math.min(count, cells.length));
    return (
      <div
        className="relative rounded-xl bg-white border-2 border-indigo-300 shadow-sm"
        style={{ width: BOX_PX, height: BOX_PX }}
        role="img"
        aria-label={`${count} icons scattered in a square`}
      >
        {positions.map((pos, i) => {
          const colorClass = COLOR_CLASSES[i % COLOR_CLASSES.length];
          return (
            <div
              key={i}
              className="absolute"
              style={{ left: pos.left, top: pos.top, width: SHAPE_SIZE_PX, height: SHAPE_SIZE_PX }}
            >
              <FontAwesomeIcon
                icon={icon}
                className={colorClass}
                style={{ width: SHAPE_SIZE_PX, height: SHAPE_SIZE_PX }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const SignButton: React.FC<{
    label: ">" | "<" | "=";
    rel: Relation;
  }> = ({ label, rel }) => {
    return (
      <button
        type="button"
        onClick={() => handleChoose(rel)}
        disabled={!isGameActive || isFeedbackShowing}
        className={`px-7 py-4 rounded-2xl font-extrabold text-4xl min-w-16 min-h-16 transition-colors
        bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow
        hover:from-indigo-600 hover:to-indigo-800 focus:outline-none
        disabled:opacity-50 disabled:pointer-events-none`}
        aria-label={`Choose ${label}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

      <div className="h-auto max-h-[90vh] mb-10 w-full px-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText="Fewer, more, or same?"
            instructionText="Look at the two groups of icons. Choose the correct sign between them: fewer, more, or same."
            className="text-left"
          />
          <CardLight className="min-w-[90%] w-full max-w-[min(72rem,95vw)] p-6">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
              {/* Left group */}
              <div className="flex-1 min-w-[240px] flex items-center justify-center">
                {renderGroup(leftCount, leftIcon)}
              </div>

              {/* Sign choices */}
              <div className="flex md:flex-col flex-row items-center justify-center gap-3">
                <SignButton label="<" rel="lt" />
                <SignButton label="=" rel="eq" />
                <SignButton label=">" rel="gt" />
              </div>

              {/* Right group */}
              <div className="flex-1 min-w-[240px] flex items-center justify-center">
                {renderGroup(rightCount, rightIcon)}
              </div>
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardFewerMoreSame;
