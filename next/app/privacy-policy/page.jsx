import { fetchData } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Banner from "@/components/Banner";
import { privacyDataSchema } from "@/lib/schemas";

export default async function Page() {

  const endpoint = "/api/privacy-policy?populate=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = privacyDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Privacy Policy page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { content, banner } = data.data;

  return (
    <main className="overflow-hidden relative">
      <Banner headline={banner.headline} supportiveText={banner.supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div
          className="max-w-none prose prose-gray prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2 mx-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
        />
      </section>
    </main>
  )
}
