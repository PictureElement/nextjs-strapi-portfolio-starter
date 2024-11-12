"use client";

import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function TestimonialEntry({ title, excerpt, thumbnailUrl }) {
  return (
    <article class="bg-neutral-50 hover:bg-neutral-100 transition rounded-lg border border-neutral-100 relative">
      <Image
        className="rounded-t-lg"
        src={thumbnailUrl}
        alt="..."
        width={346}
        height={230}
        layout="responsive" // or "fill", "intrinsic", etc. for different layouts
      />
      <div class="p-6">
        <h3 class="text-neutral-900 font-semibold text-xl">{title}</h3>
        <p class="text-neutral-700 mt-2 mb-4">{excerpt}</p>
        <a
          href="#"
          className="
            relative
            group
            flex
            font-semibold
            leading-none
          text-primary-700
            focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
          "
        >
          <span class="absolute inset-y-0 inset-x-0 rounded-lg"></span>
          Read more
          <span class="sr-only">, about {title}</span>
          <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
        </a>
      </div>
    </article>
  );
}
