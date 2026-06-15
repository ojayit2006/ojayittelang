"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NoiseOverlay from "@/components/NoiseOverlay";

type Card = { code: string; value: string; suit: string; image: string };
type Phase = "idle" | "preflop" | "flop" | "turn" | "river" | "showdown";
type BotAction = "call" | "raise" | "fold" | "check";

const STARTING_CHIPS = 1000;
const SMALL_BLIND = 10;
const BIG_BLIND = 20;

const SUIT_SYMBOLS: Record<string, string> = { SPADES: "♠", HEARTS: "♥", DIAMONDS: "♦", CLUBS: "♣" };
const SUIT_COLORS: Record<string, string> = { HEARTS: "text-red-400", DIAMONDS: "text-red-400", SPADES: "text-text", CLUBS: "text-text" };

function CardDisplay({ card, hidden = false }: { card?: Card; hidden?: boolean }) {
  if (!card || hidden) {
    return (
      <div className="w-16 h-24 border border-border/40 bg-surface rounded flex items-center justify-center">
        {hidden ? <span className="text-muted text-xl">🂠</span> : <span className="text-muted text-xs">?</span>}
      </div>
    );
  }
  const suitSym = SUIT_SYMBOLS[card.suit] ?? card.suit[0];
  const color = SUIT_COLORS[card.suit] ?? "text-text";
  const displayValue = card.value === "ACE" ? "A" : card.value === "KING" ? "K" : card.value === "QUEEN" ? "Q" : card.value === "JACK" ? "J" : card.value;
  return (
    <div className={`w-16 h-24 border border-border/40 bg-bg rounded flex flex-col justify-between p-1.5 ${color}`}>
      <div className="font-mono font-bold text-sm leading-none">{displayValue}</div>
      <div className="text-center text-xl leading-none">{suitSym}</div>
      <div className="font-mono font-bold text-sm leading-none self-end rotate-180">{displayValue}</div>
    </div>
  );
}

function handRank(cards: Card[]): [number, string] {
  if (cards.length < 5) return [0, "High Card"];
  const vals = cards.map(c => {
    const v = c.value;
    if (v === "ACE") return 14; if (v === "KING") return 13; if (v === "QUEEN") return 12;
    if (v === "JACK") return 11; if (v === "10") return 10;
    return parseInt(v);
  }).sort((a, b) => b - a);
  const suits = cards.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);
  const isStraight = vals.every((v, i) => i === 0 || vals[i - 1] - v === 1) ||
    (vals[0] === 14 && vals[1] === 5 && vals[2] === 4 && vals[3] === 3 && vals[4] === 2);
  const counts: Record<number, number> = {};
  vals.forEach(v => counts[v] = (counts[v] ?? 0) + 1);
  const groups = Object.values(counts).sort((a, b) => b - a);
  if (isFlush && isStraight) return [8, "Straight Flush"];
  if (groups[0] === 4) return [7, "Four of a Kind"];
  if (groups[0] === 3 && groups[1] === 2) return [6, "Full House"];
  if (isFlush) return [5, "Flush"];
  if (isStraight) return [4, "Straight"];
  if (groups[0] === 3) return [3, "Three of a Kind"];
  if (groups[0] === 2 && groups[1] === 2) return [2, "Two Pair"];
  if (groups[0] === 2) return [1, "Pair"];
  return [0, "High Card"];
}

function bestHand(hole: Card[], community: Card[]): [number, string] {
  const all = [...hole, ...community];
  if (all.length < 5) return handRank(all);
  let best: [number, string] = [0, "High Card"];
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      const five = all.filter((_, k) => k !== i && k !== j);
      const rank = handRank(five);
      if (rank[0] > best[0]) best = rank;
    }
  }
  return best;
}

function botDecide(botHole: Card[], community: Card[], pot: number, toCall: number): BotAction {
  const [rank] = bestHand(botHole, community);
  if (rank >= 5 || (rank >= 3 && Math.random() > 0.3)) return "raise";
  if (rank >= 1 || toCall === 0) return toCall === 0 ? "check" : "call";
  if (toCall > 0 && Math.random() > 0.5) return "call";
  return "fold";
}

export default function PokerPage() {
  const [deckId, setDeckId] = useState("");
  const [playerChips, setPlayerChips] = useState(STARTING_CHIPS);
  const [botChips, setBotChips] = useState(STARTING_CHIPS);
  const [pot, setPot] = useState(0);
  const [playerHole, setPlayerHole] = useState<Card[]>([]);
  const [botHole, setBotHole] = useState<Card[]>([]);
  const [community, setCommunity] = useState<Card[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [playerBet, setPlayerBet] = useState(0);
  const [botBet, setBotBet] = useState(0);
  const [message, setMessage] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [loading, setLoading] = useState(false);

  const drawCards = useCallback(async (id: string, count: number): Promise<Card[]> => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${count}`);
    const data = await res.json();
    return data.cards;
  }, []);

  async function startGame() {
    setLoading(true);
    setMessage("");
    setShowBot(false);
    try {
      const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const data = await res.json();
      const id = data.deck_id;
      setDeckId(id);
      const cards = await drawCards(id, 4);
      const ph = [cards[0], cards[2]];
      const bh = [cards[1], cards[3]];
      setPlayerHole(ph);
      setBotHole(bh);
      setCommunity([]);
      const newPot = SMALL_BLIND + BIG_BLIND;
      setPot(newPot);
      setPlayerChips(c => c - BIG_BLIND);
      setBotChips(c => c - SMALL_BLIND);
      setPlayerBet(BIG_BLIND);
      setBotBet(SMALL_BLIND);
      setPhase("preflop");
      setMessage("Pre-flop — your action (you posted big blind)");
    } catch {
      setMessage("Failed to connect to card API. Check your internet.");
    }
    setLoading(false);
  }

  async function dealCommunity(count: number, nextPhase: Phase) {
    const cards = await drawCards(deckId, count);
    setCommunity(prev => [...prev, ...cards]);
    setPhase(nextPhase);
    setPlayerBet(0);
    setBotBet(0);
    setMessage(`${nextPhase.charAt(0).toUpperCase() + nextPhase.slice(1)} dealt — your action`);
  }

  function endHand(winner: "player" | "bot" | "split") {
    setShowBot(true);
    if (winner === "player") {
      setPlayerChips(c => c + pot);
      setMessage(`You win ${pot} chips! 🎉`);
    } else if (winner === "bot") {
      setBotChips(c => c + pot);
      setMessage(`Bot wins ${pot} chips 😤`);
    } else {
      const half = Math.floor(pot / 2);
      setPlayerChips(c => c + half);
      setBotChips(c => c + half);
      setMessage("Split pot!");
    }
    setPot(0);
    setPhase("showdown");
  }

  function determineWinner() {
    const [pr, pn] = bestHand(playerHole, community);
    const [br, bn] = bestHand(botHole, community);
    if (pr > br) endHand("player");
    else if (br > pr) endHand("bot");
    else endHand("split");
    setMessage(prev => `${prev} — you: ${pn}, bot: ${bn}`);
  }

  function doAction(action: "call" | "check" | "raise" | "fold") {
    const toCall = botBet - playerBet;

    if (action === "fold") {
      setBotChips(c => c + pot);
      setMessage("You folded. Bot wins the pot.");
      setPhase("showdown");
      return;
    }

    let newPlayerBet = playerBet;
    let newPot = pot;
    let newPlayerChips = playerChips;

    if (action === "call" && toCall > 0) {
      newPlayerChips -= toCall;
      newPlayerBet += toCall;
      newPot += toCall;
    } else if (action === "raise") {
      const amount = BIG_BLIND * 2;
      newPlayerChips -= amount + toCall;
      newPlayerBet += amount + toCall;
      newPot += amount + toCall;
    }

    setPlayerChips(newPlayerChips);
    setPlayerBet(newPlayerBet);
    setPot(newPot);

    // Bot responds
    const botAction = botDecide(botHole, community, newPot, newPlayerBet - botBet);
    setTimeout(() => {
      if (botAction === "fold") {
        setPlayerChips(c => c + newPot);
        setMessage("Bot folded. You win the pot! 🎉");
        setPot(0);
        setPhase("showdown");
        return;
      }

      let newBotBet = botBet;
      let finalPot = newPot;
      let newBotChips = botChips;

      if (botAction === "call") {
        const diff = newPlayerBet - newBotBet;
        newBotChips -= diff;
        newBotBet += diff;
        finalPot += diff;
      } else if (botAction === "raise") {
        const amount = BIG_BLIND * 2 + (newPlayerBet - newBotBet);
        newBotChips -= amount;
        newBotBet += amount;
        finalPot += amount;
        const extra = newBotBet - newPlayerBet;
        newPlayerChips -= extra;
        newPot = finalPot + extra;
        finalPot = newPot;
        setPlayerChips(c => c - extra);
      }

      setBotChips(newBotChips);
      setBotBet(newBotBet);
      setPot(finalPot);

      const nextActions: Record<Phase, { next: () => void; phase: Phase }> = {
        preflop: { next: () => dealCommunity(3, "flop"), phase: "flop" },
        flop: { next: () => dealCommunity(1, "turn"), phase: "turn" },
        turn: { next: () => dealCommunity(1, "river"), phase: "river" },
        river: { next: determineWinner, phase: "showdown" },
        idle: { next: () => {}, phase: "idle" },
        showdown: { next: () => {}, phase: "showdown" },
      };

      nextActions[phase].next();
    }, 800);
  }

  const canAct = phase !== "idle" && phase !== "showdown";
  const toCall = botBet - playerBet;

  return (
    <div className="relative min-h-screen bg-bg">
      <NoiseOverlay />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/games" className="font-mono text-xs text-muted hover:text-text transition-colors">← Games</Link>
          <span className="text-border">/</span>
          <p className="font-mono text-xs text-text">Poker</p>
        </div>

        <h1 className="font-display font-black text-4xl text-text mb-1">♠️ Texas Hold&apos;em</h1>
        <p className="font-sans text-muted text-sm mb-8">1v1 vs bot · Blinds: {SMALL_BLIND}/{BIG_BLIND} · Starting: {STARTING_CHIPS}</p>

        {/* Chips display */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="border border-border/40 p-3">
            <p className="font-mono text-xs text-muted mb-1">You</p>
            <p className="font-display font-bold text-xl text-text">{playerChips}</p>
          </div>
          <div className="border border-accent/40 p-3">
            <p className="font-mono text-xs text-accent mb-1">Pot</p>
            <p className="font-display font-bold text-xl text-accent">{pot}</p>
          </div>
          <div className="border border-border/40 p-3">
            <p className="font-mono text-xs text-muted mb-1">Bot</p>
            <p className="font-display font-bold text-xl text-text">{botChips}</p>
          </div>
        </div>

        {/* Bot hand */}
        <div className="mb-6">
          <p className="font-mono text-xs text-muted mb-3">Bot&apos;s hand</p>
          <div className="flex gap-2">
            <CardDisplay card={botHole[0]} hidden={!showBot} />
            <CardDisplay card={botHole[1]} hidden={!showBot} />
          </div>
        </div>

        {/* Community cards */}
        <div className="mb-6">
          <p className="font-mono text-xs text-muted mb-3">Community ({phase})</p>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardDisplay key={i} card={community[i]} />
            ))}
          </div>
        </div>

        {/* Player hand */}
        <div className="mb-6">
          <p className="font-mono text-xs text-muted mb-3">Your hand</p>
          <div className="flex gap-2">
            <CardDisplay card={playerHole[0]} />
            <CardDisplay card={playerHole[1]} />
          </div>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm text-muted mb-6 min-h-[1.5rem]"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Actions */}
        {phase === "idle" || phase === "showdown" ? (
          <div className="flex gap-3">
            <button
              onClick={startGame}
              disabled={loading}
              className="px-6 py-2.5 bg-accent text-white font-mono text-sm hover:bg-accent/80 disabled:opacity-50 transition-colors"
            >
              {loading ? "Dealing..." : phase === "showdown" ? "New hand →" : "Deal cards →"}
            </button>
          </div>
        ) : canAct ? (
          <div className="flex flex-wrap gap-2">
            {toCall === 0 ? (
              <button onClick={() => doAction("check")} className="px-5 py-2.5 border border-border text-text font-mono text-sm hover:border-accent hover:text-accent transition-colors">Check</button>
            ) : (
              <button onClick={() => doAction("call")} className="px-5 py-2.5 border border-cyan text-cyan font-mono text-sm hover:bg-cyan/10 transition-colors">
                Call {toCall}
              </button>
            )}
            <button onClick={() => doAction("raise")} className="px-5 py-2.5 border border-accent text-accent font-mono text-sm hover:bg-accent/10 transition-colors">
              Raise {BIG_BLIND * 2}
            </button>
            <button onClick={() => doAction("fold")} className="px-5 py-2.5 border border-border text-muted font-mono text-sm hover:border-red-500 hover:text-red-400 transition-colors">
              Fold
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
