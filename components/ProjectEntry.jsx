import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function ProjectEntry({ title, excerpt, thumbnailUrl }) {
  console.log("Hello from ProjectEntry");
  return (
    <article className="bg-neutral-50 hover:bg-neutral-100 transition rounded-2xl border border-neutral-100 relative">
      <Image
        className="rounded-t-2xl"
        src={thumbnailUrl}
        alt="..."
        width={346}
        height={230}
      />
      <div className="p-6">
        <h3 className="text-gray-900 font-medium text-xl sm:text-2xl">{title}</h3>
        <p className="text-gray-700 mt-2 mb-4">{excerpt}</p>
        <a
          href="#"
          className="
            group
            flex
            font-semibold
            leading-none
          text-primary-700
          "
        >
          <span className="absolute inset-y-0 inset-x-0 rounded-2xl"></span>
          Read more
          <span className="sr-only">, about {title}</span>
          <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
        </a>
      </div>
    </article>
  );
}
