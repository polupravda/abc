"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import GameBadge from "./GameBadge";
import Toggle from "./Toggle";
import GameCardIcon from "./GameCardIcon";

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
const ADDITION_100_CARD_BG = {
  image: "/images/space-1.svg",
  position: "75% 65%",
  size: 520,
};
const CONTINUE_PATTERN_CARD_BG = {
  image: "/images/space-1.svg",
  position: "70% 30%",
  size: 520,
};
const FRACTIONS_BLOCK_CARD_BG = {
  image: "/images/space-1.svg",
  position: "55% 45%",
  size: 520,
};
const DIVIDE_CHOCOLATE_BAR_CARD_BG = {
  image: "/images/space-1.svg",
  position: "50% 50%",
  size: 520,
};
const COORDINATES_CARD_BG = {
  image: "/images/space-1.svg",
  position: "50% 60%",
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
    <GameCardIcon background={SUBTRACTION_CARD_BG}>
      <span className="text-6xl font-bold text-amber-500 z-10 absolute top-2 left-1">
        10
      </span>
      <span className="text-5xl font-bold text-fuchsia-100 z-10 absolute right-2 -bottom-1">
        -
      </span>
    </GameCardIcon>
  );

  const phonicsGameIcon = (
    <GameCardIcon background={PHONICS_CARD_BG}>
      <span className="text-4xl font-bold text-amber-500">ABC</span>
    </GameCardIcon>
  );

  const letterSoundMatchIcon = (
    <GameCardIcon background={LETTER_SOUND_MATCH_CARD_BG}>
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
    </GameCardIcon>
  );

  const blendingGameIcon = (
    <GameCardIcon background={BLENDING_CARD_BG}>
      <span className="text-3xl font-bold text-cyan-400">BLEND</span>
    </GameCardIcon>
  );

  const greaterOrLessGameIcon = (
    <GameCardIcon background={GREATER_OR_LESS_CARD_BG}>
      <span className="text-4xl font-bold text-lime-400">{`<>`}</span>
    </GameCardIcon>
  );

  const multiplicationGameIcon = (
    <GameCardIcon background={MULTIPLICATION_CARD_BG}>
      <span className="text-5xl font-bold text-emerald-400">×</span>
    </GameCardIcon>
  );
  const fewerMoreSameIcon = (
    <GameCardIcon background={MULTIPLICATION_CARD_BG}>
      <div className="flex items-center justify-center gap-1">
        <span className="text-2xl font-bold text-emerald-400">{"<"}</span>
        <span className="text-xl font-bold text-amber-400">=</span>
        <span className="text-2xl font-bold text-emerald-400">{">"}</span>
      </div>
    </GameCardIcon>
  );

  const continuePatternGameIcon = (
    <GameCardIcon background={CONTINUE_PATTERN_CARD_BG}>
      <span className="text-2xl font-bold text-amber-500">…?</span>
    </GameCardIcon>
  );

  const ordinalNumbersGameIcon = (
    <GameCardIcon background={ORDINAL_CARD_BG}>
      <div className="flex items-center justify-center gap-0.5">
        <span className="text-2xl font-bold text-amber-500">1st</span>
        <span className="text-xl font-bold text-sky-300">–10th</span>
      </div>
    </GameCardIcon>
  );

  const plusMinusNumberGameIcon = (
    <GameCardIcon background={PLUS_MINUS_CARD_BG}>
      <div className="flex items-center justify-center gap-0.5">
        <span className="text-3xl font-bold text-amber-500">+</span>
        <span className="text-3xl font-bold text-sky-300">/-</span>
      </div>
    </GameCardIcon>
  );

  const whichPictureNumberGameIcon = (
    <GameCardIcon background={WHICH_PICTURE_CARD_BG}>
      <span className="text-2xl font-bold text-amber-500">100</span>
    </GameCardIcon>
  );

  const addition100GameIcon = (
    <GameCardIcon background={ADDITION_100_CARD_BG}>
      <span className="text-2xl font-bold text-amber-500">100</span>
      <span className="text-xl font-bold text-fuchsia-100 absolute right-2 bottom-1">+</span>
    </GameCardIcon>
  );

  const fractionsOfABlockIcon = (
    <GameCardIcon background={FRACTIONS_BLOCK_CARD_BG}>
      <div className="flex flex-col items-center leading-none">
        <span className="text-xl font-bold text-sky-700">1</span>
        <span className="w-6 border-t-2 border-sky-700" />
        <span className="text-xl font-bold text-sky-700">2</span>
      </div>
    </GameCardIcon>
  );

  const fractionsOfACircleIcon = (
    <GameCardIcon background={FRACTIONS_BLOCK_CARD_BG}>
      <svg
        viewBox="0 0 100 100"
        className="w-16 h-16 text-emerald-600"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="32" fill="#ecfeff" stroke="#065f46" strokeWidth="6" />
        <path
          d="M50 50 L50 18 A32 32 0 0 1 81 50 Z"
          fill="#10b981"
          stroke="#065f46"
          strokeWidth="2"
        />
      </svg>
    </GameCardIcon>
  );

  const divideChocolateBarIcon = (
    <GameCardIcon background={DIVIDE_CHOCOLATE_BAR_CARD_BG}>
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex gap-0.5">
          <span className="w-3 h-4 rounded-sm bg-amber-700" />
          <span className="w-3 h-4 rounded-sm bg-amber-600" />
        </div>
        <span className="text-xs font-bold text-amber-900">÷</span>
      </div>
    </GameCardIcon>
  );

  const coordinatesGameIcon = (
    <GameCardIcon background={COORDINATES_CARD_BG}>
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-8 w-[80%] border-t-2 border-indigo-500" />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[80%] w-8 border-l-2 border-indigo-500" />
        </div>
        <span
          className="w-3.5 h-3.5 rounded-full"
          style={{ backgroundColor: "#ef4444", boxShadow: "0 0 0 2px white" }}
        />
      </div>
    </GameCardIcon>
  );

  const copyCoordinatesIcon = (
    <GameCardIcon background={COORDINATES_CARD_BG}>
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-8 w-[80%] border-t-2 border-indigo-500" />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[80%] w-8 border-l-2 border-indigo-500" />
        </div>
        <div className="relative z-10 h-20 w-20">
          <span
            className="absolute left-4 top-5 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#ef4444", boxShadow: "0 0 0 2px white" }}
          />
          <span
            className="absolute right-4 bottom-3 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#ef4444", boxShadow: "0 0 0 2px white" }}
          />
        </div>
      </div>
    </GameCardIcon>
  );

  const plottingPointsIcon = (
    <GameCardIcon background={COORDINATES_CARD_BG}>
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-8 w-[80%] border-t-2 border-indigo-500" />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[80%] w-8 border-l-2 border-emerald-500" />
        </div>
        <FontAwesomeIcon
          icon={faDove}
          className="w-10 h-10 text-indigo-600 z-10"
          aria-hidden
        />
      </div>
    </GameCardIcon>
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
            title="Multiplication Arrays"
            href="/games/multiplication"
            icon={multiplicationGameIcon}
            variant="learn"
          />
          <GameBadge
            title="Fractions of a block"
            href="/games/fractions-of-a-block"
            icon={fractionsOfABlockIcon}
            variant="learn"
          />
          <GameBadge
            title="Fractions of a circle"
            href="/games/fractions-of-a-circle"
            icon={fractionsOfACircleIcon}
            variant="learn"
          />
          <GameBadge
            title="Coordinates"
            href="/games/coordinates"
            icon={coordinatesGameIcon}
            variant="learn"
          />
          <GameBadge
            title="Plotting points"
            href="/games/plotting-points"
            icon={plottingPointsIcon}
            difficulty={1}
          />
          <GameBadge
            title="Copy coordinates"
            href="/games/copy-coordinates"
            icon={copyCoordinatesIcon}
            difficulty={1}
          />
          <GameBadge
            title="Fewer, more, or same?"
            href="/games/fewer-more-same"
            icon={fewerMoreSameIcon}
            difficulty={1}
          />
          <GameBadge
            title="Divide chocolate bar"
            href="/games/divide-chocolate-bar"
            icon={divideChocolateBarIcon}
            difficulty={2}
          />
          <GameBadge
            title="Addition up to 10"
            href="/games/addition"
            icon={additionGameIcon}
            difficulty={1}
          />
          <GameBadge
            title="Addition up to 100 (no carrying)"
            href="/games/addition-100-no-carry"
            icon={addition100GameIcon}
            difficulty={2}
          />
          <GameBadge
            title="Addition up to 100 (with carrying)"
            href="/games/addition-100-carry"
            icon={addition100GameIcon}
            difficulty={3}
          />
          <GameBadge
            title="Subtraction up to 10"
            href="/games/subtraction"
            icon={subtractionGameIcon}
            difficulty={1}
          />
          <GameBadge
            title="Greater or Less"
            href="/games/greater-or-less"
            icon={greaterOrLessGameIcon}
            difficulty={2}
          />
          <GameBadge
            title="+/- Number"
            href="/games/plus-minus-number"
            icon={plusMinusNumberGameIcon}
            difficulty={2}
          />
          <GameBadge
            title="Which picture shows number up to 100?"
            href="/games/which-picture-number"
            icon={whichPictureNumberGameIcon}
            difficulty={2}
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
            variant="learn"
          />
          <GameBadge
            title="Letter Sound Match"
            href="/games/letter-sound-match"
            icon={letterSoundMatchIcon}
            difficulty={1}
          />
          <GameBadge
            title="Blending"
            href="/games/blending"
            icon={blendingGameIcon}
            difficulty={2}
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
            difficulty={1}
          />
          <GameBadge
            title="Continue pattern"
            href="/games/continue-pattern"
            icon={continuePatternGameIcon}
            difficulty={2}
          />
        </Toggle>
      </div>
    </div>
  );
};

export default GameMenu;
