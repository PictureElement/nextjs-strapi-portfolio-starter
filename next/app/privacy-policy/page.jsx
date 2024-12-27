import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Banner from "@/components/Banner";

export default async function Page() {

  const endpoint = "/api/privacy-policy?fields[0]=content&populate[banner][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackBanner = {
    headline: 'Headline',
    supportiveText: 'Supportive text',
  };

  const banner = data?.banner || fallbackBanner;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div
          className="max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(data.content)) }}
        />
      </section>
    </main>
  )
}
