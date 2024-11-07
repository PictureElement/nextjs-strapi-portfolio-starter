"use client";

import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function TestimonialEntry({ title, excerpt, thumbnailUrl }) {
  return (
    <div class="bg-slate-50 rounded-lg">
      <Image
        className="rounded-t-lg"
        src={thumbnailUrl}
        alt="..."
        width={346}
        height={230}
        layout="responsive" // or "fill", "intrinsic", etc. for different layouts
      />
      <div class="p-6">
        <h3 class="text-slate-900 font-semibold text-xl">{title}</h3>
        <p class="text-slate-700 mt-2 mb-4">{excerpt}</p>
        <a
          href="#"
          className="
            group
            inline-flex
            transition ease-out duration-200
            px-4 py-3
            font-semibold
            leading-none
            rounded-lg
            text-white
            border border-primary-100
            bg-primary-100
            hover:bg-primary-200
            active:bg-primary-300
            focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
          "
        >
          Read More
          <ArrowRightIcon className="size-4 ms-2 group-hover:translate-x-1 transition ease-out duration-200" />
        </a>
      </div>
    </div>
  );
}
