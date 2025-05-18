"use client";

import React from "react";
import "./RocketAnimation.css"; // Import the CSS file

const RocketAnimation: React.FC = () => {
  return (
    <div className="rocket-animation-box">
      {" "}
      {/* Renamed from .box */}
      <div className="traces">
        {[...Array(8)].map((_, i) => (
          <div className={`trace trace-${i + 1}`} key={`trace-${i}`}>
            <div className="shine shine-1"></div>
            <div className="shine shine-2"></div>
          </div>
        ))}
      </div>
      <div className="rocket-all">
        <div className="steam">
          {[...Array(10)].map((_, i) => (
            <div
              className={`steam-cloud steam-cloud-${i + 1}`}
              key={`steam-${i}`}
            ></div>
          ))}
        </div>
        <div className="rocket">
          <div className="rocket-leg leg-right"></div>
          <div className="rocket-leg leg-left"></div>
          <div className="fire">
            <div className="fire-outer-container">
              <div className="fire-outer"></div>
            </div>
            <div className="fire-inner"></div>
          </div>
          <div className="rocket-body">
            <div className="rocket-window">
              <div className="astronaut">
                <div className="spacesuit"></div>
                <div className="head">
                  <div className="face">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                    <div className="eyebrow eyebrow-left"></div>
                    <div className="eyebrow eyebrow-right"></div>
                    <div className="nose"></div>{" "}
                    {/* Pug had .nose, assuming empty div */}
                    <div className="mouth"></div>
                  </div>
                  <div className="hair">
                    <div className="lock lock-1"></div>
                    <div className="lock lock-2"></div>
                    <div className="lock lock-3"></div>
                    <div className="lock lock-4"></div>
                    <div className="lock lock-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rocket-leg leg-middle"></div>
        </div>
      </div>
    </div>
  );
};

export default RocketAnimation;
