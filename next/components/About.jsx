import SectionHeader from './SectionHeader';
import Image from 'next/image';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import ShapeDivider from './ShapeDivider';

export default function About({ data }) {
  // Destructure/Format the necessary properties
  const { headline, supportiveText, content, profileImage } = data;
  const imageUrl = new URL(profileImage.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <Image
              priority
              className="w-full object-cover rounded-t-2xl lg:rounded-2xl border border-neutral-200"
              src={imageUrl}
              alt={profileImage.alternativeText}
              width={profileImage.width}
              height={profileImage.height}
            />
          </div>

          <div className="relative flex items-center bg-neutral-50 rounded-b-2xl border-x border-b border-neutral-200 lg:rounded-none lg:rounded-r-2xl lg:border-l-0 lg:border-y">
            <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-2xl lg:border-y lg:border-l border-neutral-200"></span>
            <div
              className="p-6 lg:p-8 max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
