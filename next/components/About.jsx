import SectionHeader from './SectionHeader';
import Image from 'next/image';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { fetchData } from '@/lib/utils';
import ShapeDivider from './ShapeDivider';
import { aboutDataSchema } from '@/lib/schemas';

export default async function About() {
  console.log("Hello from About");

  const endpoint = "/api/homepage?populate[about][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = aboutDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-white py-24 relative">
        <ShapeDivider className="fill-neutral-50" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="text-red-600 text-center">Unable to load data for the About component</div>
        </div>
      </section>
    )
  }

  // Destructure/Format the necessary properties
  const { about } = data.data;
  const imageUrl = new URL(about.profileImage.url, process.env.STRAPI).href;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-neutral-50" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader headline={about.headline} supportiveText={about.supportiveText} />
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <Image
              priority
              className="w-full object-cover rounded-t-2xl lg:rounded-2xl border border-neutral-200"
              src={imageUrl}
              alt={about.profileImage.alternativeText}
              width={about.profileImage.width}
              height={about.profileImage.height}
            />
          </div>

          <div className="relative flex items-center bg-neutral-50 rounded-b-2xl border-x border-b border-neutral-200 lg:rounded-none lg:rounded-r-2xl lg:border-l-0 lg:border-y">
            <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-2xl lg:border-y lg:border-l border-neutral-200"></span>
            <div
              className="p-6 lg:p-8 max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(about.content)) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
