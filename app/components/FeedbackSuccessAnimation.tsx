"use client";

import Image from "next/image";
import React from "react";

interface FeedbackSuccessAnimationProps {
  show: boolean;
}

const FeedbackSuccessAnimation: React.FC<FeedbackSuccessAnimationProps> = ({
  show,
}) => {
  return (
    <>
      <Image
        src="/images/astro-dude-2.png"
        alt="Astro Dude 2"
        width={300}
        height={300}
        className={`absolute rotate-160 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-100 ${
          show
            ? "-top-[5%] -left-[5%] opacity-100"
            : "-top-[10%] -left-[10%] opacity-0"
        }`}
        priority // Added priority as these images are part of a success animation
      />
      <Image
        src="/images/astro-dude-1.png"
        alt="Astro Dude 1"
        width={350}
        height={350}
        className={`absolute -rotate-140 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${
          show
            ? "-top-[10%] -right-[8%] opacity-100"
            : "-top-[15%] -right-[12%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dude-5.png"
        alt="Astro Dude 5"
        width={350}
        height={350}
        className={`absolute -rotate-18 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-80 ${
          show
            ? "top-[40%] -right-[10%] opacity-100"
            : "top-[45%] -right-[15%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dude-3.png"
        alt="Astro Dude 3"
        width={400}
        height={400}
        className={`absolute rotate-18 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${
          show
            ? "top-[40%] -left-[10%] opacity-100"
            : "top-[45%] -left-[15%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dudes.png"
        alt="Astro Dudes Group"
        width={4096} // Assuming original aspect ratio is desired
        height={1820}
        className={`absolute w-[85vw] drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-100 ${
          show ? "-bottom-[25%] opacity-100" : "-bottom-[40%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dude-3.png" // Note: Duplicate astro-dude-3, alt changed for uniqueness
        alt="Astro Dude 3 (top-center)"
        width={300}
        height={300}
        className={`absolute rotate-180 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-80 ${
          show
            ? "-top-[10%] right-[50%] opacity-100" // Adjusted right to center it more (50% - half of its width approx)
            : "-top-[15%] right-[55%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dude-4.png"
        alt="Astro Dude 4"
        width={250}
        height={250}
        className={`absolute rotate-160 drop-shadow-lg/20 transition-all duration-200 ease-in-out delay-120 ${
          show
            ? "-top-[8%] right-[40%] opacity-100"
            : "-top-[13%] right-[45%] opacity-0"
        }`}
        priority
      />
      <Image
        src="/images/astro-dude-6.png"
        alt="Astro Dude 6"
        width={300}
        height={300}
        className={`absolute rotate-200 drop-shadow-lg/20 transition-all duration-200 ease-in-out ${
          show
            ? "-top-[8%] right-[20%] opacity-100"
            : "-top-[13%] right-[25%] opacity-0"
        }`}
        priority
      />
    </>
  );
};

export default FeedbackSuccessAnimation;
