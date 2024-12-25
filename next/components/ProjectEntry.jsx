import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function ProjectEntry({ featuredImageUrl, featuredImageAlternativeText, title, excerpt, slug }) {
  console.log("Hello from ProjectEntry");
  return (
    <article className="bg-neutral-50 hover:bg-neutral-100 transition rounded-2xl border border-neutral-200 relative h-full">
      <div className="rounded-t-2xl overflow-hidden aspect-[1200/630] w-full relative">
        <Image
          className="object-cover object-center"
          src={featuredImageUrl}
          alt={featuredImageAlternativeText}
          fill
        />
      </div>
      <div className="p-6">
        <h3 className="text-gray-900 font-medium text-xl sm:text-2xl">{title}</h3>
        <p className="text-gray-700 mt-2 mb-4 line-clamp-2">{excerpt}</p>
        <Link
          href={`/projects/${slug}/`}
          className="
            group
            flex
            font-medium
            leading-none
            text-primary-700
          "
        >
          <span className="absolute inset-y-0 inset-x-0 rounded-2xl"></span>
          Read more
          <span className="sr-only">, about {title}</span>
          <ArrowRightIcon className="size-4 ms-1 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>
    </article>
  );
}
