import { ArrowDownIcon } from '@heroicons/react/16/solid';

export default function FaqEntry({ question, answer }) {
  console.log("Hello from FaqEntry");
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-start justify-between gap-4 border border-neutral-100 rounded-lg bg-white p-4">
        <h3 className="text-gray-900 font-medium text-xl">{question}</h3>
        <ArrowDownIcon className="mt-1.5 size-4 shrink-0 transition duration-300 group-open:-rotate-180" />
      </summary>
      <p className="mt-4 px-4 text-gray-700">{answer}</p>
    </details>
  );
}