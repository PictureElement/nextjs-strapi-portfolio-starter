'use client';

import createDOMPurify from "dompurify";
import { marked } from "marked";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function DismissibleAnnouncement({ content }) {
  const [dismissed, setDismissed] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState("");

  // useEffect ensures the DOMPurify and Markdown processing only run on the client.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = createDOMPurify(window); // Initialize DOMPurify
      setSanitizedContent(DOMPurify.sanitize(marked(content)));
    }
  }, [content]);

  if (dismissed) {
    return null;
  }

  return (
    <aside className="bg-neutral-950">
      <div className="flex items-center justify-center gap-3 mx-auto max-w-screen-xl text-white pl-[56px] pr-4 py-2">
        <div
          className="dismissible-content text-sm text-center leading-tight"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
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
          onClick={() => setDismissed(true)}
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </aside>
  );
}
