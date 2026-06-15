"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Stock {
  symbol: string;
  price: number;
  change: number;
  pct: number;
}

const BASE: Stock[] = [
  { symbol: "NIFTY 50",  price: 24821.90, change:  143.20, pct:  0.58 },
  { symbol: "SENSEX",    price: 81721.45, change:  431.85, pct:  0.53 },
  { symbol: "RELIANCE",  price:  2943.60, change:  -12.30, pct: -0.42 },
  { symbol: "TCS",       price:  4218.75, change:   38.20, pct:  0.91 },
  { symbol: "INFY",      price:  1892.30, change:   -8.45, pct: -0.44 },
  { symbol: "HDFC BANK", price:  1789.50, change:   22.10, pct:  1.25 },
  { symbol: "WIPRO",     price:   549.30, change:    4.80, pct:  0.88 },
  { symbol: "AAPL",      price:   213.49, change:    1.78, pct:  0.84 },
  { symbol: "MSFT",      price:   421.87, change:   -3.21, pct: -0.76 },
  { symbol: "NVDA",      price:   138.92, change:    5.43, pct:  4.07 },
  { symbol: "GOOGL",     price:   178.34, change:    2.15, pct:  1.22 },
  { symbol: "AMZN",      price:   201.78, change:   -1.87, pct: -0.92 },
  { symbol: "TSLA",      price:   248.91, change:    8.34, pct:  3.47 },
  { symbol: "META",      price:   579.23, change:   -4.56, pct: -0.78 },
  { symbol: "BTC-USD",   price: 67842.10, change: 1243.80, pct:  1.87 },
  { symbol: "ETH-USD",   price:  3641.20, change:  -87.30, pct: -2.34 },
];

function fmt(price: number): string {
  if (price >= 10000) return price.toFixed(0);
  if (price >= 1000) return price.toFixed(0);
  return price.toFixed(2);
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const delta = s.price * (Math.random() - 0.49) * 0.0025;
          const newPrice = Math.max(0.01, s.price + delta);
          const newChange = s.change + delta;
          const newPct = newChange / (newPrice - newChange + 0.0001) * 100;
          return { ...s, price: newPrice, change: newChange, pct: newPct };
        })
      );
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-8 bg-bg border-b-2 border-border flex items-center overflow-hidden">
      {/* LIVE badge */}
      <div className="shrink-0 h-full flex items-center px-3 border-r-2 border-border bg-accent">
        <span className="font-mono text-[9px] font-black text-black uppercase tracking-[0.2em]">
          LIVE
        </span>
      </div>

      <Marquee speed={35} gradient={false} autoFill className="h-full">
        {stocks.map((s) => (
          <span
            key={s.symbol}
            className="inline-flex items-center gap-2 mx-7 font-mono text-[10px] h-full"
          >
            <span className="text-muted uppercase tracking-wide">{s.symbol}</span>
            <span className="text-text font-medium tabular-nums">{fmt(s.price)}</span>
            <span
              className={`tabular-nums font-medium ${
                s.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.pct).toFixed(2)}%
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
