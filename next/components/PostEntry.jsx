import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function PostEntry({ title, excerpt, slug }) {
  console.log("Hello from PostEntry");
  return (
    <article className="relative p-4 py-6 group">
      <div className="absolute top-0 bottom-0 left-0 right-0 rounded-2xl transition bg-neutral-50 group-hover:bg-neutral-100 border border-neutral-200"></div>
      <h3 className="text-gray-900 font-medium text-xl mb-2 relative">{title}</h3>
      <p className="text-gray-700 line-clamp-2 mb-3 relative">{excerpt}</p>
      <Link
        href={`/blog/${slug}/`}
        className="
          group
          flex
          font-medium
          leading-none
          text-primary-700
        "
      >
        <span className="absolute top-0 bottom-0 left-0 right-0 rounded-2xl block"></span>
        <span className="relative">
          Read more
          <span className="sr-only">, about {title}</span>
        </span>
        <ArrowRightIcon className="relative size-4 ms-1 group-hover:translate-x-0.5 transition" />
      </Link>
    </article>
  );
}
