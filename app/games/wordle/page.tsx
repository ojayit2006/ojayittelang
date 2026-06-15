"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NoiseOverlay from "@/components/NoiseOverlay";
import { ANSWER_WORDS, VALID_WORDS } from "@/data/wordlist";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

type Row = { letter: string; state: LetterState }[];

function getAnswer(): string {
  const seed = Math.floor(Date.now() / 86400000);
  return ANSWER_WORDS[seed % ANSWER_WORDS.length].toUpperCase();
}

function evaluateGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill("absent");
  const ansArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === ansArr[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const j = ansArr.findIndex((c, idx) => !used[idx] && c === guessArr[i]);
    if (j !== -1) { result[i] = "present"; used[j] = true; }
  }
  return result;
}

const STATE_COLORS: Record<LetterState, string> = {
  correct: "bg-green-600 border-green-600 text-white",
  present: "bg-yellow-600 border-yellow-600 text-white",
  absent: "bg-surface border-muted2 text-muted",
  empty: "border-border/40 text-text",
  tbd: "border-muted2 text-text",
};

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

export default function WordlePage() {
  const [answer] = useState(getAnswer);
  const [guesses, setGuesses] = useState<Row[]>(
    Array.from({ length: MAX_GUESSES }, () =>
      Array.from({ length: WORD_LENGTH }, () => ({ letter: "", state: "empty" as LetterState }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState("");
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const submitGuess = useCallback(() => {
    const guess = guesses[currentRow].map((c) => c.letter).join("");
    if (guess.length < WORD_LENGTH) { setShake(true); setTimeout(() => setShake(false), 500); showMessage("Not enough letters"); return; }
    if (!VALID_WORDS.has(guess.toLowerCase())) { setShake(true); setTimeout(() => setShake(false), 500); showMessage("Not in word list"); return; }

    const states = evaluateGuess(guess, answer);
    const newGuesses = guesses.map((row, ri) =>
      ri === currentRow ? row.map((c, ci) => ({ ...c, state: states[ci] })) : row
    );
    setGuesses(newGuesses);

    const newLetterStates = { ...letterStates };
    guess.split("").forEach((letter, i) => {
      const prev = newLetterStates[letter];
      const next = states[i];
      if (prev === "correct") return;
      if (prev === "present" && next !== "correct") return;
      newLetterStates[letter] = next;
    });
    setLetterStates(newLetterStates);

    if (guess === answer) {
      setWon(true);
      setGameOver(true);
      showMessage(["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"][currentRow] ?? "Nice!");
    } else if (currentRow + 1 >= MAX_GUESSES) {
      setGameOver(true);
      showMessage(answer);
    } else {
      setCurrentRow((r) => r + 1);
      setCurrentCol(0);
    }
  }, [guesses, currentRow, answer, letterStates]);

  const type = useCallback((key: string) => {
    if (gameOver) return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") {
      if (currentCol === 0) return;
      const newG = guesses.map((row, ri) =>
        ri === currentRow ? row.map((c, ci) => ci === currentCol - 1 ? { letter: "", state: "empty" as LetterState } : c) : row
      );
      setGuesses(newG);
      setCurrentCol((c) => c - 1);
      return;
    }
    if (!/^[A-Z]$/.test(key) || currentCol >= WORD_LENGTH) return;
    const newG = guesses.map((row, ri) =>
      ri === currentRow ? row.map((c, ci) => ci === currentCol ? { letter: key, state: "tbd" as LetterState } : c) : row
    );
    setGuesses(newG);
    setCurrentCol((c) => c + 1);
  }, [gameOver, currentCol, currentRow, guesses, submitGuess]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => type(e.key.toUpperCase());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [type]);

  function reset() {
    setGuesses(Array.from({ length: MAX_GUESSES }, () =>
      Array.from({ length: WORD_LENGTH }, () => ({ letter: "", state: "empty" as LetterState }))
    ));
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setWon(false);
    setLetterStates({});
    setMessage("");
  }

  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 max-w-lg mx-auto px-4 py-24">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/games" className="font-mono text-xs text-muted hover:text-text transition-colors">← Games</Link>
          <span className="text-border">/</span>
          <p className="font-mono text-xs text-text">Wordle</p>
        </div>

        <h1 className="font-display font-black text-4xl text-text mb-1">🟩 Wordle</h1>
        <p className="font-sans text-muted text-sm mb-8">Guess the 5-letter word in 6 tries.</p>

        {/* Message toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-4 font-mono text-sm text-text bg-surface border border-border px-4 py-2"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="flex flex-col gap-1.5 mb-8">
          {guesses.map((row, ri) => (
            <div
              key={ri}
              className={`flex gap-1.5 ${shake && ri === currentRow ? "animate-[shake_0.4s_ease]" : ""}`}
            >
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  className={`flex-1 aspect-square flex items-center justify-center border font-display font-black text-2xl uppercase transition-all duration-300 ${STATE_COLORS[cell.state]}`}
                  style={{
                    transitionDelay: ri < currentRow ? `${ci * 80}ms` : "0ms",
                  }}
                >
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="flex flex-col gap-1.5">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1 justify-center">
              {row.map((key) => {
                const state = letterStates[key];
                const isWide = key === "ENTER" || key === "⌫";
                let cls = "border-border text-text hover:bg-surface";
                if (state === "correct") cls = "bg-green-600 border-green-600 text-white";
                else if (state === "present") cls = "bg-yellow-600 border-yellow-600 text-white";
                else if (state === "absent") cls = "bg-surface border-muted2 text-muted";
                return (
                  <button
                    key={key}
                    onClick={() => type(key)}
                    className={`${isWide ? "px-3 text-xs" : "w-9"} h-14 border font-mono text-xs font-bold uppercase transition-colors duration-200 ${cls}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="mt-8 text-center">
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-accent text-white font-mono text-sm hover:bg-accent/80 transition-colors"
            >
              {won ? "Play again →" : "Try again →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
