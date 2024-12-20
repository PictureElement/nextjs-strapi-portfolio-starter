import BtnLight from "./BtnLight";
import { fetchData } from "@/lib/utils";

export default async function CallToAction() {
  console.log("Hello from CallToAction");

  const endpoint = "/api/global?populate[cta][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackCallToAction = {
    headline: "Headline",
    supportiveText: "Supportive Text",
    button: {
      label: "Label",
      url: "/",
      openLinkInNewTab: false,
      sameHostLink: true
    }
  };

  const cta = data?.cta || fallbackCallToAction;

  return (
    <section className="bg-primary-900 bg-dot-white/20 relative">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{cta.headline}</h1>
        <p className="text-white/75 text-lg mt-6">{cta.supportiveText}</p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
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