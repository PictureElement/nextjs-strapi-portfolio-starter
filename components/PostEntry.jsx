"use client";

import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function PostEntry({ title, excerpt }) {
  return (
    <article class="relative group">
      <div class="absolute -top-4 -bottom-6 -left-6 -right-6 rounded-lg transition group-hover:bg-primary-50"></div>
      <div class="relative">
        <h3 class="text-slate-900 font-semibold text-xl mb-2">{title}</h3>
        <p className="line-clamp-2 mb-3">{excerpt}</p>
      </div>
      <a
        href="#"
        className="
          group
          flex
          font-semibold
          leading-none
        text-primary-700
          focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
        "
      >
        <span class="absolute -top-4 -bottom-6 -left-6 -right-6 rounded-lg"></span>
        <span className="relative">
          Read more
          <span class="sr-only">, about {title}</span>
        </span>
        <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
      </a>
    </article>
  );
}
