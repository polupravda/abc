import React, { useRef, useState, useEffect, useCallback } from "react";

const Slider: React.FC = () => {
  const min = -10;
  const max = 10;
  const range = max - min;

  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

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
    document.removeEventListener("mousemove", handlePointerMove as any);
    document.removeEventListener("touchmove", handlePointerMove as any);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  }, [handlePointerMove]);

  const startDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", handlePointerMove as any);
      document.addEventListener("touchmove", handlePointerMove as any);
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

  const pointerPosPercent = ((max - value) / range) * 100;

  return (
    <div className="flex items-center select-none">
      {/* Display current value */}
      <div className="text-[12rem] font-bold text-fuchsia-800 h-[16rem] w-[20rem] flex items-center justify-center border-4 border-fuchsia-300 rounded-xl">
        {value}
      </div>

      {/* Slider track and pointer */}
      <div
        className="relative flex items-center"
        style={{ height: "80vh", width: "4rem" }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 shadow-lg/30"
          style={{
            width: "16px",
            top: "-2.5%", // extend half step above
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
              className="absolute bg-gray-200 rounded-full"
              style={{
                width: "0.2rem",
                height: "0.2rem",
                left: "50%",
                top: `${pos}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        {/* Step labels */}
        {Array.from({ length: range + 1 }, (_, i) => max - i).map((num) => {
          const pos = ((max - num) / range) * 100;
          return (
            <span
              key={num}
              className={`absolute font-bold text-xl ${
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
          {/* Outer circle */}
          <div className="absolute w-full h-full rounded-full bg-purple-700 shadow-lg/30" />
          {/* Inner circle */}
          <div className="absolute w-3/5 h-3/5 rounded-full bg-purple-300 shadow-lg/30" />
          {/* Arrow pointing right toward indicators */}
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
    </div>
  );
};

export default Slider;
