"use client";

import { useState } from "react";
import ChartCSR from "./ChartCSR";
import ChartSSR from "./ChartSSR";

export default function Chart({ data, ariaLabelSSR, ariaLabelCSR }) {
  const [isClientReady, setIsClientReady] = useState(false);

  return (
    <div className="relative">
      <ChartSSR
        data={data}
        className={`absolute inset-0 overflow-hidden flex items-center justify-center width-full !h-[480px] sm:!h-[600px] ${isClientReady ? "sr-only" : ""}`}
        ariaHidden={isClientReady ? "true" : "false"}
        ariaLabel={ariaLabelSSR}
      />
      <ChartCSR
        data={data}
        className="width-full !h-[480px] sm:!h-[600px]"
        ariaHidden={isClientReady ? "false" : "true"}
        ariaLabel={ariaLabelCSR}
        onClientReady={() => setIsClientReady(true)}
      />
      <noscript>
        <p className="text-center text-red-500">JavaScript is disabled. Please enable it to view the interactive chart.</p>
      </noscript>
    </div>
  );
}
