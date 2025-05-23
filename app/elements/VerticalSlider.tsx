"use client";

import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";

interface VerticalSliderProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  height?: string; // e.g., '500px'
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  value,
  onChange,
  min = -15,
  max = 15,
  step = 1,
  height = "500px", // Increased default height
}) => {
  const range = max - min;
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPositionFromValue = useCallback(
    (val: number) => {
      if (range === 0) return 0;
      const percentage = ((val - min) / range) * 100;
      return Math.max(0, Math.min(100, 100 - percentage)); // Inverted for top-down slider
    },
    [min, range]
  );

  const getValueFromPosition = useCallback(
    (yPosition: number, trackHeight: number) => {
      if (trackHeight === 0) return min;
      const percentage = 100 - (yPosition / trackHeight) * 100; // Inverted
      const rawValue = (percentage / 100) * range + min;
      const numSteps = Math.round((rawValue - min) / step);
      let snappedValue = min + numSteps * step;
      snappedValue = Math.max(min, Math.min(max, snappedValue));
      return snappedValue;
    },
    [min, max, step, range]
  );

  const pointerPosition = useMemo(
    () => getPositionFromValue(value),
    [value, getPositionFromValue]
  );

  const handleInteraction = useCallback(
    (clientY: number) => {
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const yPositionInTrack = clientY - trackRect.top;
      const newValue = getValueFromPosition(yPositionInTrack, trackRect.height);
      onChange(newValue);
    },
    [getValueFromPosition, onChange]
  );

  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleInteraction(event.clientY);
  };

  const handleTrackTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) {
      handleInteraction(event.touches[0].clientY);
    }
  };

  const handlePointerDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    // Prevent text selection/default drag behaviors
    event.preventDefault();
    if ("touches" in event && event.touches.length > 0) {
      // Immediately update position on touch down if desired, or wait for move
      // handleInteraction(event.touches[0].clientY);
    } else if ("clientY" in event) {
      // Optionally, handle mouse down interaction immediately as well
      // handleInteraction(event.clientY);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        handleInteraction(event.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging && event.touches.length > 0) {
        handleInteraction(event.touches[0].clientY);
      }
    };

    const handleMouseUpOrTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleMouseUpOrTouchEnd);
      window.addEventListener("touchend", handleMouseUpOrTouchEnd);
      window.addEventListener("mouseleave", handleMouseUpOrTouchEnd); // Handle mouse leaving window
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUpOrTouchEnd);
      window.removeEventListener("touchend", handleMouseUpOrTouchEnd);
      window.removeEventListener("mouseleave", handleMouseUpOrTouchEnd);
    };
  }, [isDragging, handleInteraction]);

  const numberLabels = useMemo(() => {
    const labels = [];
    for (let i = min; i <= max; i += 1) {
      if (i === 0 || i === min || i === max || i % 5 === 0) {
        labels.push({
          value: i,
          position: getPositionFromValue(i),
          color:
            i > 0
              ? "text-blue-600 font-semibold"
              : i < 0
              ? "text-red-600 font-semibold"
              : "text-gray-800 font-bold",
        });
      }
    }
    return labels;
  }, [min, max, getPositionFromValue]);

  return (
    <div
      className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-inner select-none"
      style={{ touchAction: "none" }}
    >
      {/* Number Labels on the left */}
      <div className="relative pr-2" style={{ height }}>
        {numberLabels.map((label) => (
          <div
            key={label.value}
            className={`absolute right-full mr-2 transform -translate-y-1/2 text-xs whitespace-nowrap ${label.color}`}
            style={{ top: `${label.position}%` }}
          >
            {label.value}
          </div>
        ))}
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef} // Attach ref to the track
        className="relative rounded-full cursor-pointer group shadow-sm"
        style={{ width: "16px", height }}
        onClick={handleTrackClick} // Keep click on track to jump
        onTouchStart={handleTrackTouch} // Use dedicated touch handler
      >
        {/* Background segments for color indication (Blue for >0, Red for <0) */}
        <div
          className="absolute bottom-0 left-0 w-full bg-red-400 rounded-b-full pointer-events-none"
          style={{
            top: `${getPositionFromValue(0)}%`,
            height: `${100 - getPositionFromValue(0)}%`,
          }}
        />
        <div
          className="absolute top-0 left-0 w-full bg-blue-400 rounded-t-full pointer-events-none"
          style={{ height: `${getPositionFromValue(0)}%` }}
        />

        {/* Track overlay for visual ticks and consistent click area */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {Array.from({ length: (max - min) / step + 1 }).map((_, index) => {
            const stepValue = min + index * step;
            const stepPosition = getPositionFromValue(stepValue);
            const isMajorTick =
              stepValue === 0 ||
              stepValue === min ||
              stepValue === max ||
              stepValue % 5 === 0;
            return (
              <div
                key={stepValue}
                className={`absolute left-1/2 transform -translate-x-1/2 h-px pointer-events-none ${
                  isMajorTick ? "w-3 bg-gray-600" : "w-2 bg-gray-400"
                }`}
                style={{ top: `${stepPosition}%` }}
              />
            );
          })}
        </div>

        {/* Pointer */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-indigo-600 rounded-full shadow-lg cursor-grab active:cursor-grabbing focus:outline-none ring-indigo-500 ring-offset-2 transition-shadow duration-150 ease-in-out"
          style={{ top: `${pointerPosition}%`, touchAction: "none" }} // Added touchAction: 'none' for pointer
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-orientation="vertical"
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        />
      </div>
    </div>
  );
};

export default VerticalSlider;
