import SectionHeader from './SectionHeader';
import Image from 'next/image';
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { fetchData } from '@/lib/utils';

export default async function About() {
  console.log("Hello from About");

  const endpoint = "/api/homepage?populate[about][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackAbout = {
    profileImage: {
      url: 'https://placehold.co/1024x1024.png?text=Profile+image',
      alternativeText: '...',
      width: '1024',
      height: '1024',
    },
    heading: 'HEADING',
    lead: 'Lead',
    content: 'Content'
  };

  const about = data?.about || fallbackAbout;

  const baseUrl = process.env.STRAPI_API_URL;

  const imageUrl = about.profileImage.url.startsWith('https')
    ? about.profileImage.url
    : `${baseUrl}${about.profileImage.url}`;

  return (
    <section className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeader heading={about.heading} lead={about.lead} />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="relative z-10">
          <Image
            className="w-full object-cover rounded-t-lg lg:rounded-lg border border-primary-100"
            src={imageUrl}
            alt={about.profileImage.alternativeText}
            width={about.profileImage.width}
            height={about.profileImage.height}
          />
        </div>

        <div className="relative flex items-center bg-neutral-50 rounded-b-lg border-x border-b border-neutral-100 lg:rounded-none lg:rounded-r-lg lg:border-l-0 lg:border-y">
          <span className="hidden lg:absolute lg:-inset-y-[1px] lg:-start-16 lg:block lg:w-16 lg:bg-neutral-50 lg:rounded-l-lg lg:border-y lg:border-l border-neutral-100"></span>
          <div
            className="p-6 lg:p-8 about-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(about.content)) }}
          />
        </div>
      </div>
    </section>
  )
}
