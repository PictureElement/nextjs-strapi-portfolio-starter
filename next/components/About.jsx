import SectionHeader from './SectionHeader';
import Image from 'next/image';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import ShapeDivider from './ShapeDivider';

export default function About({ data }) {
  // Destructure/Format the necessary properties
  const { headline, supportiveText, content, image } = data;
  const imageUrl = new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="relative z-10">
            <Image
              className="rounded-t-2xl md:rounded-2xl w-full border border-neutral-200 md:border-none md:shadow-2xl"
              priority
              src={imageUrl}
              alt={image.alternativeText ?? ''}
              width={1466}
              height={1466}
              sizes="(max-width: 767px) calc(100vw - 34px), (max-width: 1024px) calc(50vw - 18px), 494px"
            />
          </div>
          <div className="relative flex items-center bg-neutral-50 rounded-b-2xl border-x border-b border-neutral-200 md:rounded-none md:rounded-r-2xl md:border-l-0 md:border-y">
            <span className="hidden md:absolute md:-inset-y-[1px] md:-start-16 md:block md:w-16 md:bg-neutral-50 md:rounded-l-2xl md:border-y md:border-l border-neutral-200"></span>
            <div
              className="p-6 md:p-8 prose prose-gray prose-modifier"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(content)) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
