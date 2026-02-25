"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "abc-score";

interface ScoreContextValue {
  score: number;
  addPoints: (delta: number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextValue | null>(null);

function readStoredScore(): number {
  if (typeof window === "undefined") return 0;
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s == null) return 0;
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function writeStoredScore(score: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(score));
  } catch {
    // ignore
  }
}

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setScore(readStoredScore());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStoredScore(score);
  }, [score, hydrated]);

  const addPoints = useCallback((delta: number) => {
    setScore((prev) => Math.max(0, prev + delta));
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  const value: ScoreContextValue = { score, addPoints, resetScore };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore(): ScoreContextValue {
  const ctx = useContext(ScoreContext);
  if (ctx == null) {
    throw new Error("useScore must be used within ScoreProvider");
  }
  return ctx;
}
