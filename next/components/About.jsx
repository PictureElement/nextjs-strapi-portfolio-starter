import SectionHeader from "./SectionHeader";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import ShapeDivider from "./ShapeDivider";

export default function About({ data }) {
  // Destructure/Format the necessary properties
  const { headline, supportiveText, content, image } = data;
  const imageUrl = new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader headline={headline} supportiveText={supportiveText} />
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <Image
              className="rounded-t-2xl lg:rounded-2xl w-full border border-neutral-200 lg:border-none lg:shadow-2xl"
              priority
              src={imageUrl}
              alt={image.alternativeText ?? ""}
              width={1466}
              height={1466}
              sizes="(max-width: 1023px) calc(100vw - 34px), (max-width: 1278px) calc(50vw - 16px), 624px"
            />
          </div>
          <div className="relative flex items-center bg-neutral-50 rounded-b-2xl border-x border-b border-neutral-200 lg:rounded-none lg:rounded-r-2xl lg:border-l-0 lg:border-y">
            <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-2xl lg:border-y lg:border-l border-neutral-200"></span>
            <div
              className="p-6 lg:p-8 prose prose-gray prose-modifier !max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(content)),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
