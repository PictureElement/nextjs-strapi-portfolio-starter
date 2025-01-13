'use client';

import { useEffect } from "react";
import { Gradient } from "@/lib/gradient";

export default function AnimatedGradient() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      className="absolute inset-0 w-full h-full"
      style={{
        "--gradient-color-1": "var(--neutral-100)",
        "--gradient-color-2": "var(--neutral-200)",
        "--gradient-color-3": "var(--neutral-300)",
        "--gradient-color-4": "var(--neutral-400)",
      }}
    />
  );
}
