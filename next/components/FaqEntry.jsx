import { ArrowDownIcon } from '@heroicons/react/16/solid';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function FaqEntry({ question, answer }) {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-start justify-between gap-4 border border-neutral-200 rounded-xl bg-neutral-50 p-4 text-xl sm:text-2xl">
        <h3 className="text-gray-900 font-normal tracking-tight">{question}</h3>
        <ArrowDownIcon className="mt-1 h-[1em] w-[1em] shrink-0 transition duration-300 group-open:-rotate-180" />
      </summary>
      <div
        className="mt-4 px-4 prose prose-gray prose-modifier"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(answer)) }}
      />
    </details>
  );
}