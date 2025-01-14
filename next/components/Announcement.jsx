'use client';

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";

export default function Announcement({ announcementData }) {
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

  if (!announcementData) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <aside className="bg-neutral-950">
        <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white px-4 py-2">
          <div className="text-center max-w-none prose prose-sm prose-invert">
            Unable to load data for the Announcement component
          </div>
        </div>
      </aside>
    )
  }

  if (!isVisible) return null;

  // Destructure the necessary properties
  const { content } = announcementData;

  // Render nothing if no content
  if (!content) return null;

  return (
    <aside className="bg-neutral-950">
      <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white pl-[56px] pr-4 py-2">
        <div
          className="text-center max-w-none prose prose-sm prose-invert prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
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
