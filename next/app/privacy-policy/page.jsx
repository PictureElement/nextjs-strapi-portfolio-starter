import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Banner from "@/components/Banner";
import { fetchStaticPageMetadata, fetchPrivacy } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('privacy-policy');
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const url = new URL('/privacy-policy', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Privacy Policy | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    }
  }
}

export default async function Page() {
  let data;

  try {
    data = await fetchPrivacy();
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Privacy Policy page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { headline, supportiveText, content } = data;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={headline} supportiveText={supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div
          className="max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
        />
      </section>
    </main>
  )
}
