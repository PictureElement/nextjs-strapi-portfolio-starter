'use client';

import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AnnouncementContent({ children }) {
  const [isVisible, setIsVisible] = useState(null);

  useEffect(() => {
    // Check if the announcement hasn't been dismissed
    if (typeof window !== "undefined" && !localStorage.getItem("announcementDismissed")) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcementDismissed", "true"); // Persist dismissal in local storage
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
