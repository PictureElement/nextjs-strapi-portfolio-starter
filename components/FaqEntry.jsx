import { ArrowDownIcon } from '@heroicons/react/16/solid';

export default function FaqEntry({ question, answer }) {
  return (
    <details name="faq" class="group [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex cursor-pointer items-start justify-between gap-4 border border-neutral-100 rounded-lg bg-white p-4 text-gray-900">
        <h3 class="text-neutral-900 font-semibold text-xl">{question}</h3>
        <ArrowDownIcon className="mt-1.5 size-4 shrink-0 transition duration-300 group-open:-rotate-180" />
      </summary>
      <p class="mt-4 px-4 text-neutral-700">{answer}</p>
    </details>
  );
}