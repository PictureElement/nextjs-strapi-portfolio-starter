import BtnLight from "./BtnLight";
import { fetchData } from "@/lib/utils";
import { ctaDataSchema } from "@/lib/schemas";

export default async function CallToAction() {
  console.log("Hello from CallToAction");

  const endpoint = "/api/global?populate[cta][populate]=*";

  let data;

  try {
    const response = await fetchData(endpoint);

    const result = ctaDataSchema.safeParse(response);

    if (!result.success) {
      console.error(`Validation failed for ${endpoint}:`, result.error);
      throw new Error(`Invalid data received from ${endpoint}`);
    }

    data = result.data;
  } catch (error) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <section className="bg-primary-900 bg-dot-white/20 relative">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div className="text-red-600">Unable to load data for the CallToAction component</div>
        </div>
      </section>
    )
  }

  // Destructure the necessary properties
  const { cta } = data.data;

  return (
    <section className="bg-primary-900 bg-dot-white/20 relative">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">{cta.headline}</h1>
        <p className="text-white/75 text-lg mb-6">{cta.supportiveText}</p>
        <div className="flex items-center justify-center gap-x-4">
          <BtnLight
            target={cta.button.openLinkInNewTab ? "_blank" : undefined}
            rel={cta.button.sameHostLink ? undefined : "noopener noreferrer"}
            label={cta.button.label}
            url={cta.button.url}
          />
        </div>
      </div>
    </section>
  );
}