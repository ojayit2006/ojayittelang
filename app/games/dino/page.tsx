"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const W = 800;
const H = 300;
const GROUND_Y = 248;
const GRAVITY = 0.8;
const JUMP_V = -15;
const INIT_SPEED = 5;
const MAX_SPEED = 15;
const DINO_X = 80;
const DINO_W = 44;
const DINO_H = 52;
const DINO_COLOR = "#DFE104";
const BG = "#09090B";
const SURFACE = "#27272A";
const BORDER = "#3F3F46";
const TEXT_C = "#FAFAFA";
const MUTED = "#A1A1AA";

const CACTUS_TYPES = [
  { w: 18, h: 48 },
  { w: 28, h: 58 },
  { w: 14, h: 68 },
];

interface Cloud { x: number; y: number; w: number }
interface Cactus { x: number; w: number; h: number }

interface State {
  started: boolean;
  over: boolean;
  score: number;
  hiScore: number;
  speed: number;
  dinoY: number;
  dinoVY: number;
  onGround: boolean;
  legPhase: number;
  cacti: Cactus[];
  clouds: Cloud[];
  nextCactus: number;
  groundOffset: number;
}

function makeState(): State {
  return {
    started: false,
    over: false,
    score: 0,
    hiScore: 0,
    speed: INIT_SPEED,
    dinoY: GROUND_Y,
    dinoVY: 0,
    onGround: true,
    legPhase: 0,
    cacti: [],
    clouds: [
      { x: 200, y: 55, w: 90 },
      { x: 480, y: 75, w: 65 },
      { x: 660, y: 45, w: 110 },
    ],
    nextCactus: 100,
    groundOffset: 0,
  };
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  ctx.fillStyle = SURFACE;
  ctx.fillRect(x, y, w, 8);
  ctx.fillRect(x + 5, y - 6, w - 10, 8);
  ctx.fillRect(x + 12, y - 12, w - 24, 8);
}

function drawDino(ctx: CanvasRenderingContext2D, dinoY: number, legPhase: number) {
  const x = DINO_X;
  const y = dinoY;
  ctx.fillStyle = DINO_COLOR;

  // Body
  ctx.fillRect(x + 4, y - DINO_H + 10, DINO_W - 8, DINO_H - 20);
  // Neck
  ctx.fillRect(x + DINO_W - 16, y - DINO_H + 2, 12, 16);
  // Head
  ctx.fillRect(x + DINO_W - 14, y - DINO_H - 10, 20, 18);
  // Snout
  ctx.fillRect(x + DINO_W + 2, y - DINO_H - 2, 6, 8);
  // Eye
  ctx.fillStyle = BG;
  ctx.fillRect(x + DINO_W + 2, y - DINO_H - 6, 4, 4);

  // Tail
  ctx.fillStyle = DINO_COLOR;
  ctx.fillRect(x - 8, y - DINO_H + 20, 12, 6);
  ctx.fillRect(x - 14, y - DINO_H + 26, 8, 6);

  // Legs
  const leg1H = legPhase < 0.5 ? 14 : 6;
  const leg2H = legPhase < 0.5 ? 6 : 14;
  ctx.fillRect(x + 8, y - 14, 8, leg1H);
  ctx.fillRect(x + 22, y - 14, 8, leg2H);
  // Feet
  ctx.fillRect(x + 4, y - 4, 12, 4);
  ctx.fillRect(x + 18, y - 4, 12, 4);
}

function drawCactus(ctx: CanvasRenderingContext2D, cactus: Cactus) {
  const { x, w, h } = cactus;
  ctx.fillStyle = MUTED;

  // Main trunk
  ctx.fillRect(x + Math.floor(w / 2) - 4, GROUND_Y - h, 8, h);
  // Left arm
  ctx.fillRect(x, GROUND_Y - h + Math.floor(h * 0.35), 6, Math.floor(h * 0.25));
  ctx.fillRect(x, GROUND_Y - h + Math.floor(h * 0.25), Math.floor(w / 2) - 2, 6);
  // Right arm
  ctx.fillRect(x + w - 6, GROUND_Y - h + Math.floor(h * 0.4), 6, Math.floor(h * 0.22));
  ctx.fillRect(x + Math.floor(w / 2) + 2, GROUND_Y - h + Math.floor(h * 0.32), Math.floor(w / 2) - 2, 6);
}

export default function DinoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>(makeState());
  const rafRef = useRef<number>(0);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.over) {
      const hiScore = s.hiScore;
      stateRef.current = { ...makeState(), started: true, hiScore };
    } else if (!s.started) {
      stateRef.current.started = true;
    } else if (s.onGround) {
      stateRef.current.dinoVY = JUMP_V;
      stateRef.current.onGround = false;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    const onPointer = () => jump();

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("touchstart", onPointer, { passive: true });
    canvas.addEventListener("click", onPointer);

    function draw() {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Clouds
      s.clouds.forEach(c => drawCloud(ctx, c.x, c.y, c.w));

      // Ground
      ctx.strokeStyle = BORDER;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(W, GROUND_Y);
      ctx.stroke();

      // Ground texture marks
      ctx.fillStyle = BORDER;
      for (let i = 0; i < 8; i++) {
        const gx = ((s.groundOffset * 0.3 + i * 100) % W);
        ctx.fillRect(gx, GROUND_Y + 4, 20, 2);
        ctx.fillRect(gx + 40, GROUND_Y + 8, 10, 2);
      }

      // Cacti
      s.cacti.forEach(c => drawCactus(ctx, c));

      // Dino
      drawDino(ctx, s.dinoY, s.legPhase);

      // HUD
      ctx.fillStyle = MUTED;
      ctx.font = "600 13px 'JetBrains Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(
        `HI ${String(Math.floor(s.hiScore)).padStart(5, "0")}  ${String(Math.floor(s.score)).padStart(5, "0")}`,
        W - 16,
        28
      );
      ctx.textAlign = "left";

      if (!s.started && !s.over) {
        ctx.fillStyle = TEXT_C;
        ctx.font = "bold 16px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE / TAP TO START", W / 2, H / 2 + 8);
        ctx.textAlign = "left";
      }

      if (s.over) {
        ctx.fillStyle = TEXT_C;
        ctx.font = "bold 20px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 16);
        ctx.fillStyle = DINO_COLOR;
        ctx.font = "bold 12px 'Space Grotesk', sans-serif";
        ctx.fillText("SPACE / TAP TO RESTART", W / 2, H / 2 + 14);
        ctx.textAlign = "left";
      }
    }

    function update() {
      const s = stateRef.current;
      if (!s.started || s.over) return;

      s.score += s.speed * 0.1;
      s.speed = Math.min(INIT_SPEED + s.score * 0.004, MAX_SPEED);
      s.groundOffset = (s.groundOffset + s.speed) % W;

      // Dino
      s.dinoVY += GRAVITY;
      s.dinoY += s.dinoVY;
      if (s.dinoY >= GROUND_Y) {
        s.dinoY = GROUND_Y;
        s.dinoVY = 0;
        s.onGround = true;
      }
      if (s.onGround) {
        s.legPhase = (s.legPhase + s.speed * 0.014) % 1;
      }

      // Clouds
      s.clouds.forEach(c => { c.x -= s.speed * 0.25; });
      s.clouds = s.clouds.filter(c => c.x > -150);
      if (s.clouds.length < 3) {
        s.clouds.push({
          x: W + 60,
          y: 35 + Math.random() * 55,
          w: 55 + Math.random() * 70,
        });
      }

      // Cacti spawning
      s.nextCactus -= s.speed;
      if (s.nextCactus <= 0) {
        const t = CACTUS_TYPES[Math.floor(Math.random() * CACTUS_TYPES.length)];
        s.cacti.push({ x: W + 20, ...t });
        const gap = Math.max(30, 80 - s.speed * 3);
        s.nextCactus = gap + Math.random() * gap;
      }
      s.cacti.forEach(c => { c.x -= s.speed; });
      s.cacti = s.cacti.filter(c => c.x > -60);

      // AABB collision
      for (const c of s.cacti) {
        const dL = DINO_X + 8;
        const dR = DINO_X + DINO_W - 4;
        const dT = s.dinoY - DINO_H + 14;
        const dB = s.dinoY - 6;
        const cL = c.x + 2;
        const cR = c.x + c.w - 2;
        const cT = GROUND_Y - c.h + 2;
        if (dR > cL && dL < cR && dB > cT && dT < GROUND_Y) {
          s.over = true;
          s.started = false;
          if (s.score > s.hiScore) s.hiScore = s.score;
        }
      }
    }

    function loop() {
      update();
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("touchstart", onPointer);
      canvas.removeEventListener("click", onPointer);
    };
  }, [jump]);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 pt-28">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] text-muted uppercase tracking-[0.25em] mb-1">
              05 — GAMES / DINO
            </p>
            <h1
              className="font-display font-black uppercase tracking-tighter text-text leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Dino <span className="text-accent">Runner</span>
            </h1>
          </div>
          <Link
            href="/games"
            className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-widest"
          >
            ← Back
          </Link>
        </div>

        <div className="border-2 border-border overflow-hidden">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full block"
            style={{ touchAction: "none" }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Space / ↑ / Tap to jump
          </p>
          <p className="font-mono text-[10px] text-muted2 uppercase tracking-widest">
            Speed increases over time
          </p>
        </div>
      </div>
    </div>
  );
}
