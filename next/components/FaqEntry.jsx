import { ArrowDownIcon } from '@heroicons/react/16/solid';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function FaqEntry({ question, answer }) {
  console.log("Hello from FaqEntry");
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-start justify-between gap-4 border border-neutral-200 rounded-xl bg-white p-4">
        <h3 className="text-gray-900 font-medium text-xl sm:text-2xl tracking-tight">{question}</h3>
        <ArrowDownIcon className="mt-1.5 size-4 shrink-0 transition duration-300 group-open:-rotate-180" />
      </summary>
      <div
        className="mt-4 px-4 max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(answer)) }}
      />
    </details>
  );
}