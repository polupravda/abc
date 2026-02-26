"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { NumberInput } from "@/app/elements/NumberInput";
import { ReadyButton } from "@/app/elements/ReadyButton";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faCar,
  faFish,
  faMusic,
  faLeaf,
  faSun,
  faPlane,
  faAppleWhole,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const ICONS: IconDefinition[] = [
  faStar,
  faHeart,
  faCar,
  faFish,
  faMusic,
  faLeaf,
  faSun,
  faPlane,
  faAppleWhole,
];
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

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const BOARD_PX = 520;
const ICON_SIZE = 36;

type ShapeType = "circle" | "square" | "diamond";
const SHAPE_SIZE = 34;

function GeometricShape({
  shape,
  colorClass,
  size,
}: {
  shape: ShapeType;
  colorClass: string;
  size: number;
}) {
  const common = `inline-block ${colorClass}`;
  const style: React.CSSProperties = { width: size, height: size };
  if (shape === "circle") {
    return (
      <div
        className={common}
        style={{ ...style, borderRadius: "50%", backgroundColor: "currentColor" }}
      />
    );
  }
  if (shape === "diamond") {
    return (
      <div
        className={common}
        style={{
          ...style,
          transform: "rotate(45deg) scale(0.85)",
          backgroundColor: "currentColor",
        }}
      />
    );
  }
  return <div className={common} style={{ ...style, backgroundColor: "currentColor" }} />;
}

const GameBoardCountByClusters: React.FC = () => {
  const [clusters, setClusters] = useState(0);
  const [perCluster, setPerCluster] = useState(0);
  const [icon, setIcon] = useState<IconDefinition>(faStar);
  const [mode, setMode] = useState<"organic" | "grid">("organic");
  const [shape, setShape] = useState<ShapeType>("circle");
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");

  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

  const total = useMemo(() => clusters * perCluster, [clusters, perCluster]);

  const regenerate = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsBusy(false);
    // Randomize fairly small counts to keep layout readable
    const c = 3 + Math.floor(Math.random() * 6); // 3..8 clusters
    const p = 2 + Math.floor(Math.random() * 5); // 2..6 per cluster
    setClusters(c);
    setPerCluster(p);
    const m: "organic" | "grid" = Math.random() < 0.5 ? "organic" : "grid";
    setMode(m);
    setIcon(pick(ICONS));
    setShape(pick<ShapeType>(["circle", "square", "diamond"]));
    setUserA("");
    setUserB("");
  }, [clearAllTimeouts]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const verify = useCallback(() => {
    if (isBusy) return;
    setIsBusy(true);
    const a = parseInt(userA, 10);
    const b = parseInt(userB, 10);
    const ok =
      !Number.isNaN(a) &&
      !Number.isNaN(b) &&
      ((a === clusters && b === perCluster) ||
        (a === perCluster && b === clusters));
    if (ok) {
      addPoints(1);
      setShowSuccessContainer(true);
      setStartSuccessAnimation(false);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: regenerate,
      });
    } else {
      addPoints(-1);
      setShowFailure(true);
      scheduleFailureDismiss(2200, () => {
        setShowFailure(false);
        setIsBusy(false);
      });
    }
  }, [
    isBusy,
    userA,
    userB,
    clusters,
    perCluster,
    addPoints,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
    regenerate,
  ]);

  // Grid mode helpers
  const bigGridDims = useMemo(() => {
    const cols = Math.ceil(Math.sqrt(clusters || 1));
    const rows = Math.ceil((clusters || 1) / cols);
    return { rows, cols };
  }, [clusters]);
  const smallGridDims = useMemo(() => {
    const cols = Math.ceil(Math.sqrt(perCluster || 1));
    const rows = Math.ceil((perCluster || 1) / cols);
    return { rows, cols };
  }, [perCluster]);

  const allIconPositions = useMemo(() => {
    // Compute positions for all icons in a single container,
    // with clusters placed roughly along a circle.
    const cx = BOARD_PX / 2;
    const cy = BOARD_PX / 2;
    const ringR = BOARD_PX * 0.36; // radius for cluster centers
    const jitter = 4;
    const pos: Array<{
      left: number;
      top: number;
      color: string;
      key: string;
    }> = [];
    for (let k = 0; k < clusters; k++) {
      const theta = -Math.PI / 2 + (2 * Math.PI * k) / clusters; // start at top
      // Slight radius modulation for organic layout
      const rMod = ringR * (0.95 + 0.1 * Math.sin(k));
      const centerX = cx + rMod * Math.cos(theta);
      const centerY = cy + rMod * Math.sin(theta);
      const innerR =
        perCluster === 1
          ? 0
          : Math.max(
              ICON_SIZE * 0.75,
              (2 * Math.PI * ICON_SIZE) / Math.max(perCluster, 5),
            ) * 0.7; // tighter grouping
      for (let i = 0; i < perCluster; i++) {
        let x = centerX;
        let y = centerY;
        if (perCluster > 1) {
          const phi = (2 * Math.PI * i) / perCluster;
          x += innerR * Math.cos(phi);
          y += innerR * Math.sin(phi);
        }
        // Jitter for more organic pattern
        x += (Math.random() * 2 - 1) * jitter;
        y += (Math.random() * 2 - 1) * jitter;
        const colorClass =
          COLOR_CLASSES[(k * perCluster + i) % COLOR_CLASSES.length];
        pos.push({
          left: Math.round(x - ICON_SIZE / 2),
          top: Math.round(y - ICON_SIZE / 2),
          color: colorClass,
          key: `c${k}-i${i}`,
        });
      }
    }
    return pos;
  }, [clusters, perCluster]);

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
            headlineText="Count the groups. Fill the boxes."
            instructionText="Count the groups. Fill the boxes."
            className="text-left mb-2"
          />
          <CardLight className="w-full p-6">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5">
              {/* Board (left) */}
              <div className="flex-0 mr-10 w-full flex items-center justify-center">
                <div
                  className="relative rounded-2xl bg-white border-2 border-indigo-300 shadow-sm"
                  style={{ width: BOARD_PX, height: BOARD_PX }}
                  role="img"
                  aria-label={
                    mode === "organic"
                      ? `${clusters} clusters of ${perCluster} icons`
                      : `${clusters} clusters in a grid, ${perCluster} shapes each`
                  }
                >
                  {mode === "organic" ? (
                    allIconPositions.map((p) => (
                      <FontAwesomeIcon
                        key={p.key}
                        icon={icon}
                        className={`absolute ${p.color}`}
                        style={{
                          left: p.left,
                          top: p.top,
                          width: ICON_SIZE,
                          height: ICON_SIZE,
                        }}
                      />
                    ))
                  ) : (
                    <div
                      className="w-full h-full grid p-3"
                      style={{
                        gridTemplateColumns: `repeat(${bigGridDims.cols}, 1fr)`,
                        gridTemplateRows: `repeat(${bigGridDims.rows}, 1fr)`,
                        gap: 8,
                      }}
                    >
                      {Array.from({ length: clusters }, (_, k) => (
                        <div
                          key={`cluster-${k}`}
                          className="w-full h-full flex items-center justify-center p-2"
                        >
                          <div
                            className="grid"
                            style={{
                              gridTemplateColumns: `repeat(${smallGridDims.cols}, minmax(${SHAPE_SIZE}px, 1fr))`,
                              gridTemplateRows: `repeat(${smallGridDims.rows}, minmax(${SHAPE_SIZE}px, 1fr))`,
                              gap: 6,
                            }}
                          >
                            {Array.from({ length: perCluster }, (_, i) => (
                              <div
                                key={`c${k}-i${i}`}
                                className="flex items-center justify-center"
                              >
                                <GeometricShape
                                  shape={shape}
                                  colorClass={
                                    COLOR_CLASSES[
                                      (k * perCluster + i) % COLOR_CLASSES.length
                                    ]
                                  }
                                  size={SHAPE_SIZE}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Equation + action (right) */}
              <div className="md:w-64 w-full flex flex-col items-center md:items-start gap-2 text-sky-900">
                <div className="flex items-center mb-10 gap-2 md:gap-3 text-2xl font-bold">
                  <span className="text-3xl">{total}</span>
                  <span className="text-2xl">=</span>
                  <NumberInput
                    size="M"
                    value={userA}
                    onChange={(e) => setUserA(e.target.value)}
                    min={1}
                    max={99}
                    inputClassName="text-3xl w-16 text-center"
                    aria-label="First factor"
                    onEnterPress={verify}
                  />
                  <span className="text-2xl">×</span>
                  <NumberInput
                    size="M"
                    value={userB}
                    onChange={(e) => setUserB(e.target.value)}
                    min={1}
                    max={99}
                    inputClassName="text-3xl w-16 text-center"
                    aria-label="Second factor"
                    onEnterPress={verify}
                  />
                </div>
                <ReadyButton onClick={verify} disabled={isBusy} />
              </div>
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardCountByClusters;
