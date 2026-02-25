"use client";

import React, { useState, useCallback } from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { NumberInput } from "@/app/elements/NumberInput";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const MIN_DENOM = 1;
const MAX_DENOM = 24;

const GameBoardFractionsOfABlock: React.FC = () => {
  const [denom, setDenom] = useState(5);
  const [num, setNum] = useState(2);
  const [denomDraft, setDenomDraft] = useState("5");
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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="h-auto max-h-[80vh] mb-10 w-full max-w-3xl px-4 mx-auto">
        <HeadlineInstruction
          headlineText="Fractions of a block"
          instructionText="Change the numbers in the fraction. The block below shows how many parts are filled."
          className="mb-6"
        />
        <CardLight className="flex flex-col items-center gap-8">
          {/* Fraction: two independent inputs with separator line (arrows on the right in each) */}
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
              className="w-full min-w-[6rem] h-0.5 bg-sky-600 my-1 shrink-0"
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

          {/* Block: read-only fraction on top, then rectangle */}
          <div className="w-full flex flex-col items-center gap-2">
            <div
              className="flex flex-col items-center leading-none text-sky-900 font-bold"
              aria-hidden
            >
              <span className="text-2xl tabular-nums">{num}</span>
              <span className="w-8 border-t-2 border-sky-700 my-0.5" />
              <span className="text-2xl tabular-nums">{denom}</span>
            </div>
            <div
              className="flex flex-row w-full rounded-lg overflow-hidden border-4 border-blue-900 bg-sky-50"
              style={{ minHeight: "4rem" }}
              role="img"
              aria-label={`Block split into ${segments} parts, ${filled} filled`}
            >
              {Array.from({ length: segments }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-0 border-r-4 border-blue-900 last:border-r-0"
                  style={{
                    backgroundColor: i < filled ? "#3b82f6" : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardFractionsOfABlock;
