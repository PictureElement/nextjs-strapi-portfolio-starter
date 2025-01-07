import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Banner from "@/components/Banner";
import { fetchPrivacy } from "@/lib/api";

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
  const { title, description, openGraphImage, headline, supportiveText, content } = data;

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
