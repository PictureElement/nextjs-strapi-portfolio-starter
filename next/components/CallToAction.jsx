import BtnLight from "./BtnLight";
import { fetchCta } from "@/lib/api";

export default async function CallToAction() {
  let data;

  try {
    data = await fetchCta();
  } catch (error) {
    console.error(error.message);
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
  const { headline, supportiveText, button } = data;

  return (
    <section className="bg-primary-900 bg-dot-white/20 relative">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">{headline}</h1>
        <p className="text-white/75 text-lg mb-6">{supportiveText}</p>
        <div className="flex items-center justify-center gap-x-4">
          <BtnLight
            target={button.openLinkInNewTab ? "_blank" : undefined}
            rel={button.sameHostLink ? undefined : "noopener noreferrer"}
            label={button.label}
            url={button.url}
          />
        </div>
      </div>
    </section>
  );
}