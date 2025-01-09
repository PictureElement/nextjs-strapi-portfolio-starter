import BtnPrimary from "@/components/BtnPrimary";
import { fetchStaticPageMetadata, fetchNotFound } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let data;

  try {
    data = await fetchStaticPageMetadata('not-found');
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { title, description, openGraphImage } = data;
  const imageUrl = openGraphImage ? new URL(openGraphImage.url, process.env.STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Page Not Found | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      type: 'website',
    },
  }
}

export default async function NotFound() {
  let data;

  try {
    data = await fetchNotFound();
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <main className="text-center">
        <div className="text-red-600">Unable to load data for the Not Found page</div>
      </main>
    );
  }

  // Destructure the necessary properties
  const { headline, supportiveText } = data;

  return (
    <main className="overflow-hidden relative">
      <section className="triangle-path bg-neutral-100 py-16 relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-1/4 after:h-full after:bg-neutral-200/50">
        <div className="relative mx-auto max-w-5xl px-4 text-center z-10">
          <h1 className="text-gray-900 font-extrabold text-3xl sm:text-4xl tracking-tight text-center mb-4">{headline}</h1>
          <p className="text-gray-700 text-lg mb-7">{supportiveText}</p>
          <BtnPrimary
            className="w-full sm:w-auto"
            label="Return to Home"
            url="/"
          />
        </div>
      </section>
    </main>
  )
}
