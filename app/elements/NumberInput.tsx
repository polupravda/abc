"use client";

import React, { forwardRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export type NumberInputSize = "S" | "M" | "L";

const sizeClasses = {
  wrapper: {
    S: "rounded-lg border-2 border-sky-200 overflow-hidden",
    M: "rounded-xl border-2 border-sky-200 overflow-hidden",
    L: "rounded-2xl border-2 border-sky-200 overflow-hidden",
  },
  wrapperBg: {
    S: "bg-white",
    M: "bg-white",
    L: "bg-white/50",
  },
  input: {
    S: "text-lg w-14 py-0 px-1 min-w-0",
    M: "text-2xl w-20 py-0 px-1 min-w-0",
    L: "text-4xl w-24 py-0 px-1 min-w-0",
  },
  stepper: {
    S: "w-9 min-w-[2.25rem] border-l-2 border-sky-200",
    M: "w-11 min-w-[2.75rem] border-l-2 border-sky-200",
    L: "w-16 min-w-[4rem]",
  },
  stepperButton: {
    S: "min-h-[2rem] text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-none disabled:opacity-50 disabled:pointer-events-none",
    M: "min-h-[2rem] text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-none disabled:opacity-50 disabled:pointer-events-none",
    L: "min-h-[2.5rem] text-sky-600 hover:text-sky-800 hover:bg-sky-50/50 disabled:opacity-50 disabled:pointer-events-none",
  },
  stepperButtonUpL: "rounded-tr-2xl",
  stepperButtonDownL: "rounded-br-2xl",
  stepperIcon: {
    S: "text-base",
    M: "text-lg",
    L: "text-4xl",
  },
} as const;

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type"
  > {
  /** Preset size; use inputClassName/className to override. */
  size?: NumberInputSize;
  /** Wrapper (container) Tailwind classes; overrides default wrapper styles when provided. */
  className?: string;
  /** Input element Tailwind classes; overrides default input size when provided. */
  inputClassName?: string;
  /** Show up/down stepper buttons (default true). Kid-friendly controls. */
  showStepper?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      size = "M",
      className,
      inputClassName,
      showStepper = true,
      value,
      onChange,
      min,
      max,
      step = 1,
      disabled,
      ...rest
    },
    ref
  ) => {
    const numMin = min !== undefined ? Number(min) : undefined;
    const numMax = max !== undefined ? Number(max) : undefined;

    const clamp = useCallback(
      (n: number): number => {
        let v = n;
        if (numMin !== undefined) v = Math.max(numMin, v);
        if (numMax !== undefined) v = Math.min(numMax, v);
        return v;
      },
      [numMin, numMax]
    );

    const dispatchChange = useCallback(
      (newValue: number) => {
        const str = String(newValue);
        onChange?.({
          target: { value: str } as HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>);
      },
      [onChange]
    );

    const handleStepUp = useCallback(() => {
      const current = value === "" || value === undefined ? numMin ?? 0 : Number(value);
      const next = clamp(Number.isNaN(current) ? numMin ?? 0 : current + step);
      dispatchChange(next);
    }, [value, step, numMin, clamp, dispatchChange]);

    const handleStepDown = useCallback(() => {
      const current = value === "" || value === undefined ? numMin ?? 0 : Number(value);
      const next = clamp(Number.isNaN(current) ? numMin ?? 0 : current - step);
      dispatchChange(next);
    }, [value, step, numMin, clamp, dispatchChange]);

    const wrapperClass = className ?? `inline-flex items-stretch ${sizeClasses.wrapperBg[size]} shadow-sm focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-400 ${sizeClasses.wrapper[size]}`;
    const inputClass =
      inputClassName ??
      `font-bold text-sky-900 text-center border-0 bg-transparent outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${sizeClasses.input[size]}`;
    const stepperClass = `flex flex-col shrink-0 ${sizeClasses.stepper[size]}`;

    return (
      <div className={wrapperClass}>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={inputClass}
          aria-label={rest["aria-label"]}
          {...rest}
        />
        {showStepper && (
          <div className={stepperClass} aria-hidden>
            <button
              type="button"
              onClick={handleStepUp}
              disabled={disabled}
              className={`flex-1 flex items-center justify-center ${size !== "L" ? "border-b-2 border-sky-200" : ""} ${sizeClasses.stepperButton[size]} ${size === "L" ? sizeClasses.stepperButtonUpL : ""}`}
              aria-label="Increase value"
            >
              <FontAwesomeIcon icon={faCaretUp} className={sizeClasses.stepperIcon[size]} />
            </button>
            <button
              type="button"
              onClick={handleStepDown}
              disabled={disabled}
              className={`flex-1 flex items-center justify-center ${sizeClasses.stepperButton[size]} ${size === "L" ? sizeClasses.stepperButtonDownL : ""}`}
              aria-label="Decrease value"
            >
              <FontAwesomeIcon icon={faCaretDown} className={sizeClasses.stepperIcon[size]} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
