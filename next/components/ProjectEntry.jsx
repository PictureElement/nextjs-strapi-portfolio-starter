import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function ProjectEntry({ featuredImageUrl, featuredImageAlternativeText, title, excerpt, slug, priority = false }) {
  return (
    <article className="bg-white hover:bg-neutral-100 transition rounded-2xl border border-neutral-200 relative h-full">
      <Image
        draggable="false"
        className="rounded-t-2xl overflow-hidden w-full"
        priority={priority}
        {...(priority ? { priority: true } : { loading: "lazy" })}
        src={featuredImageUrl}
        alt={featuredImageAlternativeText ?? ''}
        width={1468}
        height={769}
        sizes="(max-width: 639px) calc(100vw - 34px), (max-width: 1024px) calc(50vw - 30px), 482px"
      />
      <div className="p-6">
        <h3 className="text-gray-900 font-normal text-xl sm:text-2xl tracking-tight">{title}</h3>
        <p className="text-gray-700 mt-2 mb-4">{excerpt}</p>
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
          <ArrowRightIcon className="h-[1em] w-[1em] ms-1 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>
    </article>
  );
}
