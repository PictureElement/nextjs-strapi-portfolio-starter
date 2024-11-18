import SectionHeader from "@/components/SectionHeader";
import ShapeDivider from "@/components/ShapeDivider";
import ServiceGrid from "@/components/ServiceGrid";

async function getServices() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";
  const path = "/api/homepage?populate[services][populate]=*";
  const url = new URL(path, baseUrl);

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) {
      throw new Error('Failed to fetch services');
    }

    const data = await res.json();

    return data?.data?.services;
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the error message
    return null;
  }
}

export default async function Services() {
  const services = await getServices();

  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader heading={services.heading} lead={services.lead} />
        <ServiceGrid services={services.services} />
      </div>
    </section>
  )
}
