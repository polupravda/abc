"use client";

import React from "react";
import GameBoardGreaterOrLess from "../../components/gameBoards/GameBoardGreaterOrLess";
// import BackgroundSpace from "../../components/BackgroundSpace"; // Temporarily removed

const GreaterOrLessPage: React.FC = () => {
  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center bg-white justify-center relative">
      {/* <BackgroundSpace /> */}
      <div className="z-10 h-full w-full max-w-full flex items-center justify-center">
        <GameBoardGreaterOrLess />
      </div>
    </main>
  );
};

export default GreaterOrLessPage;
