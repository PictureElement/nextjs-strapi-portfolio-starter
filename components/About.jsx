import SectionHeader from './SectionHeader';
import Image from 'next/image';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { fetchData } from '@/lib/utils';
import ShapeDivider from './ShapeDivider';

export default async function About() {
  console.log("Hello from About");

  const endpoint = "/api/homepage?populate[about][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackAbout = {
    profileImage: {
      url: 'https://placehold.co/862x862.png?text=862x862',
      alternativeText: '...',
      width: '862',
      height: '862',
    },
    headline: 'ABOUT',
    supportiveText: 'Supportive Text',
    content: 'Content'
  };

  const about = data?.about || fallbackAbout;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI;

  const imageUrl = about.profileImage.url.startsWith('https')
    ? about.profileImage.url
    : `${baseUrl}${about.profileImage.url}`;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-gray-50" />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader headline={about.headline} supportiveText={about.supportiveText} />
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative z-10">
            <Image
              priority
              className="w-full object-cover rounded-t-2xl lg:rounded-2xl border border-primary-100"
              src={imageUrl}
              alt={about.profileImage.alternativeText}
              width={about.profileImage.width}
              height={about.profileImage.height}
            />
          </div>

          <div className="relative flex items-center bg-neutral-50 rounded-b-2xl border-x border-b border-neutral-100 lg:rounded-none lg:rounded-r-2xl lg:border-l-0 lg:border-y">
            <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-2xl lg:border-y lg:border-l border-neutral-100"></span>
            <div
              className="p-6 lg:p-8 about-content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(about.content)) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
