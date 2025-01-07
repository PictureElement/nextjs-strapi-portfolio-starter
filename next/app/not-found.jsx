import BtnPrimary from "@/components/BtnPrimary";
import { fetchMetadata, fetchNotFound } from "@/lib/api";

export async function generateMetadata() {
  let data;

  try {
    data = await fetchMetadata('not-found');
  } catch (error) {
    console.error(error);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Destructure necessary properties for metadata
  const { title, description, openGraphImage } = data;

  return {
    title,
    description,
  }
}

export default async function NotFound() {
  let data;

  try {
    data = await fetchNotFound();
  } catch (error) {
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
