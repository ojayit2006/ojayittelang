"use client";

import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("./Antigravity"), { ssr: false });

export default function AntigravityBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        opacity: 0.13,
      }}
    >
      <Antigravity
        count={160}
        magnetRadius={8}
        ringRadius={8}
        waveSpeed={0.3}
        waveAmplitude={0.8}
        particleSize={1.4}
        lerpSpeed={0.04}
        color="#DFE104"
        autoAnimate={true}
        particleVariance={0.8}
        rotationSpeed={0.02}
        pulseSpeed={2}
      />
    </div>
  );
}
