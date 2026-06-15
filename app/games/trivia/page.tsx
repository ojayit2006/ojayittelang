"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NoiseOverlay from "@/components/NoiseOverlay";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled: string[];
};

const CATEGORIES = [
  { id: 9, label: "General Knowledge" },
  { id: 17, label: "Science & Nature" },
  { id: 18, label: "Computers" },
  { id: 23, label: "History" },
  { id: 21, label: "Sports" },
  { id: 11, label: "Movies" },
  { id: 12, label: "Music" },
  { id: 15, label: "Video Games" },
];

function decodeHtml(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent ?? html;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function TriviaPage() {
  const [catId, setCatId] = useState(9);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startGame() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${catId}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();
      if (!data.results?.length) throw new Error("No questions returned.");
      const qs: Question[] = data.results.map((q: Omit<Question, "shuffled">) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHtml),
        shuffled: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml)),
      }));
      setQuestions(qs);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setFinished(false);
    } catch {
      setError("Failed to load questions. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function answer(choice: string) {
    if (selected) return;
    setSelected(choice);
    if (choice === questions[current].correct_answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1200);
  }

  function reset() {
    setQuestions([]);
    setFinished(false);
    setSelected(null);
  }

  const q = questions[current];

  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/games" className="font-mono text-xs text-muted hover:text-text transition-colors">
            ← Games
          </Link>
          <span className="text-border">/</span>
          <p className="font-mono text-xs text-accent">Trivia</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Setup screen */}
          {questions.length === 0 && !loading && (
            <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="font-display font-black text-4xl md:text-5xl text-text mb-2">🧠 Trivia</h1>
              <p className="font-sans text-muted mb-10 text-sm">10 questions. No hints. No mercy.</p>

              {error && <p className="text-hot font-mono text-sm mb-6">{error}</p>}

              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Category</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCatId(c.id)}
                        className={`px-3 py-2 font-mono text-xs border transition-colors text-left ${
                          catId === c.id ? "border-accent text-accent bg-accent/10" : "border-border text-muted hover:border-text hover:text-text"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Difficulty</p>
                  <div className="flex gap-2">
                    {(["easy", "medium", "hard"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`flex-1 py-2 font-mono text-xs border transition-colors capitalize ${
                          difficulty === d ? "border-accent text-accent bg-accent/10" : "border-border text-muted hover:border-text hover:text-text"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-accent text-white font-mono text-sm hover:bg-accent/80 transition-colors"
                >
                  Start Quiz →
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="font-mono text-sm text-muted animate-pulse">Loading questions...</p>
            </motion.div>
          )}

          {/* Question */}
          {q && !finished && (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-mono text-xs text-muted">{current + 1} / {questions.length}</p>
                <p className="font-mono text-xs text-accent">Score: {score}</p>
              </div>

              {/* Progress bar */}
              <div className="h-0.5 bg-border mb-8">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>

              <p className="font-sans text-lg text-text leading-relaxed mb-8">{q.question}</p>

              <div className="space-y-3">
                {q.shuffled.map((opt) => {
                  const isCorrect = opt === q.correct_answer;
                  const isSelected = opt === selected;
                  let cls = "border-border text-muted hover:border-accent/60 hover:text-text";
                  if (selected) {
                    if (isCorrect) cls = "border-green-500 text-green-400 bg-green-500/10";
                    else if (isSelected) cls = "border-red-500 text-red-400 bg-red-500/10";
                    else cls = "border-border/30 text-muted/40";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => answer(opt)}
                      disabled={!!selected}
                      className={`w-full text-left px-4 py-3 border font-sans text-sm transition-all duration-200 ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {finished && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">Quiz complete</p>
              <h2 className="font-display font-black text-6xl text-text mb-2">{score}/{questions.length}</h2>
              <p className="font-sans text-muted text-sm mb-10">
                {score === questions.length ? "Perfect score! Genius." : score >= 7 ? "Solid effort." : score >= 5 ? "Room to grow." : "Better luck next time."}
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={startGame} className="px-6 py-2.5 bg-accent text-white font-mono text-sm hover:bg-accent/80 transition-colors">
                  Play again →
                </button>
                <button onClick={reset} className="px-6 py-2.5 border border-border text-muted font-mono text-sm hover:border-text hover:text-text transition-colors">
                  Change settings
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
