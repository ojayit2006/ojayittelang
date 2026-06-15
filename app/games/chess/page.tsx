"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import NoiseOverlay from "@/components/NoiseOverlay";

type GameStatus = "idle" | "playing" | "won" | "lost" | "draw";

const PIECE_VALUES: Record<string, number> = {
  p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
};

function evaluateBoard(chess: Chess): number {
  let score = 0;
  const board = chess.board();
  for (const row of board) {
    for (const sq of row) {
      if (!sq) continue;
      const val = PIECE_VALUES[sq.type] ?? 0;
      score += sq.color === "b" ? val : -val;
    }
  }
  return score;
}

function minimax(chess: Chess, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  if (depth === 0 || chess.isGameOver()) return evaluateBoard(chess);
  const moves = chess.moves();
  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      chess.move(m);
      best = Math.max(best, minimax(chess, depth - 1, alpha, beta, false));
      chess.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      chess.move(m);
      best = Math.min(best, minimax(chess, depth - 1, alpha, beta, true));
      chess.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function getBestMove(chess: Chess): string | null {
  const moves = chess.moves();
  if (!moves.length) return null;
  let best = -Infinity;
  let bestMove = moves[0];
  for (const m of moves) {
    chess.move(m);
    const score = minimax(chess, 2, -Infinity, Infinity, false);
    chess.undo();
    if (score > best) { best = score; bestMove = m; }
  }
  return bestMove;
}

export default function ChessPage() {
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [status, setStatus] = useState<GameStatus>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [thinking, setThinking] = useState(false);

  const checkStatus = useCallback((c: Chess) => {
    if (c.isCheckmate()) {
      const winner = c.turn() === "w" ? "Black" : "White";
      setStatus(winner === "White" ? "lost" : "won");
      setStatusMsg(`Checkmate — ${winner} wins!`);
    } else if (c.isDraw()) {
      setStatus("draw");
      setStatusMsg("Draw!");
    } else if (c.inCheck()) {
      setStatusMsg("Check!");
    } else {
      setStatusMsg(`${c.turn() === "w" ? "Your" : "AI's"} turn`);
    }
  }, []);

  function startGame() {
    chess.reset();
    setFen(chess.fen());
    setStatus("playing");
    setHistory([]);
    setStatusMsg("Your turn (White)");
  }

  function onDrop(from: string, to: string) {
    if (status !== "playing" || chess.turn() !== "w" || thinking) return false;
    try {
      const move = chess.move({ from, to, promotion: "q" });
      if (!move) return false;
      const newFen = chess.fen();
      setFen(newFen);
      setHistory((h) => [...h, move.san]);
      checkStatus(chess);
      if (!chess.isGameOver()) {
        setThinking(true);
        setStatusMsg("AI thinking...");
        setTimeout(() => {
          const aiMove = getBestMove(chess);
          if (aiMove) {
            const m = chess.move(aiMove);
            setFen(chess.fen());
            if (m) setHistory((h) => [...h, m.san]);
          }
          checkStatus(chess);
          setThinking(false);
        }, 300);
      }
      return true;
    } catch {
      return false;
    }
  }

  function resetGame() {
    chess.reset();
    setFen(chess.fen());
    setStatus("idle");
    setHistory([]);
    setStatusMsg("");
  }

  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/games" className="font-mono text-xs text-muted hover:text-text transition-colors">← Games</Link>
          <span className="text-border">/</span>
          <p className="font-mono text-xs text-text">Chess</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-black text-4xl md:text-5xl text-text mb-1">♟️ Chess</h1>
          <p className="font-sans text-muted text-sm mb-8">You play White. AI plays Black with 2-ply minimax.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Board */}
            <div className="lg:col-span-2">
              {status === "idle" ? (
                <div className="flex items-center justify-center border border-border/40 aspect-square max-w-md mx-auto">
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-accent text-white font-mono text-sm hover:bg-accent/80 transition-colors"
                  >
                    Start Game →
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <Chessboard
                    options={{
                      position: fen,
                      onPieceDrop: ({ sourceSquare, targetSquare }) =>
                        onDrop(sourceSquare, targetSquare ?? ""),
                      boardOrientation: "white",
                      darkSquareStyle: { backgroundColor: "#1e1e30" },
                      lightSquareStyle: { backgroundColor: "#2d2d45" },
                      boardStyle: { borderRadius: "0", boxShadow: "none" },
                      allowDragging: status === "playing" && !thinking,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-4">
              {status !== "idle" && (
                <>
                  <div className="border border-border/40 p-4">
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">Status</p>
                    <p className={`font-display font-bold text-sm ${
                      status === "won" ? "text-green-400" : status === "lost" ? "text-red-400" : status === "draw" ? "text-muted" : "text-text"
                    }`}>{statusMsg}</p>
                  </div>

                  {history.length > 0 && (
                    <div className="border border-border/40 p-4 flex-1 overflow-y-auto max-h-48">
                      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Move history</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {history.map((m, i) => (
                          <span key={i} className="font-mono text-xs text-muted">
                            {i % 2 === 0 && <span className="text-muted2 mr-1">{Math.floor(i / 2) + 1}.</span>}
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={resetGame}
                    className="border border-border text-muted font-mono text-xs py-2 hover:border-text hover:text-text transition-colors"
                  >
                    {status !== "playing" ? "Play again" : "Resign"}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
