"use client";

import React, { useState, useCallback, useMemo } from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { NumberInput } from "@/app/elements/NumberInput";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const MIN_DENOM = 1;
const MAX_DENOM = 24;

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleRad: number
): { x: number; y: number } {
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function sectorPath(
  cx: number,
  cy: number,
  r: number,
  startAngleRad: number,
  endAngleRad: number
): string {
  const start = polarToCartesian(cx, cy, r, startAngleRad);
  const end = polarToCartesian(cx, cy, r, endAngleRad);
  const largeArcFlag = endAngleRad - startAngleRad > Math.PI ? 1 : 0;
  // Move to center, line to start, arc to end, close
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

const GameBoardFractionsOfACircle: React.FC = () => {
  const [denom, setDenom] = useState(6);
  const [num, setNum] = useState(2);
  const [denomDraft, setDenomDraft] = useState("6");
  const [numDraft, setNumDraft] = useState("2");

  const maxNum = denom;
  const clampNum = useCallback(
    (n: number) => clamp(n, 0, maxNum),
    [maxNum]
  );

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setNumDraft("");
      return;
    }
    const parsed = parseInt(raw, 10);
    const committed = clampNum(isNaN(parsed) ? num : parsed);
    setNum(committed);
    setNumDraft(String(committed));
  };

  const handleNumBlur = () => {
    if (numDraft === "") {
      setNumDraft(String(num));
      return;
    }
    const parsed = parseInt(numDraft, 10);
    const committed = clampNum(isNaN(parsed) ? num : parsed);
    setNum(committed);
    setNumDraft(String(committed));
  };

  const handleDenomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      setDenomDraft("");
      return;
    }
    const parsed = parseInt(raw, 10);
    const d = clamp(isNaN(parsed) ? denom : parsed, MIN_DENOM, MAX_DENOM);
    setDenom(d);
    setNum(clamp(num, 0, d));
    setDenomDraft(String(d));
    setNumDraft(String(clamp(num, 0, d)));
  };

  const handleDenomBlur = () => {
    if (denomDraft === "") {
      setDenomDraft(String(denom));
      return;
    }
    const parsed = parseInt(denomDraft, 10);
    const d = clamp(isNaN(parsed) ? denom : parsed, MIN_DENOM, MAX_DENOM);
    setDenom(d);
    const n = clamp(num, 0, d);
    setNum(n);
    setDenomDraft(String(d));
    setNumDraft(String(n));
  };

  const segments = Math.max(1, denom);
  const filled = clamp(num, 0, segments);

  const wedges = useMemo(() => {
    const size = 240; // svg viewBox size
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.4;
    const full = Math.PI * 2;
    const step = full / segments;
    const paths: { d: string; filled: boolean }[] = [];
    for (let i = 0; i < segments; i++) {
      // Start at -90deg so the first wedge points up
      const start = -Math.PI / 2 + i * step;
      const end = start + step;
      const d = sectorPath(cx, cy, r, start, end);
      paths.push({ d, filled: i < filled });
    }
    return { size: 240, cx, cy, r, paths };
  }, [segments, filled]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="h-auto max-h-[80vh] mb-10 w-full max-w-3xl px-4 mx-auto">
        <HeadlineInstruction
          headlineText="Fractions of a circle"
          instructionText="Change the numbers in the fraction. The circle below shows how many sectors are filled."
          className="mb-6"
        />
        <CardLight className="flex flex-col items-center gap-8">
          {/* Fraction inputs */}
          <div
            className="flex flex-col items-center gap-0"
            role="group"
            aria-label="Fraction"
          >
            <NumberInput
              size="M"
              min={0}
              max={maxNum}
              value={numDraft}
              onChange={handleNumChange}
              onBlur={handleNumBlur}
              aria-label="Numerator"
            />
            <div
              className="w-full min-w-[6rem] h-0.5 bg-emerald-600 my-1 shrink-0"
              aria-hidden
            />
            <NumberInput
              size="M"
              min={MIN_DENOM}
              max={MAX_DENOM}
              value={denomDraft}
              onChange={handleDenomChange}
              onBlur={handleDenomBlur}
              aria-label="Denominator"
            />
          </div>

          {/* Read-only fraction (left) + circle (right) */}
          <div className="w-full flex items-center justify-center gap-6">
            <div
              className="flex flex-col items-center leading-none text-emerald-900 font-bold"
              aria-hidden
            >
              <span className="text-2xl tabular-nums">{num}</span>
              <span className="w-8 border-t-2 border-emerald-700 my-0.5" />
              <span className="text-2xl tabular-nums">{denom}</span>
            </div>
            <div
              className="flex items-center justify-center"
              role="img"
              aria-label={`Circle split into ${segments} sectors, ${filled} filled`}
            >
              <svg
                viewBox={`0 0 ${wedges.size} ${wedges.size}`}
                width={wedges.size}
                height={wedges.size}
                className="drop-shadow-sm"
              >
                {/* Base circle outline */}
                <circle
                  cx={wedges.cx}
                  cy={wedges.cy}
                  r={wedges.r}
                  fill="#ecfeff"
                  stroke="#065f46"
                  strokeWidth="4"
                />
                {/* Sectors */}
                {wedges.paths.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    fill={p.filled ? "#10b981" : "transparent"}
                    stroke="#065f46"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardFractionsOfACircle;
