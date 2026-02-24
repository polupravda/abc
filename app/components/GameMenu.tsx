"use client";

import React from "react";
import Image from "next/image";
import GameBadge from "./GameBadge";
import Toggle from "./Toggle";

// Game card backgrounds (image, position, size as percentage)
const SUBTRACTION_CARD_BG = {
  image: "/images/space-1.svg",
  position: "52% 95%",
  size: 750,
};
const PHONICS_CARD_BG = {
  image: "/images/space-1.svg",
  position: "50% 87%",
  size: 501,
};
const LETTER_SOUND_MATCH_CARD_BG = {
  image: "/images/space-1.svg",
  position: "1% 19%",
  size: 538,
};
const BLENDING_CARD_BG = {
  image: "/images/space-1.svg",
  position: "20% 80%",
  size: 600,
};
const GREATER_OR_LESS_CARD_BG = {
  image: "/images/space-1.svg",
  position: "80% 20%",
  size: 550,
};
const MULTIPLICATION_CARD_BG = {
  image: "/images/space-1.svg",
  position: "60% 35%",
  size: 520,
};
const ORDINAL_CARD_BG = {
  image: "/images/space-1.svg",
  position: "30% 70%",
  size: 520,
};
const PLUS_MINUS_CARD_BG = {
  image: "/images/space-1.svg",
  position: "60% 25%",
  size: 480,
};
const WHICH_PICTURE_CARD_BG = {
  image: "/images/space-1.svg",
  position: "45% 55%",
  size: 550,
};
const CONTINUE_PATTERN_CARD_BG = {
  image: "/images/space-1.svg",
  position: "70% 30%",
  size: 520,
};

const GameMenu: React.FC = () => {
  const additionGameIcon = (
    <div className="relative">
      <Image
        src="/images/shootingStar.svg"
        alt="Home"
        width={80}
        height={80}
        className="absolute top-0 left-0 drop-shadow-lg/20 h-16 w-16 sm:h-20 sm:w-20 transition-all duration-300 ease-in-out transform hover:scale-110"
        priority
      />

      <div className="relative z-10 h-20 w-20">
        <span className="text-5xl font-bold text-amber-500 z-10 absolute top-0 left-1">
          10
        </span>
        <span className="text-4xl font-bold text-[#DB034B] z-10 absolute right-2 bottom-3 text-outline-ochre">
          +
        </span>
      </div>
    </div>
  );
  const subtractionGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${SUBTRACTION_CARD_BG.image}')`,
          backgroundPosition: SUBTRACTION_CARD_BG.position,
          backgroundSize: `${SUBTRACTION_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>

      <div className="relative z-10 h-20 w-20">
        <span className="text-6xl font-bold text-amber-500 z-10 absolute top-2 left-1">
          10
        </span>
        <span className="text-5xl font-bold text-fuchsia-100 z-10 absolute right-2 -bottom-1">
          -
        </span>
      </div>
    </div>
  );

  const phonicsGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${PHONICS_CARD_BG.image}')`,
          backgroundPosition: PHONICS_CARD_BG.position,
          backgroundSize: `${PHONICS_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-4xl font-bold text-amber-500">ABC</span>
      </div>
    </div>
  );

  const letterSoundMatchIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${LETTER_SOUND_MATCH_CARD_BG.image}')`,
          backgroundPosition: LETTER_SOUND_MATCH_CARD_BG.position,
          backgroundSize: `${LETTER_SOUND_MATCH_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex flex-col items-center justify-center relative">
        <span className="text-6xl font-bold text-amber-500 absolute top-2 left-1">
          A?
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-neutral-100 mt-1 z-10 absolute bottom-1 right-3"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.903A9.7 9.7 0 0 0 1.5 12c0 .898.121 1.768.35 2.597.343 1.24 1.518 1.903 2.66 1.903h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.555-2.25-4.685a.75.75 0 0 0-.916 1.192A2.99 2.99 0 0 1 16.084 12a2.99 2.99 0 0 1-1.666 2.493.75.75 0 0 0 .916 1.192C17.714 15.555 18.584 13.857 18.584 12Z" />
          <path d="M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z" />
        </svg>
      </div>
    </div>
  );

  const blendingGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${BLENDING_CARD_BG.image}')`,
          backgroundPosition: BLENDING_CARD_BG.position,
          backgroundSize: `${BLENDING_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-3xl font-bold text-cyan-400">BLEND</span>
      </div>
    </div>
  );

  const greaterOrLessGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${GREATER_OR_LESS_CARD_BG.image}')`,
          backgroundPosition: GREATER_OR_LESS_CARD_BG.position,
          backgroundSize: `${GREATER_OR_LESS_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-4xl font-bold text-lime-400">{`<>`}</span>
      </div>
    </div>
  );

  const multiplicationGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${MULTIPLICATION_CARD_BG.image}')`,
          backgroundPosition: MULTIPLICATION_CARD_BG.position,
          backgroundSize: `${MULTIPLICATION_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-5xl font-bold text-emerald-400">×</span>
      </div>
    </div>
  );

  const continuePatternGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${CONTINUE_PATTERN_CARD_BG.image}')`,
          backgroundPosition: CONTINUE_PATTERN_CARD_BG.position,
          backgroundSize: `${CONTINUE_PATTERN_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-2xl font-bold text-amber-500">…?</span>
      </div>
    </div>
  );

  const ordinalNumbersGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${ORDINAL_CARD_BG.image}')`,
          backgroundPosition: ORDINAL_CARD_BG.position,
          backgroundSize: `${ORDINAL_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-2xl font-bold text-amber-500">1st</span>
        <span className="text-xl font-bold text-sky-300">–10th</span>
      </div>
    </div>
  );

  const plusMinusNumberGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${PLUS_MINUS_CARD_BG.image}')`,
          backgroundPosition: PLUS_MINUS_CARD_BG.position,
          backgroundSize: `${PLUS_MINUS_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center gap-0.5">
        <span className="text-3xl font-bold text-amber-500">+</span>
        <span className="text-3xl font-bold text-sky-300">/-</span>
      </div>
    </div>
  );

  const whichPictureNumberGameIcon = (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${WHICH_PICTURE_CARD_BG.image}')`,
          backgroundPosition: WHICH_PICTURE_CARD_BG.position,
          backgroundSize: `${WHICH_PICTURE_CARD_BG.size}%`,
          backgroundRepeat: "no-repeat",
          filter: "contrast(0.7)",
        }}
      ></div>
      <div className="relative z-10 h-20 w-20 flex items-center justify-center">
        <span className="text-2xl font-bold text-amber-500">100</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen p-8 overflow-auto flex justify-end">
      <div className="flex flex-col items-stretch max-w-2xl w-full gap-6">
        <Toggle
          title="Math"
          iconSrc="/images/icon-math.svg"
          iconAlt="Math"
          defaultOpen={true}
        >
          <GameBadge
            title="Addition up to 10"
            href="/games/addition"
            icon={additionGameIcon}
          />
          <GameBadge
            title="Subtraction up to 10"
            href="/games/subtraction"
            icon={subtractionGameIcon}
          />
          <GameBadge
            title="Multiplication Arrays"
            href="/games/multiplication"
            icon={multiplicationGameIcon}
          />
          <GameBadge
            title="Greater or Less"
            href="/games/greater-or-less"
            icon={greaterOrLessGameIcon}
          />
          <GameBadge
            title="+/- Number"
            href="/games/plus-minus-number"
            icon={plusMinusNumberGameIcon}
          />
          <GameBadge
            title="Which picture shows number up to 100?"
            href="/games/which-picture-number"
            icon={whichPictureNumberGameIcon}
          />
        </Toggle>
        <Toggle
          title="English"
          iconSrc="/images/icon-english.svg"
          iconAlt="English"
          defaultOpen={true}
        >
          <GameBadge
            title="Learn Phonics"
            href="/games/phonics"
            icon={phonicsGameIcon}
          />
          <GameBadge
            title="Letter Sound Match"
            href="/games/letter-sound-match"
            icon={letterSoundMatchIcon}
          />
          <GameBadge
            title="Blending"
            href="/games/blending"
            icon={blendingGameIcon}
          />
        </Toggle>
        <Toggle
          title="Logic"
          iconSrc="/images/icon-logic.svg"
          iconAlt="Logic"
          defaultOpen={true}
        >
          <GameBadge
            title="Ordinal numbers (1st–10th)"
            href="/games/ordinal-numbers"
            icon={ordinalNumbersGameIcon}
          />
          <GameBadge
            title="Continue pattern"
            href="/games/continue-pattern"
            icon={continuePatternGameIcon}
          />
        </Toggle>
      </div>
    </div>
  );
};

export default GameMenu;
