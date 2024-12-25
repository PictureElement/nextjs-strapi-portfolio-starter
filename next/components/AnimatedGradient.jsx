"use client";

import { useEffect } from "react";
import { Gradient } from "@/lib/gradient";

export default function AnimatedGradient() {
  console.log("Hello from AnimatedGradient");
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
        "--gradient-color-1": "#fafafa",
        "--gradient-color-2": "#f5f5f5",
        "--gradient-color-3": "#e5e5e5",
        "--gradient-color-4": "#d4d4d4",
      }}
    />
  );
}
