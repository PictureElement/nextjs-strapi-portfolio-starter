import BtnLight from "./BtnLight";

export default async function CallToAction({ data }) {
  if (!data) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="bg-primary-900 bg-dot-white/20">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Call-to-action&quot; component.</div>
        </div>
      </div>
    )
  }

  // Destructure the necessary properties
  const { headline, supportiveText, button } = data;

  return (
    <section className="bg-primary-900 bg-dot-white/20 relative">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-white font-bold text-3xl sm:text-4xl tracking-tight mb-4">{headline}</h2>
        <p className="text-white/75 text-lg mb-6">{supportiveText}</p>
        <div className="flex items-center justify-center gap-x-4">
          <BtnLight
            target={button.openLinkInNewTab ? "_blank" : undefined}
            rel={button.sameHostLink ? undefined : "noopener noreferrer"}
            label={button.label}
            url={button.url}
            showIcon={button.showIcon}
            iconType={button.iconType}
          />
        </div>
      </div>
    </section>
  );
}