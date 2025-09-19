import { ArrowRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostEntry({ title, excerpt, slug, createdAt, localeString }) {
  const formattedCreatedAtDate = formatDate(createdAt, localeString);

  return (
    <article className="relative p-4 py-6 bg-white hover:bg-neutral-100 transition border border-neutral-200 rounded-2xl">
      <dl className="text-xs leading-6 flex gap-1 mb-1">
        <dt className='sr-only'>Posted on:</dt>
        <dd><time dateTime={createdAt}>{formattedCreatedAtDate}</time></dd>
      </dl>
      <h3 className="text-gray-900 font-normal text-xl sm:text-2xl tracking-tight relative">{title}</h3>
      <p className="text-gray-700 mt-2 mb-4 relative">{excerpt}</p>
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
        <ArrowRightIcon className="relative h-[1em] w-[1em] ms-1 group-hover:translate-x-0.5 transition" />
      </Link>
    </article>
  );
}
