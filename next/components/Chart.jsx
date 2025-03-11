'use client';

import { useState, useCallback } from "react";
import ChartCSR from "./ChartCSR";

export default function Chart({
  data,
  children,
}) {
  const [isClientReady, setIsClientReady] = useState(false);

  const handleClientReady = useCallback(() => {
    setIsClientReady(true);
  }, []);

  return (
    <div className="relative">

      <div
        role="region"
        aria-hidden={isClientReady ? "false" : "true"}
        aria-label="An interactive sunburst chart displaying technical and soft skills"
      >
        <ChartCSR
          data={data}
          onClientReady={handleClientReady}
        />
      </div>

      <div
        role="region"
        aria-hidden={isClientReady ? "true" : "false"}
        aria-label="A static sunburst chart displaying technical and soft skills"
        className={`absolute inset-0 ${isClientReady ? "sr-only" : ""}`}
      >
        {children}
      </div>

      <noscript>
        <p className="text-center text-red-500">JavaScript is disabled. Please enable it to view the interactive chart.</p>
      </noscript>
    </div >
  );
}
