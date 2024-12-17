"use client";

import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AnnouncementContent({ children }) {
  console.log("Hello from AnnouncementContent");
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="bg-neutral-950">
      <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white pl-[56px] pr-4 py-2">
        {children}
        <button
          aria-label="Dismiss announcement"
          className="
            p-1
            rounded-full
            bg-white/20
            transition
            hover:bg-white/25 active:bg-white/30
          "
          onClick={handleDismiss}
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </aside>
  )
}
