'use client';

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";

export default function Announcement({ data }) {
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

  if (!data) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="bg-neutral-950 relative z-[10000]">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Announcement&quot; component.</div>
        </div>
      </div>
    )
  }

  if (!isVisible) return null;

  // Destructure the necessary properties
  const { content } = data;

  // Render nothing if no content
  if (!content) return null;

  return (
    <aside className="bg-neutral-950 relative z-[10000]">
      <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white pl-[56px] pr-4 py-2">
        <div
          className="text-center prose prose-sm leading-snug prose-invert prose-modifier !max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(content)) }}
        />
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
  );
}
